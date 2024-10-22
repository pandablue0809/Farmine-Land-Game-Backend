import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { IsUnique } from 'src/validators/IsUnique.validator';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { CharacterModule } from '../character/character.module';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';

@Module({
  controllers: [HistoryController],
  imports: [UserModule, CharacterModule],
  providers: [HistoryService, UserService, PrismaService, IsUnique],
  exports: [HistoryService],
})
export class HistoryModule {}
