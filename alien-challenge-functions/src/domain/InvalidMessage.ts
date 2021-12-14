import { Entity, Column } from 'typeorm';
import BaseEntity from './BaseEntity';

@Entity()
export default class InvalidMessage extends BaseEntity{
    @Column()
    text: string;

    @Column()
    reason: string;

}