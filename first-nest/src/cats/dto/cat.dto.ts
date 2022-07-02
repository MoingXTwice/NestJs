import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from '../cats.schema';

// PickType 은 필요한 것만 가져오는 것, OmitType 은 필요 없는걸 빼준다
export class ReadOnlyCatDto extends PickType(Cat, ['email', 'name'] as const) {
    @ApiProperty({
        example: '38147928',
        description: 'id',
    })
    id: string;
}