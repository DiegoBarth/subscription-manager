import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { ValidateUserUseCase } from './use-cases/validate-user.use-case';
import { LoginUseCase } from './use-cases/login.use-case';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';

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
      JwtStrategy,
   ],
   exports: [LoginUseCase],
})
export class AuthModule { }
