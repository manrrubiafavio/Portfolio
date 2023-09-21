import { Injectable} from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

const Front_url = process.env.FRONT_END;

@Injectable()
export class mailerServ {
  constructor(private readonly mailerService: MailerService) {}

  recoveryPassMailer(body: any, link: string){
    this.mailerService
      .sendMail({
        to: `${body.email}`,
        from: 'FavioManrrubiaPortfolio', 
        subject: 'Recovery Pass', 
        text: `Follow the next link to set a new password: ${link}`,
      })
      .then(() => {
        return { url : `${Front_url}/recoveryform`}
      })
      .catch((error: any) => {
        return error.message;
      });
  }

  async contactMail(body: any) {
    try {
      await this.mailerService.sendMail({
        to: `${body.email}`,
        from: 'Favio Manrrubia Portfolio', 
        subject: `Contact from ${body.email}`, 
        text: `${body.text}`,
      });
      const status = 'Mail was sent/ Email enviado'
      return status;
    } catch (error) {
      return error.message;
    }
  }

}