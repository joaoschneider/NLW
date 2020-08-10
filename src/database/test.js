const db = require('./db')
const createProffy = require('./createProffy')
db.then(async (database) => {
    
    proffyValue = {
        name: "Diego Fernandes", 
        avatar:"https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4", 
        whatsapp: "899976061", 
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.", 
        weekday: [0], 
        time_from: [720], 
        time_to: [1220]
    }

    classValue = {
        subject: 1, 
        cost: "40", 
        //o proffy_id vem pelo banco apos cadastro do proffy
    }

    classScheduleValues = [
        //o class_id vem pelo banco apos cadastro da aula
        {
            weekday: 1,
            time_from: 720,
            time_to: 1120
        },
        {
            weekday: 0,
            time_from: 520,
            time_to: 600
        }
    ]

    //Gerar entradas no banco de dados
    // await createProffy(database, {proffyValue, classValue, classScheduleValues})

    const selectedProffys = await database.all("SELECT * FROM PROFFYS")
    // console.log(selectedProffys)

    const selectSchedules = await database.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = 1
        AND class_schedule.weekday = 1
        AND class_schedule.time_from <= 750
        AND class_schedule.time_to > 750
    `)

    console.log(selectSchedules)
})