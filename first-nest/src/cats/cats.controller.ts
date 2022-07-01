import {
    Controller,
    Delete,
    Get,
    HttpException,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Put,
    UseFilters, UseInterceptors,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';
import { SuccessInterceptor } from '../common/interceptors/success.interceptor';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
    constructor(private readonly catsService: CatsService) {
    }

    @Get()
    getAllCat() {
        return 'all cat';
    }

    @Get(':id')
    getOneCat(@Param('id', ParseIntPipe) param: number) {
        console.log(typeof param);
        return 'one cat';
    }

    @Post()
    createCat() {
        return 'create cat';
    }

    @Put(':id')
    updateCat() {
        return 'put cat';
    }

    @Patch(':id')
    updatePartialCat() {
        return 'patch cat';
    }

    @Delete(':id')
    deleteCat() {
        return 'delete cat';
    }

}
