import {
    Controller,
    Post,
    Body,
    UseGuards,
    Get,
    Delete,
    Param,
    Patch,
  } from '@nestjs/common';
  import { ApiOperation, ApiTags } from '@nestjs/swagger';
  import { AuthGuard } from '../auth/auth.guard';
import { CreateWithdrawDto } from './dto/create-withdraw.dto';
import { WithdrawService } from './withdraw.service';
import { UpdateWithdrawDto } from './dto/update-withdraw.dto';
  
  @ApiTags('Withdraw')
  @Controller('api/v1/withdraw')
  @UseGuards(AuthGuard)
  
  export class WithdrawController {
    constructor(private readonly withdrawService: WithdrawService) {}
  
    @Post()
    @ApiOperation({ summary: 'Cria um Personagem' })
    create(@Body() createWithdrawDto: CreateWithdrawDto) {
      return this.withdrawService.createNew(createWithdrawDto);
    }

    @Get()

    findAll() {
      return this.withdrawService.getList();
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Deleta um Personagem' })
    remove(@Param('id') id: string) {
      return this.withdrawService.deleteById(+id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Atualiza um Personagem' })
    update(
      @Param('id') id: string,
      @Body() UpdateWithdrawDto: UpdateWithdrawDto,
    ) {
      return this.withdrawService.updateById(+id, UpdateWithdrawDto);
    }
  }
  