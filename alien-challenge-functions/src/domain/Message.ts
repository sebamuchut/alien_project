import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import BaseEntity from './BaseEntity';
import Types from './Types';

@Entity()
export default class Message extends BaseEntity{
    @Column({
        unique: true
    })
    text: string;

    @Column()
    leader: string;

    @ManyToOne(() => Types, (type: Types) => type.messages, {cascade: true})
    type: Types;
}