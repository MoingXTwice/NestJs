import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, tap } from 'rxjs';

@Injectable()
export class SuccessInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler) {
        return next
            .handle()
            .pipe(map((data) => ({
                success: true,
                data,
            })));
    }
}