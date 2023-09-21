import { Module } from '@nestjs/common';
import { SkillsController } from './controllers/skills.controller';
import { SkillsService } from './services/skills.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { skills } from 'src/entities/skills.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([skills])
  ],
  controllers: [SkillsController],
  providers: [SkillsService]
})
export class SkillsModule {}
