
console.log ('client side javascript file is loaded')
/* ejemplo de API con fetche */
// fetch('https://puzzle.mead.io/puzzle').then((response) =>{
//     response.json().then((data) => {
//         console.log(data)
//     })
// })


const weatherForm = document.querySelector('form')
const searchForm = document.querySelector('input')
const messageOne = document.querySelector('#message-1') // para que sea por id debe de tener #
const messageTwo = document.querySelector('#message-2') 
messageOne.textContent =''

// e --> event object
weatherForm.addEventListener('submit',(e)=>{
    // the default action of the event will not be triggered.
    e.preventDefault()
    messageOne.textContent = 'Loading....'

    //text of the input
    const location = searchForm.value

    fetch('http://localhost:3000/weather?address='+location).then((response) =>{
    response.json().then((data) => {
        if (data.error){
            return messageOne.textContent = data.error
        } else {
            messageOne.textContent = data.location 
            messageTwo.textContent = data.forecast
        }
    })
})
})

