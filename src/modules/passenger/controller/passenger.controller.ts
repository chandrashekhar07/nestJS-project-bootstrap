import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Post,
    HttpCode
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggerService } from '../../common/providers';
import { Passenger, PassengerInput } from '../model';
import { PassengerService } from '../services';

@Controller('passengers')
@ApiTags('passenger')
@ApiBearerAuth()
export class PassengerController {
    public constructor(
        private readonly logger: LoggerService,
        private readonly passengerService: PassengerService
    ) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: HttpStatus.OK, isArray: false, type: Passenger })
    public async find(): Promise<Passenger[]> {
        this.logger.info('Getting data for passengers');
        return this.passengerService.find();
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse({ status: HttpStatus.CREATED, type: Passenger })
    public async create(@Body() input: PassengerInput): Promise<Passenger> {
        const passenger = await this.passengerService.create(input);
        this.logger.info(`Created new passenger with ID ${passenger.id}`);

        return passenger;
    }
}
