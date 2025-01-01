import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { RegisterUserDto } from './dto/registerUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { Response } from 'express';


@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    
    @Post('signup')
    @ApiBody({ type: RegisterUserDto })
    async register(@Body() registerUserDto: RegisterUserDto) {
        return this.authService.registerUser(registerUserDto)
    }
    @Post('login')
    async login(@Body() loginDto: LoginUserDto, @Res() res: Response) {
        try {
            const { message, user, token } = await this.authService.LoginUser(loginDto);

            if (message !== 'Login successful') {
                return res.json({ error: true, message });
            }

            // Set the token in the cookie
            res.cookie('userToken', token, {
                httpOnly: true,  // Ensures the cookie cannot be accessed by JavaScript
                secure: true,    // Set to true if using HTTPS
                maxAge: 1000 * 60 * 60 * 24 * 7,  // 1 week
                sameSite: 'none', // Required for cross-site cookies
            });

            return res.json({ error: false, message, user });
        } catch (err) {
            console.error(err);
            return res.json({ error: true, message: err.message });
        }

    }

    @Get('check')
    async checkLogin(@Req() req, @Res() res: Response) {
        try {

            const token = req.cookies['userToken']; // Extracting the token from cookies

            const result = await this.authService.checkUserLoggedIn(token);

            return res.json(result);
        } catch (err) {
            console.error(err);
            return res.json({ loggedIn: false, error: err });
        }
    }
    @Get('logout')
    async adminLogout(@Res() res: Response) {
        try {
            res
                .cookie('userToken', '', {
                    httpOnly: true,
                    expires: new Date(0), // Expire the cookie immediately
                    secure: true, // Use secure cookies (set true in production with HTTPS)
                    sameSite: 'none', // Allows cross-site cookie sharing
                })
                .json({ message: 'Logged out successfully', error: false });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Logout failed', error: true });
        }
    }
}
 