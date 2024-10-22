import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UserService } from '../user/user.service';
import { CreateWithdrawDto } from './dto/create-withdraw.dto';
import { UpdateWithdrawDto } from './dto/update-withdraw.dto';

@Injectable()
export class WithdrawService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async createNew(data: CreateWithdrawDto) {
    // Check if the user is authenticated and authorized
    console.log('data', data);
    const user = await this.userService.findOneById(data.account_id);
    if (!user) {
      throw new BadRequestException('User not found or not authenticated');
    }

    try {
      return await this.prisma.withdraw.create({
        data: {
          player_id: data.player_id,
          account_id: data.account_id,
          withdraw_funds: data.withdraw_funds,
          wallet_address: data.withdraw_address,
          created_at : data.created_at,
          withdraw_at : data.withdraw_at,
          withdraw_status : 0
        },
      });
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Failed to create withdraw');
    }
  }

  async getList() {
    try {
      const list = await this.prisma.withdraw.findMany();

      return list;
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Failed to get List');
    }
  }

  async deleteById(id: number) {
    try {

      console.log('id', id);

      const withdraw = await this.prisma.withdraw.findUnique({
        where: { id },
      });

      console.log('withdraw', withdraw);

      if (!withdraw) {
        throw new NotFoundException('withdraw not found');
      }

      const data = await this.prisma.withdraw.delete({ where: { id } });

      console.log(data);
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Failed to get List');
    }
  }

  async updateById(id: number, data: Partial<UpdateWithdrawDto>) {
    try {

      const updatedWithdraw = await this.prisma.withdraw.update({
        where: { id },
        data,
      });

      console.log('updated', updatedWithdraw);
      return updatedWithdraw; // Return updated player for confirmation
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Player not found');
    }
  }
}
