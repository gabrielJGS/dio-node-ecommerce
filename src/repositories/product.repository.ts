import { AppDataSource } from "../db/datasource";
import { Product } from "../entities/Product";
import DatabaseError from "../models/errors/database.error.model";

class ProductRepository {
  ProductRepo = AppDataSource.getRepository(Product);

  async findAllProducts(): Promise<Product[]> {
    try {
      const result = await this.ProductRepo.find();
      return result || [];
    } catch (error) {
      console.error(error);
      throw new DatabaseError("Erro na consulta dos produtos", error);
    }
  }

  async findById(id: number): Promise<Product | null> {
    try {
      const result = await this.ProductRepo.findOneBy({ id });
      return result;
    } catch (error) {
      throw new DatabaseError("Erro na consulta por id", error);
    }
  }

  async findByCategory(category: number): Promise<Product[] | null> {
    try {
      const result = await this.ProductRepo.find({ where: { categoryId: category }, order: { name: "asc" } });
      return result;
    } catch (error) {
      throw new DatabaseError("Erro na consulta por id", error);
    }
  }

  async create(product: Product): Promise<string> {
    try {
      const productToCreate = new Product();
      productToCreate.name = product.name;
      productToCreate.description = product.description;
      productToCreate.img_link = product.img_link;
      productToCreate.price = product.price;
      productToCreate.stock_qtd = product.stock_qtd;
      productToCreate.enabled = product.enabled;
      productToCreate.categoryId = product.categoryId;

      const result = await this.ProductRepo.save(productToCreate);
      return result.id?.toString() || "";
    } catch (error: any) {
      console.error(error);
      throw new DatabaseError("Erro ao cadastrar produto", error.detail);
    }
  }

  async update(product: Product): Promise<void> {
    try {
      const productToUpdate = await this.findById(product.id);
      if (!productToUpdate) throw new DatabaseError("Id de produto não encontrado", null);

      productToUpdate.name = product.name;
      productToUpdate.description = product.description;
      productToUpdate.img_link = product.img_link;
      productToUpdate.price = product.price;
      productToUpdate.stock_qtd = product.stock_qtd;
      productToUpdate.enabled = product.enabled;
      productToUpdate.category = product.category;

      await this.ProductRepo.save(productToUpdate);
    } catch (error) {
      throw new DatabaseError("Erro ao alterar produto", error);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.ProductRepo.delete(id);
    } catch (error) {
      throw new DatabaseError("Erro ao excluir produto", error);
    }
  }
}

export default new ProductRepository();
