import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UserService } from '../user/user.service';
import { CreateHistoryDto } from './dto/create-history.dto';

@Injectable()
export class HistoryService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async createNew(data: CreateHistoryDto) {
    // Check if the user is authenticated and authorized
    const user = await this.userService.findOneById(data.account_id);
    if (!user) {
      throw new BadRequestException('User not found or not authenticated');
    }
    try {
      return await this.prisma.landcoinshistory.create({
        data: {
          action: data.action,
          amount: data.amount,
          date: data.date,
          player_id: data.player_id,
          state: data.state,
          address: data.address,
        },
      });
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Failed to create withdraw');
    }
  }

  async getList(address: string) {
    try {
      const list = await this.prisma.landcoinshistory.findMany({
        where: {
          address: address,
        },
      });
      return list;
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Failed to get transaction history');
    }
  }
}
