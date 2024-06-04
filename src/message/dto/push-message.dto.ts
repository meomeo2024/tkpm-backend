import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength} from "class-validator";
import { Conversation } from "../entity/conversation.entity";
import { ApiProperty } from "@nestjs/swagger";

export class MessageDto {
    @IsNotEmpty()
    @MaxLength(500)
    @IsString()
    @ApiProperty({
        example: 'Hello, today is a beautiful day.'
    })
    content: string;

    @IsOptional()
    @IsString()
    @ApiProperty({
        example: 'e246e139-6913-4da4-b771-6318fe0a3c28'
    })
    conversationId: string;
}