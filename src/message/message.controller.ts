import { Body, Controller, Request, Post, UseGuards, Get, Param } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageDto } from './dto/push-message.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('')
export class MessageController {
    constructor(private readonly messageService: MessageService) {}

    @ApiBearerAuth('access-token')
    @UseGuards(AuthGuard)
    @Post('message/push')
    @ApiOperation({
        summary: 'push message'
      })
    @ApiResponse({
    status: 201,
    description: 'push message successfully'
    })
    @ApiResponse({
    status: 401,
    description: 'Unauthorized'
    })
    async pushMessage(@Body() body: MessageDto, @Request() req) {
        return this.messageService.pushMessage(body, req.user.id);
    }

    @ApiBearerAuth('access-token')
    @UseGuards(AuthGuard)
    @Get('conversations')
    @ApiOperation({
        summary: 'get list conversation'
      })
    @ApiResponse({
    status: 200,
    description: 'get list conversation successfully'
    })
    @ApiResponse({
    status: 401,
    description: 'Unauthorized'
    })
    async getListConversation(@Request() req) {
        return this.messageService.getListConversation(req.user.id);
    }

    @ApiBearerAuth('access-token')
    @UseGuards(AuthGuard)
    @Get('conversations/:conversationId')
    @ApiOperation({
        summary: 'get detail conversation'
      })
    @ApiResponse({
    status: 200,
    description: 'get list conversation successfully'
    })
    @ApiResponse({
    status: 401,
    description: 'Unauthorized'
    })
    @ApiResponse({
      status: 404,
      description: 'Not found conversation'
      })
    @ApiResponse({
      status: 403,
      description: `Can't access conversation`
      })
    async getDetailConversation(@Param('conversationId') conversationId: string, @Request() req){
        return this.messageService.getDetailConversation(conversationId, req.user.id);
    }
}
