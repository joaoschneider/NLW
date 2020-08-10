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

function convertHoursToMinutes(time){
    const [hour, minutes] = time.split(':')
    return Number((hour*60) + minutes)
}

module.exports = { subjects, weekdays, getSubjectById, convertHoursToMinutes}