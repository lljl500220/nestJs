import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { PigModule } from './pig/pig.module';
import { CatsService } from './cats/cats.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadModule } from './upload/upload.module';
import { ReptileModule } from './reptile/reptile.module';

@Module({
  imports: [
    PigModule,
    UserModule,
    UploadModule,
    ReptileModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'qinzhuan',
      database: 'test',
      entities: [],
      synchronize: true,
      retryDelay: 500,
      retryAttempts: 10,
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController, CatsController],
  providers: [AppService, CatsService],
})
export class AppModule {}
