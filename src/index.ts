import { app } from "./app";
const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Aplicação executando na porta ${PORT}`);
});

export { app };
