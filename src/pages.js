const {subjects, weekdays, getSubjectById, convertHoursToMinutes } = require('./utils/format')
const Database = require('./database/db')

async function pageStudy(req, res){
    
    const queryFilters = req.query

    if(!queryFilters.weekday || !queryFilters.time || !queryFilters.subject){
        //Caso qualquer campo dos filtros esteja vazio, apenas mostrar a página
        return res.render("study.html", {queryFilters, subjects, weekdays})
    }
    console.log('Não tem campos vazios')

    //converter horas em minutos
    const timeToMinutes = convertHoursToMinutes(queryFilters.time)

    //executar o query no database a partir dos filtros especificados na busca
    const query = `
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS (
            SELECT class_schedule.*
            FROM class_schedule
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${queryFilters.weekday}
            AND class_schedule.time_from <= ${timeToMinutes}
            AND class_schedule.time_to > ${timeToMinutes}
        )
        AND classes.subject = '${queryFilters.subject}'
    `

    //Caso haja erro ao consultar o DB, usar o trycatch
    try {
        const db = await Database
        const proffys = await db.all(query)
        //para cada proffy retornado no array proffys, alterar a materia de integer para a string referente 
        proffys.map((proffy) =>{
            proffy.subject = getSubjectById(proffy.subject)
        })
        return res.render("study.html", {proffys, subjects, weekdays, queryFilters})
    } catch (error) {
        console.log(error)
    }
}

function pageGiveClasses(req, res){
    return res.render("give-classes.html", {subjects, weekdays})
}

function pageLanding(req, res){
    return res.render("index.html")
}

async function saveClasses(req,res){
    const createProffy = require('./database/createProffy')
    
    const proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }

    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost,
    }

    const classScheduleValues = req.body.weekday.map((weekday, index) => {
        return {
            weekday: weekday,
            time_from: convertHoursToMinutes(req.body.time_from[index]),
            time_to: convertHoursToMinutes(req.body.time_to[index])
        }
    })

    const db = await Database
    try {
        await createProffy(db, {proffyValue, classValue, classScheduleValues})

        let queryString = "?subject=" + req.body.subject
        queryString += "&weekday=" + req.body.weekday[0]
        queryString += "&time=" + req.body.time_from[0]
        return res.redirect("/study.html" + queryString)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {pageLanding, pageStudy, pageGiveClasses, saveClasses}