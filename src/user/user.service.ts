import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import {Mailer} from  '../common/email.service';
import { LoginUserInput } from './dto/login-user.input';
import { AuthService } from '../auth/auth.service';



@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private authService: AuthService,
  ) {}

  async create(data: any){
     const {email,password} = data;
     const salt = await bcrypt.genSalt();
     const hashedPassword = await this.hashPassward(password,salt);
     const code = await this.generateFourDigitCode();
    
     try {
      await  this.userRepository.save({
                              email,
                              password:hashedPassword,
                              salt,
                              code,
                              isVerified:false
                            });

       return await this.sendVerificationMail(email,code);
     } catch (error) {
       console.log(error)
       return error
     }
    
  }

  async login(loginUserInput:LoginUserInput){
     const {email,password} = loginUserInput;
     
     const user = await this.findOne(email);
     if(!(user && await user.validatePassword(password))){
      throw new BadRequestException('invalid credentials');
     }
     
     if(!user.isVerified) throw new BadRequestException('kindly activate your account')

     const payload = {
      token: this.authService.generateJwt(user),
      user,
    };

    return payload;
  }

  async activateAccount(code:number,email:string){
     const user= await this.findOne(email);
     if(!(user &&user.code===code)){
           throw new BadRequestException('Unable to activate account')
     }
     return await this.userRepository.createQueryBuilder()
                  .update(User)
                  .set({isVerified:true})
                  .where('email= :email',{email})
                  .execute();   
  }

  async resendActivationCode(email:string){
    const user = await this.userRepository.findOne({email});

   if (!user) throw new UnauthorizedException('Something went wrong');

    return await this.sendVerificationMail(email,user.code);
  }
  

  async findOne(email: any): Promise<User> {
    return this.userRepository.findOne({email});
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

  findAll() {
    return this.userRepository.find();
  }
}
