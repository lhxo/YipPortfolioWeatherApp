console.log("test")

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = ''
messageTwo.textContent = ''

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    //This resets both paragraphs after each click before filling them with text
    messageOne.textContent = ''
    messageTwo.textContent = ''
    const location = search.value
    if(!location){
        return messageOne.textContent = "You must enter a location"
    }

    fetch(`http://localhost:3000/weather?address=`+location).then((res)=>{
    res.json()
        .then((data)=>{
            if(data.err) {
                messageOne.textContent = data.err
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })

})