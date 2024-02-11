import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {User} from "../interfaces/user.interface";
import {UserService} from "../user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'secretKey',
        });
    }

    async validate(payload: any): Promise<Omit<User, 'password'>> {
        const user = await this.userService.findOne(payload.username);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
