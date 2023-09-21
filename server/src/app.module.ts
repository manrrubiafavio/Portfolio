import { Module } from '@nestjs/common';
import { ProjectsModule } from './projects/projects.module';
import { AdminModule } from './admin/admin.module';
import { ContactModule } from './contact/contact.module';
import { AboutModule } from './about/about.module';
import { SkillsModule } from './skills/skills.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HttpModule } from '@nestjs/axios';
import { LoadDatabaseModule } from './utils/Load_DataBase.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.dev.env',
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.host,
      port: parseInt(process.env.port),
      username: process.env.db_username,
      password: process.env.db_password,
      database: process.env.database,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: false,
      dropSchema: false,


    }),
    MailerModule.forRoot({
      transport: {
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.email,
          pass: process.env.pass,
        }
      },
      defaults: {
        from: 'Favio Manrrubia',
      },
    }),


    ProjectsModule, AdminModule, ContactModule, AboutModule, SkillsModule, HttpModule, LoadDatabaseModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
