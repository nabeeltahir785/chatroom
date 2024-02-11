import { Controller, Post, Request, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    @UseGuards(LocalAuthGuard)
    async login(@Request() req) {
        console.log("HERE GOES")
        return this.authService.login(req.user);
    }

    @Post('register')
    async register(@Body() user) {
        return this.authService.register(user);
    }
}