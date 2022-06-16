let posts = [];
const idParaDeletar = 102;
const idParaSelecionar = 7;
const userIdParaFiltrar = 1;

//Formatar a resposta gerada
function template(post) {
  return `
      <article class="post">
      <p><b>${post.id}) Usuário:</b> ${post.userId} </p>
      <p><b> Título:</b> ${post.title} </p>
      <p> <b>Post: </b>${post.body} </p>
      </article>`;
}

/*Pesquisa no endpoint todos os posts existentes
Função callback para ser a primeira função a ser executada*/
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

//Filtra e carrega na página os posts filtrados formatados
function carregaPostsNaPagina(posts) {
  let jsonFiltrado = posts.filter(function (obj) {
    return filtroPorUsuarioOuIdMaiorQueCem(obj, userIdParaFiltrar);
  });

  const resultadoFiltro = document.querySelector(".resultadoFiltro");
  resultadoFiltro.innerHTML = `${jsonFiltrado.map(template).join("")}`;
}

/*Usa o método POST no endpoint para criar novos posts
Atribui à variável "posts" o array existente mais o array criado com os novos objetos
Renderiza na página o novo array
Função callback para que só seja criado o post antes de deletar*/
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

/*Filtra o array "posts" pelo índice do post que quero exibir na tela separadamente
 Carrega na página o post selecionado formatado*/
function selecionaUmPost(posts) {
  let postSelecionado = posts.filter(function (obj) {
    return filtroPorPost(obj, idParaSelecionar);
  });

  const resultadoSelecao = document.querySelector(".resultadoSelecao");
  console.log("post selecionado: ", idParaSelecionar);
  resultadoSelecao.innerHTML = `${postSelecionado.map(template)}`;
}

/*Usa o método DELETE no endpoint para deletar o índice selecionado
Renderiza o novo array "posts"
Função callback para que ocorra antes de selecionar o post para imprimir separado */
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

//Filtra por userId e por posts novos com id maior que 100
let filtroPorUsuarioOuIdMaiorQueCem = (obj, userId) =>
  obj.userId === userId || obj.id > 100;

//Filtra o post para imprimir separado pelo id
let filtroPorPost = (obj, id) => obj.id === id;

//Chamada da função para buscar post, depois criar, depois deletar e por último selecionar
buscaPost(
  () =>
    criaPost(
      {
        id: 101,
        title: "Post 2",
        body: "Segundo post criado para a resolução do exercício de html Squad RedBull",
        userId: 11,
      },
      () => deletePost(idParaDeletar, () => selecionaUmPost(posts))
    ),

  criaPost({
    id: 102,
    title: "Post 1",
    body: "Post criado para a resolução do exercício de html Squad RedBull",
    userId: 1,
  })
);
