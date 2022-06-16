let posts = [];

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
    return filtroPorUsuarioOuIdMaiorQueCem(obj, 1);
  });

  const resultadoFiltro = document.querySelector(".resultadoFiltro");
  resultadoFiltro.innerHTML = `${jsonFiltrado.map(template).join("")}`;
}

let filtroPorUsuarioOuIdMaiorQueCem = (obj, userId) =>
  obj.userId === userId || obj.id > 100;

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

function deletePost(indiceParaDeletar) {
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
    .then(() => console.log(posts));
}

buscaPost(
  () =>
    criaPost(
      {
        id: 101,
        title: "Post 2",
        body: "Segundo post criado para a resolução do exercício de html Squad RedBull",
        userId: 11,
      },
      () => deletePost(102)
    ),

  criaPost({
    id: 102,
    title: "Post 1",
    body: "Post criado para a resolução do exercício de html Squad RedBull",
    userId: 1,
  })
);
