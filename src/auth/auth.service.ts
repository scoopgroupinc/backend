import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import {JwtAuthService} from './jwt.service';
import { User } from '../user/entities/user.entity';
import { UserAuthInput } from './dto/auth-user.input';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {from} from 'rxjs'
import {Res,HttpStatus, ConflictException, InternalServerErrorException, UnauthorizedException, BadRequestException, HttpException } from '@nestjs/common';
import { Mailer } from '../common/email.service';
import { ChangePassInput } from './dto/password.input';

export class AuthService{
    constructor(
        private jwtService:JwtAuthService,
        @InjectRepository(User)
        private userRepository:Repository<User>
    ){}
    

    async userSignUp(createUserInput:UserAuthInput):Promise<string>{
        createUserInput.salt = await bcrypt.genSalt();
        createUserInput.password = await this.hashPassword(createUserInput.password, createUserInput.salt);
        createUserInput.code = 1245;
        createUserInput.createdAt = new Date().toString();

        console.log(createUserInput.code);

        try{
            const saveUser= await this.userRepository.save(createUserInput);
           if(saveUser){
                const {firstName,code,email}= createUserInput;
                if(await this.sendEmailVerification(firstName,code,email)){
                      return 'Account created successfully. Kindly visit your inbox to activate account';
                }
           }

           return 'something went wrong';
          
       }catch(error){
           if(error.code==='23505'){
               throw new ConflictException('An account with this email already exists');
           }
           throw new InternalServerErrorException();
       }
       
    }

    async userLogin(loginUserInput:UserAuthInput):Promise<any>{
         const {email,password}= loginUserInput;
         const user= await this.findUser(email);

         if(!(user && await user.validatePassword(password))){
            throw new UnauthorizedException('Invalid credentials');
         }
         
         
        const payload = {
            token: this.jwtService.generateJwt(user.email),
            user,
         };
  
      return payload;
          
    }

    async activeAccount(code:number,email:string)
    {
        const user = await this.findUser(email);
        
        if(!user) throw new HttpException('user does not exist',HttpStatus.NOT_FOUND);
         
        if(user.code===code){
          return await this.userRepository.createQueryBuilder()
            .update(User)
            .set({isVerified:true})
            .where('email =: email',{email})
            .execute()
           
        }

        return new BadRequestException('Invalid code')
    }

   async changePassword(changePassInput:ChangePassInput): Promise<any>{
        const {id,password}= changePassInput;
        const user = await this.findUserById(id);
        if(!user) throw new HttpException('User not found',HttpStatus.NOT_FOUND);
        
       
        const result= await this.userRepository.createQueryBuilder()
                        .update(User)
                        .set({password})
                        .where('id =:id',{id})
                        .execute();
        
       return result;
   }
   
   async forgotPassword(email:string): Promise<any>{

   }

   async resendCode(email:string):Promise<any>{

   }
    
   async findUser(email):Promise<User>{
       return await this.userRepository.findOne({email});
   }

   async findUserById(id):Promise<User>{
       return await this.userRepository.findOne({id});
   }
 
   private async hashPassword(password:string,salt:string): Promise<string>{
        return await bcrypt.hash(password,salt);
    }

    private async sendEmailVerification(email:string,code,firstName): Promise<Boolean>{
          
        let mailOptions = { 
            to: email, // list of receivers (separated by ,)
            subject: 'Verify Email', 
            text: 'Verify Email', 
            html: `Hi ${firstName} <br><br> Thanks for your registration<br><br>`+
             `<h6>Your code is ${code}. Enter your code to activate account.</h6>` // html body
          };

        return await Mailer(mailOptions);

    }

    private generateFourDigitCode():number{
        const code= Math.floor(1000 + Math.random() * 9000);
        console.log(code)
        return code;
    }

}