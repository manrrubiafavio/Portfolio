import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { admin } from 'src/entities/admin.entity';
import { JwtService } from '@nestjs/jwt';
import *  as bcrypt from 'bcrypt';
import { mailerServ } from './mailer.service';

const BACK_URL :string = process.env.BACK_END;

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(admin)
        private adminRepo: Repository<admin>,
        private jwtService: JwtService,
        private mailer: mailerServ
    ) { }
    async auth(body: any) {
        const user = await this.adminRepo.findOne({
            where: {
                email: body.email
            }
        })
        const ismatch = await bcrypt.compare(body.pass, user.pass)
        if (ismatch) {
            const payload = { sub: user.id };
            return {
                access_token: await this.jwtService.signAsync(payload),
            };
        } else {
            return 'Wrong credential';
        }

    }

    async createAdmin(body: any) {
        const newAdmin = new admin();
        newAdmin.email = body.email;
        newAdmin.pass = await bcrypt.hash(body.pass, 5)

        return this.adminRepo.save(newAdmin);
    }
    async tokenValidation(){
        
    }

    async recoveryPass(body: any){
        const user = await this.adminRepo.findOne(
            {where:{
                email: body.email
            }}
        )
        if(user){
            const token = this.jwtService.sign(
                {email: user.email}, 
                { expiresIn: "15m" }
                );
            const link: string = `${BACK_URL}/admin/validateAsk/${token}`

            return this.mailer.recoveryPassMailer(body, link);
        }
        
    }

    async validation(token:string){
        const payload = this.jwtService.verify(token);

        const user = this.adminRepo.findOne({
            where:{
                email: payload.email
            }
        })

        if(user){
            const newToken = this.jwtService.sign({user: 'admin'}, {expiresIn: "9h"})
            return newToken;
        }
    }
}
