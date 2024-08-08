import { Injectable, BadRequestException  } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/schemas/user.schemas';
import { Model } from 'mongoose';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { OtpRQDTO, ResetPassDTO } from './dto/resetpass.dto';
import { jwtConstants } from 'src/Guards/constants';
import { DataUserDTO, MicroAuthDTO, PopUserDTO } from './dto/microAuth.dto';
import { LoginUserDTO } from 'src/users/dto/login-user.dto';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class AuthService {

  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private UserModel: Model<User>,
    private readonly i18n: I18nService
  ) { }

  async create(user: CreateUserDTO, role: number): Promise<object> {
    const { email, password, fullName } = user
    const userData = await this.UserModel.findOne({ email })
    if (userData) {
      throw new BadRequestException(this.i18n.t('response.already_has_email'));
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    this.UserModel.create({ email, password: hashedPassword, role, fullName })
    return { msg: this.i18n.t('response.success_save') }
  }

  async login(user: LoginUserDTO): Promise<object> {
    const { email, password } = user

    const userData = await this.UserModel.findOne({ email })

    if (userData && (await bcrypt.compare(password, userData.password))) {
      return {
        access_token: await this.jwtService.signAsync({ id: userData.id }, { secret: jwtConstants.secret }),
      };
    } else {
      throw new BadRequestException(this.i18n.t('response.wrongLoginEmail'));
    }
  }

  async otpRQ(data: OtpRQDTO): Promise<object> {
    const { email } = data
    const userData = await this.UserModel.findOne({ email })
    const otpCode = generateRandomDigits(6);
    userData.otp = otpCode
    userData.save()
    return { msg: this.i18n.t('response.activation_code'), code: otpCode }
  }

  async resetPass(data: ResetPassDTO): Promise<object> {
    const { code, email, newPass, repeatPass } = data
    const userData = await this.UserModel.findOne({ email }).select('otp password')
    if (!userData) {
      throw new BadRequestException(this.i18n.t('notFound.user_id'));
    }
    if (userData.otp !== code) {
      throw new BadRequestException(this.i18n.t('response.otp'));
    }
    if (newPass !== repeatPass) {
      throw new BadRequestException(this.i18n.t('response.passwords_not_match'));

    }
    const hashedPassword = await bcrypt.hash(newPass, 10);
    userData.password = hashedPassword
    userData.otp =  generateRandomDigits(6);
    userData.save()

    return { msg: this.i18n.t('response.success_save') }
  }

  async auth(data: MicroAuthDTO): Promise<DataUserDTO> {
    try {
      const { token, role } = data

      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      const user = await this.UserModel.findById(payload.id).select('fullName email role')
      if (role.includes(user.role)) {
        return { role: true, user }
      } else {
        return { role: false, error:this.i18n.t('response.permissions') }
      }
    } catch (error) {
      console.warn(error)
      return {role:false, error:this.i18n.t('response.BadToken')}
      
    }
  }

  async popUser(data: PopUserDTO): Promise<object>{
    return await this.UserModel.findById(data.userId).select('fullName email role')
  }

}













function generateRandomDigits(DIGITS_LENGTH) {
  const add = 1
  let max = 12 - add // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.
  if (DIGITS_LENGTH > max) {
    return generateRandomDigits(max) + generateRandomDigits(DIGITS_LENGTH - max)
  }
  max = Math.pow(10, DIGITS_LENGTH + add)
  const min = max / 10 // Math.pow(10, n) basically
  const number = Math.floor(Math.random() * (max - min + 1)) + min

  return ('' + number).substring(add)
}