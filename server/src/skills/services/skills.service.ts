import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { skills } from 'src/entities/skills.entity';

@Injectable()
export class SkillsService {
    constructor(
        @InjectRepository(skills) private skillRepo: Repository<skills>
    ){}
    async getAll(){
        const skillsInfo = await this.skillRepo.find();
        return skillsInfo;
    }
    createSkill(body: any){
        const newSkill = this.skillRepo.create(body);
        return this.skillRepo.save(newSkill);
    }
    async updateSkills(id:number, body:any){
        const skillUp = await this.skillRepo.findOne({where:{id: id}})
        this.skillRepo.merge(skillUp, body);
        return this.skillRepo.save(skillUp);
        
    }
    async deleteSkill(id: number){
        await this.skillRepo.delete(id)
        return 'Deleted successfull'
    }
}
