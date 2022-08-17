import { AppDataSource } from "../db/datasource";
import { Category } from "../entities/Category";
import DatabaseError from "../models/errors/database.error.model";

class CategoryRepository {
  CategoryRepo = AppDataSource.getRepository(Category);

  async findAllCategories(): Promise<Category[]> {
    try {
      const result = await this.CategoryRepo.find();
      return result || [];
    } catch (error) {
      console.error(error);
      throw new DatabaseError("Erro na consulta por id", error);
    }
  }

  async findById(id: number): Promise<Category | null> {
    try {
      const result = await this.CategoryRepo.findOneBy({ id });
      return result;
    } catch (error) {
      throw new DatabaseError("Erro na consulta por id", error);
    }
  }

  async create(category: Category): Promise<string> {
    try {
      const categoryToCreate = new Category();
      categoryToCreate.name = category.name;
      categoryToCreate.description = category.description;

      const result = await this.CategoryRepo.save(categoryToCreate);
      return result.id?.toString() || "";
    } catch (error: any) {
      console.error(error);
      throw new DatabaseError("Erro ao cadastrar categoria", error.detail);
    }
  }

  async update(category: Category): Promise<void> {
    try {
      const categoryToUpdate = await this.findById(category.id);
      if (!categoryToUpdate) throw new DatabaseError("Id de usuário não encontrado", null);

      categoryToUpdate.name = category.name;
      categoryToUpdate.description = category.description;

      await this.CategoryRepo.save(categoryToUpdate);
    } catch (error) {
      throw new DatabaseError("Erro na consulta por id", error);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.CategoryRepo.delete(id);
    } catch (error) {
      throw new DatabaseError("Erro na consulta por id", error);
    }
  }
}

export default new CategoryRepository();
