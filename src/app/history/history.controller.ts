import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { CreateHistoryDto } from './dto/create-history.dto';
import { HistoryService } from './history.service';

@ApiTags('history')
@Controller('api/v1/history')
@UseGuards(AuthGuard)
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um Personagem' })
  create(@Body() CreateHistoryDto: CreateHistoryDto) {
    return this.historyService.createNew(CreateHistoryDto);
  }
  @Get(':address')
  @ApiOperation({ summary: 'Deleta um Personagem' })
  remove(@Param('address') address: string) {
    return this.historyService.getList(address);
  }
}
