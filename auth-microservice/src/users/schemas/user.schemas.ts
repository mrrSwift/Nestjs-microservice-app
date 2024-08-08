import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, unique:true })
  email: string;

  @Prop()
  fullName: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  otp: string;

  @Prop({enum: [0, 1], default:0})
  role: number;
}

export const UserSchema = SchemaFactory.createForClass(User);