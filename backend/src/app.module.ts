import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
   imports: [
      ConfigModule.forRoot({ isGlobal: true }),
      UsersModule,
      PrismaModule,
      AuthModule,
   ],
   controllers: [AppController],
   providers: [AppService],
})

export class AppModule { }