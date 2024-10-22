import { ApiProperty } from '@nestjs/swagger';

export class UpdateWithdrawDto {

  @ApiProperty()
  withdraw_funds: number;

  @ApiProperty()
  account_id: number;

  @ApiProperty()
  player_id: number;

  @ApiProperty()
  withdraw_status: number;

  @ApiProperty()
  withdraw_address: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  withdraw_at: Date;
}
