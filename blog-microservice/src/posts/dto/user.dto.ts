
export class DataUserDTO {
    user?:UserDto;
    role:boolean;
    error:string;
}

export class UserDto{
    _id:string;
    email:string;
    fullName:string;
    role:number;
}