import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Conversation } from "./conversation.entity";

export enum actor {
    Bot = 'bot',
    Human = 'human'
}

@Entity()
export class Message {
   @PrimaryColumn()
    messageId: string;

    @Column()
    content: string;

    @Column({
        enum: actor
    })
    actor: actor;

    @Column({
        nullable: true
    })
    userId: number;

    @ManyToOne(() => Conversation)
    conversation: Conversation;

    @Column()
    createdDate: string;
}
