import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { PigModule } from './pig/pig.module';
import { CatsService } from './cats/cats.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [PigModule, UserModule],
  controllers: [AppController, CatsController],
  providers: [AppService, CatsService],
})
export class AppModule {}
