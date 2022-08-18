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

describe("tests users functions", () => {
  it("create a user and return its id", async () => {
    const USER_PASS = "joe@pass123";
    const newUser = {
      name: "joe",
      email: "joe@email.com",
      password: USER_PASS,
      isAdmin: false,
    };
    const result: User = await userRepository.save(newUser);
    //TODO: user repository should hash password before saving
    const id = result.id;

    expect(id).toBe(1);
  });

  it("update a user", async () => {
    const ID_TEST_USER = 1;
    const userToUpdate = await userRepository.findOneBy(ID_TEST_USER);
    userToUpdate.name = "john";
    const result: User = await userRepository.save(userToUpdate);

    expect(result.name).toBe("john");
  });


  it("test a user hashed password", async () => {
    const ID_TEST_USER = 1;
    const USER_PASS = "joe@pass123";

    const userToCompare = await userRepository.findOneBy(ID_TEST_USER);
    const comparation = User.comparePasswords(USER_PASS, userToCompare.password);

    expect(comparation).toBeTruthy;
  });

  it("delete a user", async () => {
    const ID_TEST_USER = 1;
    const userToRemove = await userRepository.delete(ID_TEST_USER);
    console.log(userToRemove);

    expect(userToRemove.affected).toBe(1);
  });

});
