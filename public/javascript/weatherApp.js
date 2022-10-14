let linia1 = document.getElementById('linia1')
let linia2 = document.getElementById('linia2')
let linia3 = document.getElementById('linia3')
let linia4 = document.getElementById('linia4')
let linia5 = document.getElementById('linia5')
let input = document.getElementById('userinput')
let button = document.getElementById('enter')

const fetchData = () => {
    const url = '/weather?location=' + input.value
    fetch(url)
    .then((response)=>response.json()
    .then((data)=>{
        if(data.error){
            return linia1.innerHTML = data.error
        }
        const {address, temperature, humidity, feelslike, icon, pressure, cloudcover } = data
        document.getElementById('weather-image').src = icon
        linia1.innerHTML = `El temps per ${address} es de ${temperature} ºC .`
        linia2.innerHTML = `Hi ha una humitat de ${humidity} %`
        linia3.innerHTML = `La pressió atmosfèrica es de ${pressure} MPa`
        linia4.innerHTML = `La sensació tèrmica es de ${feelslike} ºC`
        linia5.innerHTML = `Una nubulositat de ${cloudcover} %`
    }))
}

button.addEventListener("click", fetchData)
