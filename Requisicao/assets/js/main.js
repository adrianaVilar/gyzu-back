fetch("https://jsonplaceholder.typicode.com/posts/")
  .then((response) => response.json())
  .then((json) => carregaPostsNaPagina(json));

let filtroPorUsuario = (obj, id) => obj.userId === id;

function carregaPostsNaPagina(json) {
  // let i = 1;
  // const newLocal = "click";
  // document.addEventListener(newLocal, (e) => {
  //   const el = e.target;
  //   e.preventDefault();
  //   if (el.classList.contains("avancar")) i++;
  //   if (el.classList.contains("retornar")) i--;
  //   // console.log(`${i}`);
  // });

  let jsonFiltrado = json.filter(function (obj) {
    return filtroPorUsuario(obj, 1);
  });

  function template(post) {
    return `
    <article class="post">
    <p> <b>${post.id}) Usuário:</b> ${post.userId} </p>
    <p><b> Título:</b> ${post.title} </p>
    <p> <b>Post: </b>${post.body} </p>
    </article>`;
  }

  const resultado = document.querySelector(".resultado");
  resultado.innerHTML += `${jsonFiltrado.map(template).join("")}`;
}
