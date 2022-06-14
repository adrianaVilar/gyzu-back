fetch("https://jsonplaceholder.typicode.com/posts/")
  .then((response) => response.json())
  .then((json) => carregaPostsNaPagina(json));

const filtroPorUsuario = (obj, id) => obj.userId === id;

function carregaPostsNaPagina(json) {
  const div = document.createElement("div");

  const jsonFiltrado = json.filter(function (obj) {
    return filtroPorUsuario(obj, 1);
  });

  for (let posts of jsonFiltrado) {
    // console.log(posts);

    // div.innerHTML += `<p> ${Object.values(posts)}`;
    div.innerHTML += `<p>${JSON.stringify(posts)}`;
  }

  const resultado = document.querySelector(".resultado");
  resultado.appendChild(div);
}
