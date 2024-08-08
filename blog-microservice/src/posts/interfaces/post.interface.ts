import { Types } from "mongoose";

export interface PostInter  {
    _id:Types.ObjectId;
    title:string;
    content:string;
    link:string;
    author:string;
}

export interface NewPost  {
    msg:string;
    data:PostInter;
}