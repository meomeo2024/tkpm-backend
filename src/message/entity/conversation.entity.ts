import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Message } from "./message.entity";

@Entity()
export class Conversation {
    @PrimaryColumn()
    conversationId: string;

    @OneToMany(() => Message, (message) => message.conversation, {onDelete: 'CASCADE'})
    messages: string;

    @Column()
    title: string;

    @Column()
    createdDate: string;
     
    @Column()
    userId: number;
}