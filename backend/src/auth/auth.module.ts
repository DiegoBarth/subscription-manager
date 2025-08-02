import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthController } from './adapters';
import { AuthRepository } from './infrastructure/repositories';
import { JwtStrategy } from './infrastructure/strategies';
import { LoginUseCase, ValidateUserUseCase } from './application';

@Module({
   imports: [
      ConfigModule,
      PassportModule,
      JwtModule.registerAsync({
         imports: [ConfigModule],
         inject: [ConfigService],
         useFactory: (c: ConfigService) => ({
            secret: c.get<string>('JWT_SECRET'),
            signOptions: { expiresIn: '1h' },
         }),
      }),
   ],
   controllers: [AuthController],
   providers: [
      PrismaService,
      AuthRepository,
      ValidateUserUseCase,
      LoginUseCase,
      JwtStrategy
   ],
   exports: [LoginUseCase]
})

export class AuthModule { }