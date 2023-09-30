import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { about } from '../entities/about.entity'
import { projects } from 'src/entities/projects.entity';
import { skills } from 'src/entities/skills.entity';
import { contact } from 'src/entities/contact.entity';

@Injectable()
export class LoadDataBase {
    constructor(
        private readonly httpService: HttpService,
        @InjectRepository(about)
        private readonly aboutRepository: Repository<about>,
        @InjectRepository(contact)
        private readonly contactRepository: Repository<contact>,
        @InjectRepository(skills)
        private readonly skillsRepository: Repository<skills>,
        @InjectRepository(projects)
        private readonly projectsRepository: Repository<projects>,
    ) { }


    async getAbout(): Promise<any[]> {
        try {
            const response = await this.httpService.axiosRef.get("http://localhost:5000/about");
            return response.data;

        } catch (error) {
            console.error("Failed to get data from API:", error);
        }
    }

    async getAllContact(): Promise<any[]> {
        try {
            const response = await this.httpService.axiosRef.get("http://localhost:5000/contact");
            return response.data
        } catch (error) {
            console.error("Failed to get data from API:", error);
        }
    }

    async getSkills(): Promise<any[]> {
        try {
            const response = await this.httpService.axiosRef.get("http://localhost:5000/skills");
            return response.data;

        } catch (error) {
            throw error;
        }
    }

    async fetchProjects(): Promise<any[]> {
        try {
            const response = await this.httpService.axiosRef.get("http://localhost:5000/projects");
            return response.data;

        } catch (error) {
            console.error("Failed to get data from API:", error);
        }
    }

    async firstLoad() {
        const aboutData = await this.getAbout();
        const contactData = await this.getAllContact();
        const skillsData = await this.getSkills();
        const projectsData = await this.fetchProjects();


        for (const oneAbout of aboutData) {
            const aboutEntity = this.aboutRepository.create(oneAbout);
            await this.aboutRepository.save(aboutEntity);
        }
        console.log('ABOUT CARGADO')
        for (const oneContact of contactData){
            const contactEntity = this.contactRepository.create(oneContact);
            await this.contactRepository.save(contactEntity);
        }
        console.log("CONTACT CARGADO");
        
        for (const oneProject of projectsData){
            const projectEntity = this.projectsRepository.create(oneProject);
            await this.projectsRepository.save(projectEntity)
        }
        console.log("Project CARGADO");
        
        for( const oneSkill of skillsData){
            const skillEntity = this.skillsRepository.create(oneSkill);
            await this.skillsRepository.save(skillEntity);
        }

        console.log("datos inyectados")


    }
    
}
