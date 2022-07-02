import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Put, Req, UploadedFile,
    UseFilters, UseGuards, UseInterceptors,
} from '@nestjs/common';
import { CatsService } from '../service/cats.service';
import { HttpExceptionFilter } from '../../common/exceptions/http-exception.filter';
import { SuccessInterceptor } from '../../common/interceptors/success.interceptor';
import { CatRequestDto } from '../dto/cats.request.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReadOnlyCatDto } from '../dto/cat.dto';
import { AuthService } from '../../auth/auth.service';
import { LoginRequestDto } from '../../auth/dto/login.request.dto';
import { JwtAuthGuard } from '../../auth/jwt/jwt.guard';
import { CurrentUser } from '../../common/decorators/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../../common/utils/multer.options';
import { Cat } from '../cats.schema';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
    constructor(private readonly catsService: CatsService, private readonly authService: AuthService) {}

    @ApiOperation({ summary: '현재 고양이 가져오기' })
    @UseGuards(JwtAuthGuard)
    @Get()
    getCurrentCat(@CurrentUser() cat) {
        return cat.readOnlyData;
    }

    @ApiResponse({
        status: 200,
        description: '성공!',
        type: ReadOnlyCatDto,
    })
    @ApiResponse({
        status: 500,
        description: 'Server Error...'
    })
    @ApiOperation({ summary: '회원가입' })
    @Post()
    async signUp(@Body() body: CatRequestDto) {
        return await this.catsService.signUp(body);
    }

    @ApiOperation({ summary: '로그인' })
    @Post('login')
    logIn(@Body() data: LoginRequestDto) {
        return this.authService.jwtLogin(data);
    }

    @ApiOperation({ summary: '고양이 이미지 업로드' })
    @UseInterceptors(FileInterceptor('image', multerOptions('cats')))
    @UseGuards(JwtAuthGuard)
    @Post('upload')
    uploadCatImg(@UploadedFile() file: Express.Multer.File, @CurrentUser() cat: Cat) {
        console.log(file);

        // return { image: `http://localhost:8000/media/cats/${file.filename}`};
        return this.catsService.uploadImg(cat, file);
    }

    @ApiOperation({ summary: '모든 고양이 가져오기' })
    @Get('all')
    getAllCat() {
        return this.catsService.getAllCat();
    }
}
