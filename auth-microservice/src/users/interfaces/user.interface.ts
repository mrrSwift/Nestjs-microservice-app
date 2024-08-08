import { Types } from "mongoose";

export interface UserInter {
    email: string;

    fullName: string;

    _id: Types.ObjectId;
}