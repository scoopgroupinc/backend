import * as bcrypt from 'bcrypt';
import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Mailer } from '../common/email.service';
import { LoginUserInput } from './dto/login-user.input';
import { AuthService } from '../auth/auth.service';
import { UserDeviceService } from '../user-devices/user-devices.service';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private authService: AuthService,
    private deviceService: UserDeviceService,
  ) { }

  async create(data: any) {
    const { email, password } = data;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await this.hashPassward(password, salt);
    const code = await this.generateFourDigitCode();

    try {
      await this.userRepository.save({
        email: email.toLowerCase(),
        password: hashedPassword,
        salt,
        code,
        isVerified: false,
        createdAt: new Date().toISOString().toString(),
      });

      const result = await this.sendVerificationMail(email, code);
      if (result) return 'Account created successfully. Check email to activate account';

      throw new HttpException('Sign Up failed', HttpStatus.EXPECTATION_FAILED);
    } catch (error) {
      console.log(error);
      throw new HttpException('Sign Up failed', HttpStatus.EXPECTATION_FAILED);
    }
  }

  async updateAccount(updateUser: UpdateUserInput): Promise<any> {
    const { email } = updateUser;
    const user = await this.findOne(email);
    if (!user) throw new NotFoundException('User not found');

    return await this.userRepository.save({ ...user, ...updateUser });
  }

  async login(loginUserInput: LoginUserInput) {
    const { email, password, macAddress } = loginUserInput;

    const user = await this.findOne(email);
    if (!(user && (await user.validatePassword(password)))) {
      throw new BadRequestException('Invalid credentials');
    }

    if (!user.isVerified)
      throw new BadRequestException('Kindly activate your account');

    const payload = {
      token: this.authService.generateJwt(user),
      user,
    };

    this.deviceService.updateLastLogin(macAddress);
    return payload;
  }

  async activateAccount(code: number, email: string) {
    const user = await this.findOne(email);
    if (!(user && user.code === code)) {
      throw new BadRequestException('Unable to activate account. Wrong Code');
    }

    return await this.userRepository.save({ ...user, isVerified: true });
  }

  async resendActivationCode(email: string) {
    const user = await this.userRepository.findOne({ email });

    if (!user) throw new UnauthorizedException('Something went wrong');

    const result = await this.sendVerificationMail(email, user.code);
    if (result) return 'Activation Code sent';
    return 'Failed to send code';
  }

  async forgotPassword(email: string): Promise<string> {
    const user = await this.findOne(email);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    const code = await this.generateFourDigitCode();
    await this.userRepository.save({ ...user, resetCode: code });
    const result = await this.sendforgotPasswordMail(email, code);
    if (result) return 'Your password has been changed successfully';
    return 'Password reset failed';
  }

  async verifyResetCode(email: string, code: number): Promise<string> {
    const user = await this.findOne(email);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    if (user && user.resetCode === code) return 'Code verified';
    throw new HttpException('Invnalid code', HttpStatus.EXPECTATION_FAILED);
  }

  async resetPassword(email: string, password: string) {
    const user = await this.findOne(email);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    const hashedPassword = await this.hashPassward(password, user.salt);
    return await this.userRepository.save({
      ...user,
      password: hashedPassword,
    });
  }

  async findOne(email: any): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }
  async findOneByID(userId: any): Promise<User> {
    return this.userRepository.findOne({ userId });
  }

  async sendVerificationMail(email: string, code: number): Promise<boolean> {
    const mailData = {
      reciever: email,
      subject: 'Scoop account Activation',
      message: `Dear user,`,
      html:
        `<h2>Hi ! </h2> <p>Kindly enter the code below to verify your accoount.</p>` +
        `<h6>${code}</h6>`,
    };
    return await Mailer(mailData);
  }

  async sendforgotPasswordMail(email: string, code: number): Promise<boolean> {
    const mailData = {
      reciever: email,
      subject: 'Reset password',
      message: `Hi,`,
      html:
        `<h2>Hi ! </h2> <p>Kindly enter the code below to verify your accoount.</p>` +
        `<h6>${code}</h6>`,
    };
    return await Mailer(mailData);
  }

  async hashPassward(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }

  async generateFourDigitCode(): Promise<number> {
    return await Math.floor(1000 + Math.random() * 9000);
  }

  async remove(userId: string): Promise<User> {
    try {
      const user = await this.findOne(userId);
      return await this.userRepository.remove(user);
    } catch (e) {
      return null;
    }
  }
}
