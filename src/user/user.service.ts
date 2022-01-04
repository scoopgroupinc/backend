import { Injectable, BadRequestException, UnauthorizedException, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import {Mailer} from  '../common/email.service';
import { LoginUserInput } from './dto/login-user.input';
import { AuthService } from '../auth/auth.service';
import {UserDeviceService} from '../user-devices/user-devices.service'
import { UpdateUserInput } from './dto/update-user.input';



@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private authService: AuthService,
    private deviceService:UserDeviceService
  ) {}

  async create(data: any){
     const {email,password} = data;
     const salt = await bcrypt.genSalt();
     const hashedPassword = await this.hashPassward(password,salt);
     const code = await this.generateFourDigitCode();
    
     try {
      await  this.userRepository.save({
                              email:email.toLowerCase(),
                              password:hashedPassword,
                              salt,
                              code,
                              isVerified:false,
                              createdAt:new Date().toString()
                            });

       return await this.sendVerificationMail(email,code);
     } catch (error) {
       console.log(error)
       return error
     }
    
  }

  async updateAccount(updateUser:UpdateUserInput):Promise<any>{
     const {email} = updateUser;
     const user = await this.findOne(email);
     if(!user) throw new NotFoundException('User not found');
    
     return await this.userRepository.save({...user,...updateUser});
  }

  async login(loginUserInput:LoginUserInput){
     const {email,password,macAddress} = loginUserInput;
     
     const user = await this.findOne(email);
     if(!(user && await user.validatePassword(password))){
      throw new BadRequestException('Invalid credentials');
     }
     
     if(!user.isVerified) throw new BadRequestException('Kindly activate your account')

     const payload = {
      token: this.authService.generateJwt(user),
      user,
    };
    
    this.deviceService.updateLastLogin(macAddress);
    return payload;
  }

  async activateAccount(code:number,email:string){
     const user= await this.findOne(email);
     if(!(user &&user.code===code)){
           throw new BadRequestException('Unable to activate account. Wrong Code')
     }
     
     return await this.userRepository.save({...user,isVerified:true});
      
  }

  async resendActivationCode(email:string){
    const user = await this.userRepository.findOne({email});

   if (!user) throw new UnauthorizedException('Something went wrong');

    const result =  await this.sendVerificationMail(email,user.code);
    return result
  }

  async forgotPassword(email:string):Promise<Boolean>{
    const user= await this.findOne(email);
    if(!user) throw new HttpException('User not found',HttpStatus.NOT_FOUND);
    const code = await this.generateFourDigitCode();
     await this.userRepository.save({...user,code:code})
     return await this.sendVerificationMail(email,code);
  }
  

  async findOne(email: any): Promise<User> {
         
    const user =await this.userRepository.findOne({where:{email}});
    return user;
  }
  async findOneByID(userId: any): Promise<User> {
    return this.userRepository.findOne({userId});
  }

  async sendVerificationMail(email:string,code:number):Promise<Boolean>{
    const mailData = {
   
      reciever: email,
      subject: 'Iwello Account Activation',
      message: `Hi,`,
      html: `<h2>Hi ! </h2> <p>Kindly enter the code below to verify your accoount.</p>` +
             `<h6>${code}</h6>`
      }
      return await Mailer(mailData);
  }

  async hashPassward(password:string,salt:string):Promise<string>{
     return await bcrypt.hash(password,salt);
  }

  async generateFourDigitCode(): Promise<number>{
    return await Math.floor(1000 + Math.random() * 9000);
  }

  async findAll() {
    return await this.userRepository.find();
  }
}
