import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Inject } from '@nestjs/common';
import { Request } from 'express';
import { ClientProxy } from '@nestjs/microservices';
import { DataUserDTO } from './dto/user.dto';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/common/eNums/role.enum';
import { ROLES_KEY } from '../decorators/role.decorator';
import { map } from 'rxjs';
import { I18nService } from 'nestjs-i18n';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
      @Inject('AUTH') private readonly authClient: ClientProxy,
       private reflector: Reflector,
       private readonly i18n: I18nService
      ) {}
  
  async canActivate(context: ExecutionContext): Promise<boolean>  {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
        throw new UnauthorizedException(this.i18n.t('response.unauthenticated'));
      }
      

      const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );
      try {

         // eslint-disable-next-line @typescript-eslint/no-unused-vars
         return new Promise((resolve, reject)=>{
          try {
            this.authClient.send<DataUserDTO>({ cmd: 'auth' }, { token, role:requiredRoles }).pipe(
              map(data => {
                return data
              })).subscribe(d =>{
                if (!d.role) {
                  reject( new UnauthorizedException({msg:this.i18n.t('response.permissions'), code:d.error}))
                }
                request['user'] = d;
                resolve(true)
              })
          } catch (error) {
            reject(error)
          }
         })
          
      } catch(e) {
        throw new UnauthorizedException({msg:this.i18n.t('response.permissions'), code:'Unknown',e});
      }

   
  }


  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }

}


