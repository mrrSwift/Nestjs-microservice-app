import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schemas/user.schemas';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/Guards/constants';


@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60d' },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
