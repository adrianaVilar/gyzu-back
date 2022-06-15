fetch("https://jsonplaceholder.typicode.com/posts/")
  .then((response) => response.json())
  .then((json) => carregaPostsNaPagina(json));

let filtroPorUsuario = (obj, id) => obj.userId === id;
let post;

function carregaPostsNaPagina(json) {
  let jsonFiltrado = json.filter(function (obj) {
    return filtroPorUsuario(obj, 1);
  });

  const resultadoFiltro = document.querySelector(".resultadoFiltro");
  resultadoFiltro.innerHTML += `${jsonFiltrado.map(template).join("")}`;
}

fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST",
  body: JSON.stringify({
    title: "Post 1",
    body: "Post criado para a resolução do exercício de html Squad RedBull",
    userId: 1,
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
})
  .then((response) => response.json())
  .then((jsonCriado) => getJson(jsonCriado));

fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST",
  body: JSON.stringify({
    title: "Post 2",
    body: "Segundo post criado para a resolução do exercício de html Squad RedBull",
    userId: 11,
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
})
  .then((response) => response.json())
  .then((jsonCriado) => getJson(jsonCriado));

let postCriado = (jsonCriado, id) => jsonCriado === id;

let pegaPost = function getJson(jsonCriado) {
  return postCriado(jsonCriado, 1);
};

const resultadoPost = document.querySelector(".resultadoPost");
resultadoPost.innerHTML += `${pegaPost.map(template).join("")}`;

function template(post) {
  return `
      <article class="post">
      <p><b>${post.id}) Usuário:</b> ${post.userId} </p>
      <p><b> Título:</b> ${post.title} </p>
      <p> <b>Post: </b>${post.body} </p>
      </article>`;
}

fetch("https://jsonplaceholder.typicode.com/posts/1", {
  method: "DELETE",
});
