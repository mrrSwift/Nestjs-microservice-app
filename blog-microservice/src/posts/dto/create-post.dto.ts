import { IsNotEmpty, IsString, } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
export class CreatePostDto {
    
    @IsNotEmpty({
        message: i18nValidationMessage('required.field'),
      })
    @IsString({
        message: i18nValidationMessage('required.string'),
      })
    title:string;

    @IsNotEmpty({
        message: i18nValidationMessage('required.field'),
      })
    @IsString({
        message: i18nValidationMessage('required.string'),
      })
    content:string;

    @IsNotEmpty({
        message: i18nValidationMessage('required.field'),
      })
    @IsString({
        message: i18nValidationMessage('required.string'),
      })
    link:string;
}
