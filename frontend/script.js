const API_URL = "http://localhost:3000"
const filmsContainer = document.querySelector(".filmes")
const filmCount = document.querySelector(".film-count")

function formatDuration(duration) {
    return typeof duration === "number" ? `${duration} min` : duration
}

function renderFilms(filmes) {
    filmCount.textContent = `${filmes.length} ${filmes.length === 1 ? "título" : "títulos"}`

    if (filmes.length === 0) {
        filmsContainer.innerHTML = `
            <div class="empty-state">
                <p class="eyebrow">Ainda não há títulos</p>
                <h3>Seu catálogo começa aqui.</h3>
                <a class="button button-primary" href="./cadastrar/cadastrar.html">Adicionar primeiro filme</a>
            </div>
        `
        return
    }

    filmsContainer.innerHTML = filmes.map((filme) => `
        <article class="film-card">
            <div class="film-card-top">
                <span class="film-index">${String(filme.id).padStart(2, "0")}</span>
                <span class="rating">${filme.classificacao > 0 ? `${filme.classificacao} anos` : "Livre"}</span>
            </div>
            <h3>${escapeHtml(filme.titulo)}</h3>
            <p class="film-genre">${escapeHtml(filme.genero)}</p>
            <p class="film-duration">${escapeHtml(formatDuration(filme.duracao))}</p>
            <div class="card-actions">
                <a class="button button-secondary" href="./editar/editar.html?id=${encodeURIComponent(filme.id)}">Editar</a>
                <button class="button button-danger" type="button" data-film-id="${filme.id}">Apagar</button>
            </div>
        </article>
    `).join("")

    filmsContainer.querySelectorAll("[data-film-id]").forEach((button) => {
        button.addEventListener("click", () => apagarFilme(button.dataset.filmId, button))
    })
}

function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (character) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    }[character]))
}

async function buscarFilmes() {
    try {
        const resposta = await fetch(`${API_URL}/all-films`)
        if (!resposta.ok) throw new Error("Não foi possível carregar os filmes.")
        renderFilms(await resposta.json())
    } catch (error) {
        filmsContainer.innerHTML = `<div class="empty-state error-state"><h3>Não foi possível carregar o acervo.</h3><p>${error.message}</p></div>`
    }
}

async function apagarFilme(id, button) {
    if (!window.confirm("Apagar este filme do acervo?")) return

    button.disabled = true
    try {
        const resposta = await fetch(`${API_URL}/delete-film/${id}`, { method: "DELETE" })
        if (!resposta.ok) throw new Error("Não foi possível apagar o filme.")
        await buscarFilmes()
    } catch (error) {
        button.disabled = false
        window.alert(error.message)
    }
}

buscarFilmes()