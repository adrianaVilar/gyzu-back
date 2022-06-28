// Vamos ver como está seu conhecimento de Strings no JavaScript.
// Construa uma função que receberá duas Strings de tamanhos variados e que retornará True ou False
// caso todos os caracteres (independentemente de ser maiúsculo ou minúsculo) estejam contidos em ambas palavras.

// Regras:

// A função vai receber duas String
// A função retornará True ou False
// Letras repetidos contam como o mesma letra
// Maiúsculo == minúsculo
// Exemplo:

// "Mar" e "Ram" retornará True.
// "marte" e "morte" retornará False
// "Banana" e "Ban" retornará True
// "BLOG" e "GLOB" retornará False
// “CaRoLiNa” e “cArOlInA” retornará True.
// “Hum” e “H um” retornará False.
// Código:

// Precisando de uma ajudinha para começar, copie o código abaixo:

function comparaStrings(primeiraString, segundaString) {
  if (primeiraString != null && segundaString != null) {
    primeiraString = removeLetrasDuplicadas(primeiraString.toLowerCase());
    segundaString = removeLetrasDuplicadas(segundaString.toLowerCase());

    return (
      primeiraString === segundaString ||
      primeiraString === inverteString(segundaString)
    );
  } else {
    return null;
  }
}

function removeLetrasDuplicadas(string) {
  let array = string.split("");
  return array.filter((el, i) => array.indexOf(el) === i).join("");
}

function inverteString(string) {
  let array = string.split("");
  return array.reverse().join("");
}

console.log("Mar e Ram retornará True:", comparaStrings("Mar", "Ram"));
console.log("marte e morte retornará False:", comparaStrings("marte", "morte"));
console.log("Banana e Ban retornará True:", comparaStrings("Banana", "Ban"));
console.log("BLOG e GLOB retornará False:", comparaStrings("BLOG", "GLOB"));
console.log(
  "CaRoLiNa e cArOlInA retornará True:",
  comparaStrings("CaRoLiNa", "cArOlInA")
);
console.log("Hum e H um retornará False:", comparaStrings("Hum", "H um"));
console.log("null e H um retornará null:", comparaStrings(null, "H um"));
console.log("Hum e null retornará null:", comparaStrings("H um", null));
