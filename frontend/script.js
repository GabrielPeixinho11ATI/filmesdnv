async function buscarFilmes() {
   
    const resposta = await fetch("https://filmesbackend-eight.vercel.app/") 
    const filmes = await resposta.json()
    const sectionFilmes = document.querySelector(".filmes")

    filmes.forEach((filme) => {
        console.log(filme)
        sectionFilmes.innerHTML += `
                    <div>
                        <h2>${filme.title}</h2>
                        <p><strong>Gênero:</strong> ${filme.gender}</p>
                        <p><strong>Duração:</strong> ${filme.duration} minutos</p>
                        <p><strong>Classificação indicativa:</strong> ${filme.ageLimit > 0 ? filme.ageLimit + ' anos' : 'Livre'}</p>
                        
                        <button onclick="apagarFilme(${filme.id})">Apagar</button>
                    </div>
                `
    })
}

buscarFilmes()

async function apagarFilme(id) {
    const respostaDeSucessoAoApagar = await fetch(`https://filmesbackend-eight.vercel.app/delete/${id}`, { method: "DELETE" })
    const mensagem = await respostaDeSucessoAoApagar.json()

    alert(mensagem.message)

    window.location.reload()
}