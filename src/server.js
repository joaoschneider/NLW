
//Setup do servidor
const express = require ('express')
const server = express()
const {pageStudy, 
    pageLanding, 
    pageGiveClasses, 
    saveClasses} = require('./pages')
//Configurar arquivos estaticos (diretorio)
server.use(express.static("public"), express.urlencoded({
    extended: true
}))
//Receber dados do body
//Configurar rotas da aplicação
.get("/", pageLanding)
.get("/study.html", pageStudy)
.get("/give-classes.html", pageGiveClasses)
.post("/save-classes", saveClasses)
.listen(5500)

//Setup nunjucks (Template Engine)
const nunjucks = require('nunjucks')
nunjucks.configure("src/views", {
    express: server,
    noCache: true,
})



