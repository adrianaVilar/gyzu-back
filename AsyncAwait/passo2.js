// Crie uma função assíncrona que irá receber um parâmetro x. Crie três variáveis: a, b e c dentro do corpo da função.
// Cada uma dessas variáveis receberá um await da função do passo anterior.
// Você deve passar como parâmetros dessa função os número 10, 20 e 30, respectivamente.
// Retorne a soma de todos esses elementos, inclusive o parâmetro da função assíncrona.

let valorParaDobrar = 0;

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

async function addAsync(x) {
  let a = await dobrarEm5Segundos(10);
  console.log(a);
  let b = await dobrarEm5Segundos(20);
  console.log(b);
  let c = await dobrarEm5Segundos(30);
  console.log(c);

  return a + b + c + x;
}

addAsync(10)
  .then((resultado) => console.log(resultado))
  .catch((erro) => console.log(erro));
