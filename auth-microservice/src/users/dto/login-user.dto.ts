import { IsEmail, IsNotEmpty,  IsStrongPassword } from 'class-validator';
export class LoginUserDTO {
    @IsNotEmpty()
    @IsEmail()
    email:string;

    @IsNotEmpty()
    @IsStrongPassword({minLength:8,minNumbers:0,minLowercase:0,minSymbols:0,minUppercase:0},{message:'Short Password'})
    password:string;


}
