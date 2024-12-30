import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from 'src/schma/user.schema';
import { RegisterUserDto } from './dto/registerUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
interface LoginResponse {
    message: string;
    user?: Partial<User>;
    token?: string;
  }

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async registerUser(userDto: RegisterUserDto) {
        const { email, name, password, phoneNumber } = userDto
        const exisitingUser = await this.userModel.findOne({ email })
        if (exisitingUser) {
            return { message: "user already found" }
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        await this.userModel.create({ email, name, phoneNumber, password: hashedPassword })
        return { message: "user created successfully" }
    }

    async LoginUser(loginDto: LoginUserDto): Promise<LoginResponse> {
        const { email, password } = loginDto;
      
        // Explicitly annotate the type of the `user` variable
        const user = await this.userModel.findOne({ email }).lean() as User | null;
        if (!user) {
         console.log("nouseser");
          
            return { message: "User not found" };
        }
        // Compare the password
        const isPasswordValid: boolean = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          console.log("invalid ");
          
            return { message: "Invalid password" };
        }
        // Create the token
        const key = process.env.JWT_SECRET
        const token = jwt.sign({
            id: user._id
        }, key
        )

        // Omit sensitive fields before sending the response
        const { password: _, ...userWithoutPassword } = user;

        // Return a safe subset of the user object
       return { message: 'Login successful', user: userWithoutPassword, token };
    }

    async checkUserLoggedIn(token: string) {
        try {
          if (!token) {
            return { loggedIn: false, error: true, message: 'No User Token' };
          }
    
          // Verify JWT token
          const verifiedJWT = jwt.verify(token, process.env.JWT_SECRET); // Replace with actual secret
          const user = await this.userModel.findById(verifiedJWT.id, { password: 0 });
    
          if (!user) {
            return { loggedIn: false };
          }
    
          return { user, loggedIn: true };
        } catch (err) {
          console.error(err);
          return { loggedIn: false, error: err };
        }
      }
} 