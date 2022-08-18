import "reflect-metadata";
require("dotenv/config");
import { DatabaseType, DataSourceOptions, DataSource } from "typeorm";
import { User } from "../entities/User";
import { Category } from "../entities/Category";
import { Product } from "../entities/Product";

const { DB_TYPE, DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_DB } = process.env;

const type = DB_TYPE ? (DB_TYPE as DatabaseType) : "postgres";
const databaseOptions = {
  type: type,
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USER,
  password: DB_PASS,
  database: DB_DB,
  entities: [User, Category, Product],
  synchronize: true,
  logging: false,
} as DataSourceOptions;
const AppDataSource = new DataSource(databaseOptions);

AppDataSource.initialize().catch((error) => console.log(error));

// to initialize initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap

export { AppDataSource };
