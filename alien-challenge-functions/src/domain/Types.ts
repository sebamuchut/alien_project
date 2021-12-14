import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Message from './Message';

@Entity()
export default class Type {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    value: string;

    @OneToMany(() => Message, (messages: Message) => messages.type)
    messages: Message[];
    
}