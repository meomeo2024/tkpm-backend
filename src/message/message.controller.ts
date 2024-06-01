import { Body, Controller, Request, Post, UseGuards, Get, Param } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageDto } from './dto/push-message.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('')
export class MessageController {
    constructor(private readonly messageService: MessageService) {

    }
    @UseGuards(AuthGuard)
    @Post('message/push')
    async pushMessage(@Body() body: MessageDto, @Request() req) {
        return this.messageService.pushMessage(body, req.user.id);
    }

    @UseGuards(AuthGuard)
    @Get('conversations')
    async getListConversation(@Request() req) {
        return this.messageService.getListConversation(req.user.id);
    }

    @UseGuards(AuthGuard)
    @Get('conversation/detail')
    async getDetailConversation(@Param('conversationId') conversationId: string){
        return this.messageService.getDetailConversation(conversationId);
    }
}
