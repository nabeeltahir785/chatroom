import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from '../interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import {CreateUserDto} from "./dto/create-user.dto";
@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) {}

    async findOne(username: string): Promise<User | undefined> {
        return this.userRepository.findOne(username);
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const newUser = await this.userRepository.create({
            ...createUserDto,
            password: hashedPassword,
        });
        return newUser;
    }

}
