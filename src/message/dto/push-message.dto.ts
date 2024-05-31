import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength} from "class-validator";
import { Conversation } from "../entity/conversation.entity";

export class MessageDto {
    @IsNotEmpty()
    @MaxLength(500)
    @IsString()
    content: string;

    @IsOptional()
    @IsNumber()
    conversationId: number;
}