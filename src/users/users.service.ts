import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { I18nService } from 'nestjs-i18n';
import { Model } from 'mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { BcryptAdapter } from 'src/common/adapters/bcrypt.adapter';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly bcryptAdapter: BcryptAdapter,
    private readonly i18nService: I18nService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel({
      ...createUserDto,
      password: this.bcryptAdapter.hashSync(createUserDto.password),
    });

    return await createdUser.save();
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findOne({ _id: id });

    if (!user) {
      const message = this.i18nService.t('user.not-founded');
      throw new NotFoundException(message);
    }

    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      const message = this.i18nService.t('user.not-founded-email', {
        args: { email },
      });
      throw new NotFoundException(message);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.findOne(id);

    const updateUser = await this.userModel.findOneAndUpdate(
      { _id: id },
      { ...updateUserDto },
      { new: true },
    );

    return updateUser;
  }

  async remove(id: string): Promise<User> {
    const user = await this.findOne(id);
    const { name } = user;

    const remove = await this.userModel.deleteOne({ _id: id });

    let message: string = this.i18nService.t('user.deleted', {
      args: { name },
    });

    if (!remove.deletedCount) {
      message = this.i18nService.t('user.not-deleted', { args: { name } });
      throw new NotFoundException(message);
    }

    return user;
  }
}
