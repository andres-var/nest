import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

import { Role } from '../constants/role.enum';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @ApiProperty()
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ type: String, required: true })
  @ApiProperty()
  name: string;

  @Prop({ type: String, required: true })
  @ApiProperty()
  lastName: string;

  @Prop({ type: String, required: true })
  @ApiProperty()
  alias: string;

  @Prop({ type: String, unique: true })
  @ApiProperty()
  phone: string;

  @Prop({ type: String, unique: true })
  @ApiProperty()
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;

  @Prop({ type: [String], required: true })
  roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
