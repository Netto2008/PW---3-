import { getSelecoes } from "../services/selecoes.js";

const selecoes = await getSelecoes();
console.log("Selecoes", selecoes);