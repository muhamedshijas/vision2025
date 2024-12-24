import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { RegisterUserDto } from './registerUser.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Get('test')
    async test() {
        return { message: "hello" };
    }
    @Post('signup')
    @ApiBody({ type: RegisterUserDto })
    async register(@Body()registerUserDto: RegisterUserDto) {
        return this.authService.registerUser(registerUserDto)
    }
}
