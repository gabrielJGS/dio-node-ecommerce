import { app } from "../../app";
const supertest = require("supertest");
const { PORT } = process.env;

jest.mock("minimist", () => {
  return () => ({ env: "dev" });
});
app.listen(PORT, () => {
  console.log(`Aplicação executando na porta ${PORT}`);
});
beforeAll(() => {

});

afterAll(() => {
});

describe("tests users functions", () => {
  it("create a user and return its id", async () => {
    //TODO: need to understand why supertest wont wait for db to connect

    // const USER_PASS = "joe@pass123";
    // const newUser = {
    //   name: "joe",
    //   email: "joe@email.com",
    //   password: USER_PASS,
    //   isAdmin: false,
    // };
    // const response = await supertest(app).post("/users", newUser);

    // expect(response.statusCode).toEqual(200);
    // expect(Number(response.body)).toEqual(expect.any(Number));
  });

});
