import { Controller, Get, Post, Put, Param, Body, Delete} from '@nestjs/common';
import { SkillsService } from '../services/skills.service';


@Controller('skills')
export class SkillsController {
    constructor (
        private skillServ: SkillsService
    ){}
    @Get()
    getSkill(){
        return this.skillServ.getAll()
    }
    @Post()
    postSkill(@Body('body') body:any){
        return this.skillServ.createSkill(body)
    }
    @Put('/:id')
    update(@Param('id') id:number, @Body('body') body:any){
        return this.skillServ.updateSkills(id,body)
    }
    @Delete('/id')
    deleteSkill(@Param('id') id:number){
        return this.skillServ.deleteSkill(id)
    }
}
