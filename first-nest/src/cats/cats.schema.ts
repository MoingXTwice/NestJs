import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaOptions } from 'mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

const options: SchemaOptions = {
    timestamps: true,
};

@Schema(options)
export class Cat extends Document {
    @ApiProperty({
        example: 'norange@naver.com',
        description: 'email',
    })
    @Prop({
        required: true,
        unique: true,
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        example: 'norange',
        description: 'name',
    })
    @Prop({
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        example: '1109',
        description: 'password',
        required: true,
    })
    @Prop({
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    password: string;

    @Prop({
        default: 'https://github.com/amamov/NestJS-solid-restapi-boilerplate/raw/main/docs/images/1.jpeg',
    })
    @IsString()
    @IsNotEmpty()
    imgUrl: string;

    readonly readOnlyData: { id: string, email: string, name: string, imgUrl: string };
}

export const CatSchema = SchemaFactory.createForClass(Cat);

CatSchema.virtual('readOnlyData').get(function (this: Cat) {
    return {
        id: this.id,
        email: this.email,
        name: this.name,
        imgUrl: this.imgUrl,
    };
});