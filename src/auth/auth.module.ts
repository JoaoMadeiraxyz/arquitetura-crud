import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UserService } from 'src/user.service';
import { JwtStrategy } from './jwt.strategy';
import { env } from 'process';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user.module';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: env.JWT_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService, UserService, JwtStrategy, PrismaService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
