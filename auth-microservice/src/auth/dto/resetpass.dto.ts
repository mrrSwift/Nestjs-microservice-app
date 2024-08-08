import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, Length } from 'class-validator';
export class ResetPassDTO {
    @IsNotEmpty()
    @IsString()
    @Length(6,6)
    code: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsStrongPassword({minLength:8,minNumbers:0,minLowercase:0,minSymbols:0,minUppercase:0},{message:'Short Password'})

    newPass: string;

    @IsNotEmpty()
    @IsStrongPassword({minLength:8,minNumbers:0,minLowercase:0,minSymbols:0,minUppercase:0},{message:'Short Password'})
    repeatPass: string
}

export class OtpRQDTO {
    @IsNotEmpty()
    @IsEmail()
    email:string;
}