import { Module } from '@nestjs/common';
import { ContactService } from './services/contact.service';
import { ContactController } from './controllers/contact.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { contact } from 'src/entities/contact.entity';
import { mailerServ } from 'src/admin/services/mailer.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([contact])
  ],
  providers: [ContactService, mailerServ],
  controllers: [ContactController]
})
export class ContactModule {}
