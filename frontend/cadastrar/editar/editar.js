const API_URL = "http://localhost:3000"
const form = document.getElementById("film-form")
const message = document.querySelector(".form-message")
const filmId = new URLSearchParams(window.location.search).get("id")

if (!filmId) {
    message.textContent = "Filme não encontrado."
    form.querySelector("button").disabled = true
} else {
    carregarFilme()
}

async function carregarFilme() {
    try {
        const resposta = await fetch(`${API_URL}/all-films`)
        if (!resposta.ok) throw new Error("Não foi possível carregar os dados do filme.")
        const filmes = await resposta.json()
        const filme = filmes.find((item) => String(item.id) === String(filmId))
        if (!filme) throw new Error("Filme não encontrado.")

        document.getElementById("title").value = filme.titulo
        document.getElementById("gender").value = filme.genero
        document.getElementById("ageLimit").value = filme.classificacao
        document.getElementById("duration").value = filme.duracao
    } catch (error) {
        message.textContent = error.message
        form.querySelector("button").disabled = true
    }
}

form.addEventListener("submit", async (event) => {
    event.preventDefault()
    const submitButton = form.querySelector("button")
    submitButton.disabled = true
    message.textContent = ""

    const filme = {
        titulo: document.getElementById("title").value.trim(),
        genero: document.getElementById("gender").value.trim(),
        classificacao: document.getElementById("ageLimit").valueAsNumber,
        duracao: document.getElementById("duration").valueAsNumber
    }

    try {
        const resposta = await fetch(`${API_URL}/update-film/${encodeURIComponent(filmId)}`, {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(filme)
        })
        const dados = await resposta.json()
        if (!resposta.ok) throw new Error(dados.error || "Não foi possível atualizar o filme.")
        window.location.href = "../index.html"
    } catch (error) {
        message.textContent = error.message
        submitButton.disabled = false
    }
})