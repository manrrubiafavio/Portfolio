import { Module } from '@nestjs/common';
import { AdminService } from './services/admin.service';
import { AdminController } from './controllers/admin.controller';
import { JwtModule } from '@nestjs/jwt/dist';
import { TypeOrmModule } from '@nestjs/typeorm';
import { admin } from 'src/entities/admin.entity';
import { mailerServ } from './services/mailer.service';


@Module({
  imports: [JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '2h' },
  }),
  TypeOrmModule.forFeature([admin])
  ],
  providers: [AdminService, mailerServ],
  controllers: [AdminController]
})
export class AdminModule { }
