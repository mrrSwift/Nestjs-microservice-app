import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { jwtConstants } from './constants';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/schemas/user.schemas';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
     @InjectModel(User.name) private UserModel: Model<User>,
     private jwtService: JwtService,
     private readonly i18n: I18nService
    ) {}
  
  async canActivate(context: ExecutionContext): Promise<boolean>  {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
        throw new UnauthorizedException(this.i18n.t('response.unauthenticated'));
      }
      

      try {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: jwtConstants.secret,
        });

        
        const user = await this.UserModel.findById(payload.id);
  
        if (!user) {
          throw new UnauthorizedException(this.i18n.t('notFound.user_id'));
        }

        request['user'] = payload;
      } catch(e) {
        throw new UnauthorizedException({msg:e});
      }

    return true;
  }


  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }

}


