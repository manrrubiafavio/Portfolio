import { Module } from '@nestjs/common';
import { AboutService } from './services/about.service';
import { AboutController } from './controllers/about.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { about } from 'src/entities/about.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([about])
  ],
  providers: [AboutService],
  controllers: [AboutController]
})
export class AboutModule {}
