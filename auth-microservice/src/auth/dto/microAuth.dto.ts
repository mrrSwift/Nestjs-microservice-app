
export class MicroAuthDTO {
    token:string;
    role:number[]
}
export class DataUserDTO {
    user?:object
    role:boolean;
    error?:string;
}
export class PopUserDTO {
    userId:string
}