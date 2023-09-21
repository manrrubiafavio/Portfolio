import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { about } from 'src/entities/about.entity';

@Injectable()
export class AboutService {
    constructor(
        @InjectRepository(about) private aboutRepo: Repository<about> ){}

        getAll(){
            return this.aboutRepo.find();
        }

        getLanguageAbout(language: string){
            let actualLang = ""
            if(language === "false"){
                actualLang = 'EN'
            }else{
                actualLang = 'ES'
            }
            return this.aboutRepo.find({
                where:
                { language: actualLang}
            })
        }
        createAbout(body: any){
            const newAbout = this.aboutRepo.create(body)            
            return this.aboutRepo.save(newAbout);
        }

        async updateAbout(id: number , body: any){
            const aboutUp = await this.aboutRepo.findOne({where: {id: id}});
            aboutUp.text = body.text;
            return this.aboutRepo.save(aboutUp);

        }

}
