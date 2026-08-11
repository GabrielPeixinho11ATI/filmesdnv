import express from "express"
import mysql2 from "mysql2"

const app = express()

app.use(express.json())

app.get("/", (request, response) => {
    response.json({
        message: "CRUD de filmes"
    })
})

app.get("/filmes", (request, response) => {
    const selectCommand = "SELECT * FROM filmes_GabrielPeixinhoNicolas"

    sql.query(selectCommand, (error, tiltle) => {
        if(error) {
            console.log(error)
            return
        }

        response.json(tiltle)
    })
})

app.post("/create-movie", (request, response) => {
    const {tiltle, genero, duracao, classificacao_idade} = request.body

    const insertCommand = "INSERT INTO filmes_GabrielPeixinhoNicolas (tiltle, genero, duracao, classificacao_idade) VALUES (?, ?, ?, ?)"

    sql.query(insertCommand, [tiltle, genero, duracao, classificacao_idade], (error) => {
        if(error) {
            console.log(error)
            return
        }

        response.status(201).json({
            message: "Filme cadastrado!"
        })
    })
})

app.delete("/delete-movie/:id", (request,response)=> {
    const {id} = request.params

    const deleteCommand = "DELETE FROM filmes_GabrielPeixinhoNicolas WHERE id = ?"

    sql.query(deleteCommand, [id], (error) => {
        if(error) {
            console.log(error)
            return
        }

        response.json({
            message: "Filme deletado!"
        })
    })
})

app.put("/update-movie/:id", (request, response) => {
    const { id } = request.params
    const { tiltle, genero, duracao, classificacao_idade } = request.body

    let updateCommand
    let valores
    
    if(tiltle && genero && duracao && classificacao_idade) {
    updateCommand = "UPDATE filmes_GabrielPeixinhoNicolas SET tiltle = ?, genero = ?, duracao = ?, classificacao_idade = ? WHERE id = ?"
    valores = [tiltle, genero, duracao, classificacao_idade, id]

     } else if(tiltle && genero && duracao) {
        updateCommand = "UPDATE filmes_GabrielPeixinhoNicolas SET tiltle = ?, genero = ?, duracao = ? WHERE id = ?"
        valores = [tiltle, genero, duracao, id]
        } else {
        return response.status(400).json({ error: "Envie pelo seus titulo, genero, duracao e faixa etaria" })
    }

    sql.query(updateCommand, valores, (error) => {
        if(error) {
            console.log(error)
            return response.status(500).json({ error: "Erro ao atualizar este filme" })
        }

        response.json({
            message: "Filme atualizado!"
        })
    })
})

app.listen(3000, () => {
    console.log("CRUD de filmes funcionando")
})  

const sql = mysql2.createPool({
    host: "benserverplex.ddns.net",
    user: "alunos",
    password: "senhaAlunos",
    database: "alunos_filmes03MB"
})