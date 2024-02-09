import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../interfaces/user.interface';
import {CreateUserDto} from "../user/dto/create-user.dto";
@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async validateUser(username: string, pass: string): Promise<Omit<User, 'password'> | null> {
        const user = await this.userService.findOne(username);
        if (user && user.password === pass) {
            const { password, ...result } = user.toObject();;
            return result as Omit<User, 'password'>;
        }
        return null;
    }

    async login(user: User): Promise<{ access_token: string }> {
        const payload = { username: user.username, sub: user._id.toString() };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }


    async register(createUserDto: CreateUserDto): Promise<User> {
        return this.userService.create(createUserDto);
    }
}