import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from 'src/schma/user.scema';
import { RegisterUserDto } from './registerUser.dto';


@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel:Model<User>){}
    
    async registerUser(userDto:RegisterUserDto){
    const {email,name,password,phoneNumber}=userDto
    const exisitingUser=await this.userModel.findOne({email})
    if(exisitingUser){
        return {message:"user already found"}
    } 
    const saltRounds = 10;
    const hashedPassword=await bcrypt.hash(password,saltRounds)
    console.log(hashedPassword);
    
    } 
} 