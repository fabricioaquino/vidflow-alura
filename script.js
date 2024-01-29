const containerVideos = document.querySelector('.videos__container');

/* antes
const api = fetch('http://localhost:3000/videos')  // retornar uma promisse
.then(res => res.json()) //resposta json
.then((videos) => //executar 
    videos.forEach((video) => {
        containerVideos.innerHTML += `
            <li class="videos__item">
                <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                <div class="descricao-video">
                    <img class="img-canal" src="${video.imagem}" alt="Logo do Canal">
                    <h3 class="titulo-video">${video.titulo}</h3>
                    <p class="titulo-canal">${video.descricao}</p>
                </div>
            </li>
        `
    })
)
.catch((error) => { //tratamento de erros
    containerVideos.innerHTML = `<p>Houve um erro ao carregar os vídeos: ${error}</p>`;
}) */

//depois
async function buscarEmostrarVideos() { // função assicrona
    try {
        const busca = await fetch('http://localhost:3000/videos') ;// retornar uma promisse
        const videos = await busca.json();
        
        videos.forEach((video) => {
            if(video.categoria == ""){
                throw new Error('Video não tem categoria');
            }

            containerVideos.innerHTML += `
                <li class="videos__item">
                    <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                    <div class="descricao-video">
                        <img class="img-canal" src="${video.imagem}" alt="Logo do Canal">
                        <h3 class="titulo-video">${video.titulo}</h3>
                        <p class="titulo-canal">${video.descricao}</p>
                        <p class="categoria" hidden>${video.categoria}</p>
                    </div>
                </li>
            `;
        });
    } catch (error) {
        containerVideos.innerHTML = `<p>Houve um erro ao carregar os vídeos: ${error}</p>`;
    } finally {
        console.log('esse trecho sempre executa');
    }
}

buscarEmostrarVideos();

const barraDePesquisa = document.querySelector('.pesquisar__input');
barraDePesquisa.addEventListener('input', filtrarPesquisa);


function filtrarPesquisa() {
    const videos = listVideos()
    let valorFiltro = barraDePesquisa.value.toLowerCase();

    /*if (barraDePesquisa.value != '') {
        for(let video of videos) {
            let titulo = video.querySelector('.titulo-video').textContent.toLowerCase();
            

            if(!titulo.includes(valorFiltro)){
                video.style.display = "none";
            } else {
                video.style.display = "block";
            }
        }
    } else {
        video.style.display = 'block'
    }*/

    videos.forEach((video) => {
        const titulo = video.querySelector('.titulo-video').textContent.toLowerCase();

        video.style.display = valorFiltro ? titulo.includes(valorFiltro) ? 'block' : 'none' : 'block';
    });

}

const botaoCategoria = document.querySelectorAll('.superior__item');

botaoCategoria.forEach((botao) => {
    let nomeCategoria = botao.getAttribute('name');

    botao.addEventListener('click', () => filtrarPorcategoria(nomeCategoria));
});

function filtrarPorcategoria(filtro) {
    const videos = listVideos()

    videos.forEach((video) => {
        const categoria = video.querySelector('.categoria').textContent.toLowerCase();
        let valorFiltro = filtro.toLowerCase(); 

        video.style.display = (!categoria.includes(valorFiltro) && valorFiltro != "tudo") ? 'none' : 'block'

        /*if (!categoria.includes(valorFiltro) && valorFiltro != "tudo") {
            video.style.display = 'none';
        }else {
            video.style.display = 'block';
        }*/
    });
}

function listVideos() {
    return document.querySelectorAll('.videos__item');
}
