import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.userService.findOne(email);
    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id };
    const token = await this.jwtService.signAsync(payload);

    return { access_token: token };
  }
}
