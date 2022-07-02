import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Payload } from './jwt.payload';
import { CatsRepository } from '../../cats/cats.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly catsRepository: CatsRepository) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
            ignoreExpiration: false,
        });
    }

    async validate(payload: Payload) {
        const cat = await this.catsRepository.findCatByWithoutPassword(
            payload.sub,
        );

        if (cat) {
            return cat; //request.user 안에 들어가게 된다
        } else {
            throw new UnauthorizedException('로그인 하고 이용해주세용');
        }
    }
}