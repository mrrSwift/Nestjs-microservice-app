import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { OtpRQDTO, ResetPassDTO } from './dto/resetpass.dto';
import { MessagePattern } from '@nestjs/microservices';
import { DataUserDTO, MicroAuthDTO, PopUserDTO } from './dto/microAuth.dto';
import { LoginUserDTO } from 'src/users/dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register/user')
  async create(@Body() user: CreateUserDTO): Promise<object> {
    return this.authService.create(user, 0);
  }

  @Post('register/admin')
  async createAdmin(@Body() user: CreateUserDTO): Promise<object> {
    return this.authService.create(user, 1);
  }

  @Post('login')
  async login(@Body() user: LoginUserDTO): Promise<object> {
    return this.authService.login(user);
  }

  @Post('otprq')
  async otpRQ(@Body() email: OtpRQDTO): Promise<object> {
    return this.authService.otpRQ(email)
  }
  @Post('resetpass')
  async resetPass(@Body() data: ResetPassDTO): Promise<object> {
    return this.authService.resetPass(data)
  }

  @MessagePattern({ cmd: 'auth' })
  async authUser(data: MicroAuthDTO): Promise<DataUserDTO> {
    return this.authService.auth(data)
  }

  @MessagePattern({ cmd: 'popUser' })
  async popUser(data: PopUserDTO): Promise<object> {
    return this.authService.popUser(data)
  }

}
