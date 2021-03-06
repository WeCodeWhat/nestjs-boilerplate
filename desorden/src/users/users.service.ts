import { Inject, Injectable } from '@nestjs/common';
import { ModuleName } from 'src/constants/moduleName';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(ModuleName.USER_REPOSITORY)
    private userRepository: Repository<User>,
  ) {}

  create = async (createUserDto: CreateUserDto): Promise<User> =>
    await this.userRepository.create(createUserDto).save();

  findAll = async (): Promise<User[]> => await this.userRepository.find();

  findOne = async (id: number): Promise<User> =>
    await this.userRepository.findOne({ where: { id } });

  update = async (id: string, updateUserDto: UpdateUserDto) => {
    await this.userRepository.update({ id }, updateUserDto);
  };

  remove = async (id: string) => {
    await this.userRepository.delete({
      id,
    });
  };
}
