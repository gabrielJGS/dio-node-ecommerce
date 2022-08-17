import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Category } from "./Category";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  description?: string;

  @Column()
  img_link?: string;

  @Column()
  price: number = 0;

  @Column()
  stock_qtd: number = 0;

  @Column()
  enabled: boolean = true;

  @ManyToOne(() => Category, (category) => category.products)
  category!: Category;
}
