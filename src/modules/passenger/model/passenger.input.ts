import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PassengerInput {
    @ApiProperty()
    @IsString()
    public readonly firstName: string;

    @ApiProperty()
    @IsString()
    public readonly lastName: string;
}
