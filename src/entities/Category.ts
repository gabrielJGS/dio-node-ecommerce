import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from "typeorm";
import { Product } from "./Product";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  description?: string;

  @OneToMany(() => Product, (product) => product.category) // note: we will create author property in the product class below
  products?: Product[];
}
