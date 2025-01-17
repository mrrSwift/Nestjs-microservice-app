import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/Guards/auth.guard';
import { CurrentUser } from 'src/Decorators/currentUser.decorator';
import { UserInter } from './interfaces/user.interface';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('current')
  async current(@CurrentUser() user): Promise<UserInter> {
    return await this.usersService.current(user.id);
  }

}
