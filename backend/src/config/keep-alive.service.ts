import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as cron from 'cron';
import * as http from 'http';

@Injectable()
export class KeepServiceAlive implements OnModuleInit {
  private readonly logger = new Logger(KeepServiceAlive.name);

  onModuleInit() {
    this.startCronJob()
  }

  private startCronJob() {
    const job = new cron.CronJob('*/14 * * * *', () => {
      http.get(process.env.API_URL!, (res) => {
        if (res.statusCode === 200) {
          this.logger.log('GET request sent successfully ✅');
        } else {
          this.logger.error(`GET request failed ❌: ${res.statusCode}`);
        }
      }) .on('error', (e) => this.logger.error('Error while sending request 🚨', e));
      
      job.start();
      this.logger.log('Cron job started (every 14 mins)')

    });
  }
}
