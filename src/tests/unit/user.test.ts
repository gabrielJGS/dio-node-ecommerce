import { DataSource, getConnection, getRepository } from "typeorm";
import { User } from "../../entities/User";

let AppDataSource: any;
let userRepository: any;
beforeAll(async () => {
  AppDataSource = new DataSource({
    type: "sqlite",
    database: "./src/sqlite.db",
    entities: [User],
    synchronize: true,
    logging: false,
    dropSchema: true,
  });
  await AppDataSource.initialize().catch((error: any) => console.log(error));

  userRepository = await AppDataSource.getRepository(User);
});

afterAll(() => {
  return AppDataSource.dropDatabase();
});

test("store a joe and fetch it", async () => {
  const newUser = {
    name: "joe",
    email: "joe@email.com",
    password: "joe@pass123",
    isAdmin: false,
  };
  const result = await userRepository.save(newUser);
  const id = result.id;

  expect(id).toBe(1);
});
