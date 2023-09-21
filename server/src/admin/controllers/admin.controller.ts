import { Controller, Param, Body, Redirect, Post, Res } from '@nestjs/common';
import { AdminService } from '../services/admin.service';
import { Response } from 'express'

const Front_url = process.env.FRONT_END

@Controller('admin')
export class AdminController {
    constructor(
        private adminService: AdminService
    ) { }
    @Post('create')
    async createUser(@Body('body') body: any) {
        return this.adminService.createAdmin(body)
    }
    @Post('login')
    async login(@Body('body') body: any) {
        return this.adminService.auth(body);
    }
    @Post('recovery')
    @Redirect(`${Front_url}/`, 301)
    async recovery(@Body('body') body: any){
        return this.adminService.recoveryPass(body);
    }
    @Post('validateAsk/:token')
    async tokenvalidate(@Param('token') token: string, @Res() res: Response){
        const newToken = this.adminService.validation(token);
        res.cookie('token', newToken, {
            httpOnly: true,
            maxAge: 3600000,
        })
        return res.send('Password update');
    }
}


