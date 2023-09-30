import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { ProjectsService } from '../services/projects.service';


@Controller('projects')
export class ProjectsController {
    constructor(
        private projectServ: ProjectsService
    ){}

    @Get('/:language')
    getProjects(@Param('language') language:string){
        return this.projectServ.getAll(language);
    }

    @Post()
    postProject(@Body() body:any){
        console.log(body)
        return this.projectServ.create(body)
    }
    @Put('/:id')
    update(@Body() body:any, @Param() id:number){
        return this.projectServ.updateProject(id,body)
    }
}
