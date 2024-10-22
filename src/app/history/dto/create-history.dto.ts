import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateHistoryDto {

  @IsNotEmpty({ message: 'withdraw is required' })
  @ApiProperty()
  player_id: number;

  @IsNotEmpty({ message: 'account id is required' })
  @ApiProperty()
  amount: number;

  @IsNotEmpty({ message: 'account id is required' })
  @ApiProperty()
  account_id: number;

  @IsNotEmpty({ message: 'player id is required' })
  @ApiProperty()
  date: Date;

  @IsNotEmpty({ message: 'player id is required' })
  @ApiProperty()
  state: number;

  @IsNotEmpty({ message: 'player id is required' })
  @ApiProperty()
  action: string;

  @IsNotEmpty({ message: 'player id is required' })
  @ApiProperty()
  address: string;

}
