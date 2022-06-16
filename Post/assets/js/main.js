let posts = [];
const idParaDeletar = 1;
const idParaSelecionar = 7;
const userIdParaFiltrar = 9;

function template(post) {
  return `
      <article class="post">
      <p><b>${post.id}) Usuário:</b> ${post.userId} </p>
      <p><b> Título:</b> ${post.title} </p>
      <p> <b>Post: </b>${post.body} </p>
      </article>`;
}

function buscaPost(callback) {
  fetch("https://jsonplaceholder.typicode.com/posts/")
    .then((response) => response.json())
    .then((json) => {
      posts.push(...json);
      console.log("Busca: ", posts);
      return carregaPostsNaPagina(posts);
    })
    .then(() => callback && callback());
}

function carregaPostsNaPagina(posts) {
  let jsonFiltrado = posts.filter(function (obj) {
    return filtroPorUsuarioOuIdMaiorQueCem(obj, userIdParaFiltrar);
  });

  const resultadoFiltro = document.querySelector(".resultadoFiltro");
  resultadoFiltro.innerHTML = `${jsonFiltrado.map(template).join("")}`;
}

function criaPost(post, callback) {
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(post),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((jsonCriado) => {
      jsonCriado.id = posts.length + 1;
      return jsonCriado;
    })
    .then((jsonCriado) => posts.push(jsonCriado))
    .then((jsonCriado) =>
      console.log("Cria post id: ", post.id, " indice: ", jsonCriado)
    )
    .then(() => carregaPostsNaPagina(posts))
    .then(() => callback && callback());
}

function selecionaUmPost(posts, id) {
  let postSelecionado = posts.filter(function (obj) {
    return filtroPorPost(obj, id);
  });

  const resultadoSelecao = document.querySelector(".resultadoSelecao");
  console.log("post selecionado: ", id);
  resultadoSelecao.innerHTML = `${postSelecionado.map(template)}`;
}

function deletePost(indiceParaDeletar, callback) {
  fetch(`https://jsonplaceholder.typicode.com/posts/${indiceParaDeletar}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((json) => console.log("Deletado: ", json))
    .then(() => {
      let idDoPosts = posts.map((obj) => obj.id);
      let idDoArray = idDoPosts.indexOf(indiceParaDeletar);
      if (idDoArray > -1) posts.splice(idDoArray, 1);
    })
    .then(() => carregaPostsNaPagina(posts))
    .then(() => callback && callback())
    .then(() => console.log(posts));
}

let filtroPorUsuarioOuIdMaiorQueCem = (obj, userId) =>
  obj.userId === userId || obj.id > 100;

let filtroPorPost = (obj, id) => obj.id === id;

buscaPost(
  () =>
    criaPost(
      {
        id: 101,
        title: "Post 2",
        body: "Segundo post criado para a resolução do exercício de html Squad RedBull",
        userId: 11,
      },
      () =>
        deletePost(idParaDeletar, () =>
          selecionaUmPost(posts, idParaSelecionar)
        )
    ),

  criaPost({
    id: 102,
    title: "Post 1",
    body: "Post criado para a resolução do exercício de html Squad RedBull",
    userId: 1,
  })
);
