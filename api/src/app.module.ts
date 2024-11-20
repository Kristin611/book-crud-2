import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Book} from './book.entity'
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: 'book-crud-2',
      entities: [Book],
      synchronize: true,
      logging: false, //to see logs from database in console
    }),
    TypeOrmModule.forFeature([Book]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
