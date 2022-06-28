// Crie uma função que após 5 segundos, dobre o resultado do número passado como parâmetro.
// Essa função deverá retornar uma promise. Use o setTimeOut como temporizador.

const valorParaDobrar = "5a";

function dobrarEm5Segundos(valorParaDobrar) {
  return new Promise((res, rej) => {
    if (isNaN(valorParaDobrar)) {
      rej("O valor definido para dobrar não é um número");
      return;
    }
    setTimeout(() => {
      res(valorParaDobrar * 2);
      return;
    }, 5000);
  });
}

const logErro = (e) => console.error("Erro: ", e);
const logResultado = (resultado) => console.log("Sucesso: ", resultado);

dobrarEm5Segundos(valorParaDobrar).then(logResultado, logErro);
