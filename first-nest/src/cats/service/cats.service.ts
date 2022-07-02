import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatRequestDto } from '../dto/cats.request.dto';
import * as bcrypt from 'bcrypt';
import { CatsRepository } from '../cats.repository';
import { Cat } from '../cats.schema';

@Injectable()
export class CatsService {
    constructor(private readonly catsRepository: CatsRepository) {}

    async signUp(body: CatRequestDto) {
        const { email, name, password } = body;
        const isCatExist = await this.catsRepository.existByEmail(email);

        if (isCatExist) {
            throw new UnauthorizedException('해당하는 고양이는 이미 존재합니다.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const cat = await this.catsRepository.create({ email, name, password: hashedPassword });

        return cat.readOnlyData;
    }

    async uploadImg(cat: Cat, file: Express.Multer.File) {
        const fileName = `cats/${file.filename}`;

        console.log(fileName);
        const newCat = await this.catsRepository.findByIdAndUpdateImg(
            cat.id,
            fileName,
        );
        console.log(newCat);
        return newCat.readOnlyData;
    }

    async getAllCat() {
        const allCat = await this.catsRepository.findAll();
        const readOnlyCats = allCat.map((cat) => cat.readOnlyData);
        return readOnlyCats;
    }
}
