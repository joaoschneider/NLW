document.querySelector("#add-time")
.addEventListener('click', cloneField)

function cloneField(){
    const clone = document.querySelector(".schedule-item")
    .cloneNode(true)

    const camposLimpos = clone.querySelectorAll('input')
    camposLimpos.forEach((input) => {
        input.value = ""
    })
    document.querySelector("#schedule-items").appendChild(clone)

}
