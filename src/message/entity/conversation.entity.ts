import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Message } from "./message.entity";

@Entity()
export class Conversation {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @OneToMany(() => Message, (message) => message.conversation, {onDelete: 'CASCADE'})
    messages: string;

    @Column()
    title: string;

    @Column()
    createdDate: string;
     
    @Column()
    userId: number;
}