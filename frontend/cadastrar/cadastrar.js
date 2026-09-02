async function cadastrarFilme() {
    const title = document.getElementById("title")
    const gender = document.getElementById("gender")
    const ageLimit = document.getElementById("ageLimit")
    const duration = document.getElementById("duration")

    if (title.value === "" || gender.value === "" || ageLimit.value === "" || duration.value === "") {
        alert("Preencha todos os campos!")
        return  
    }

    const filme = {
        title: title.value,
        gender: gender.value,
        ageLimit: ageLimit.valueAsNumber,
        duration: duration.valueAsNumber
    }

    const resposta = await fetch("https://filmesbackend-eight.vercel.app/create", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(filme)
    })

    const mensagem = await resposta.json()

    alert(mensagem.message)

    window.location.href = "../index.html"
}