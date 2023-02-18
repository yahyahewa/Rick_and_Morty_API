//
//
//
//
//
let nextLink = "";
let prvLink = "";
async function charactors(link) {
  try {
    let data = await fetch(link);
    const respons = await data.json();
    const section = document.querySelector(".cards");
    nextLink = respons.info.next;
    prvLink = respons.info.prev;
    section.innerHTML = "";
    for (let value of respons.results) {
      if (value.status === "Alive") {
        const article = document.createElement("article");
        article.className = "card";
        const img = document.createElement("img");
        img.src = value.image;
        article.appendChild(img);
        const div = document.createElement("div");
        article.appendChild(div);
        section.appendChild(article);
        const h1 = document.createElement("h1");
        h1.innerText = value.name;
        div.appendChild(h1);
        const span = document.createElement("span");
        span.textContent = "#" + value.id;
        h1.appendChild(span);
        for (let i = 0; i < 3; i++) {
          const h3 = document.createElement("h3");
          if (value.episode.length > 25 && i === 0) {
            h3.innerText = "Main Character";
          } else if (i === 0) {
            h3.innerText = "Side Character";
          }
          if (i === 1) {
            h3.innerText = "Species " + value.species;
          }
          if (i === 2) {
            h3.innerText = "Gender " + value.gender;
          }
          div.appendChild(h3);
        }
        const h2 = document.createElement("h2");
        h2.innerText = "Episode Number " + value.episode.length;
        div.appendChild(h2);
        const a = document.createElement("a");
        a.href = value.location.url;
        a.innerText = value.location.name;
        div.appendChild(a);
      }
    }
  } catch (ex) {
    console.log(ex);
  }
}
////////////////////////////////////////////////////////////
let load = true;
if (load == true) {
  charactors("https://rickandmortyapi.com/api/character");
  load = false;
}
////////////////////////////////////////////////////////////
const next = document.querySelector(".next");
next.addEventListener("click", () => {
  if (nextLink != null) charactors(nextLink);
});
////////////////////////////////////////////////////////////
const privew = document.querySelector(".privew");
privew.addEventListener("click", () => {
  if (prvLink != null) {
    charactors(prvLink);
  }
});
////////////////////////////////////////////////////////////
const textBox = document.querySelector(".textbox");
textBox.addEventListener("keyup", () => {
  charactors(
    `https://rickandmortyapi.com/api/character/?name=${textBox.value}`
  );
});

////////////////////////////////////////////////////////////
