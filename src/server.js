const proffys = [
    {
        name: "Diego Fernandes", 
        avatar:"https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4", 
        whatsapp: "899976061", 
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.", 
        subject: "Química", 
        cost: "40", 
        weekday: [0], 
        time_from: [720], 
        time_to: [1220] 
    }
]

const subjects = [
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
    "Artes",
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
]

function getSubjectById(subjectId){
    return subjects[subjectId - 1]
}
function pageStudy(req, res){
    const queryFilters = req.query
    return res.render("study.html", {proffys, queryFilters, subjects, weekdays})
}

function pageGiveClasses(req, res){
    //Pegar dados que vem após Salvar Cadastro (ja que o form action é a propria pagina)
    const dados = req.query
    const isNotEmpty = Object.keys(dados).length > 0
    //Adicionar dados à lista de objetos de professores (proffys)
    if(isNotEmpty){
        dados.subject = getSubjectById(dados.subject)
        proffys.push(dados)
        return res.redirect("/study.html")
    }else{
        //Se os dados forem vazios, mostrar a pagina give-classes para preenchimento do formulario
        return res.render("give-classes.html", {subjects, weekdays})
    }
}

function pageLanding(req, res){
    return res.render("index.html")
}

//Setup do servidor
const express = require ('express')
const server = express()
//Configurar arquivos estaticos (diretorio)
server.use(express.static("public"))
//Configurar rotas da aplicação
.get("/", pageLanding)
.get("/study.html", pageStudy)
.get("/give-classes.html", pageGiveClasses)
.listen(5500)

//Setup nunjucks (Template Engine)
const nunjucks = require('nunjucks')
nunjucks.configure("src/views", {
    express: server,
    noCache: true,
})



