const row = document.querySelector('.row');
const all = document.querySelector('#all');
const search = document.querySelector('#search')
const searchBox = document.querySelector('.search-wrapper');
const searchInput = document.querySelector('#searchInput');
const submit = document.querySelector('.submit');
const name = document.querySelector('.name')
const capital = document.querySelector('.capital')
const currency = document.querySelector('.currency')
const language = document.querySelector('.language')
const flags = document.querySelector('.flags')
const maps = document.querySelector('.maps')
const result = document.querySelector('.result')
const city = document.querySelector('#city')
const time = document.querySelector('#time')
const tempC = document.querySelector('#temp-c')
const tempF = document.querySelector('#temp-f')
const verdict = document.querySelector('#verdict')

all.addEventListener('change', () => {
    if (all.checked) {
        row.classList.remove('hidden')
        searchBox.classList.add('hidden')
    }
})

search.addEventListener('change', () => {
    if (search.checked) {
        searchBox.classList.remove('hidden')
        row.classList.add('hidden')
    }
})


const handleGetCountries = () => {
    fetch('https://restcountries.com/v3.1/all')
        .then(res => res.json())
        .then(data => {
            data.forEach(country => {
                row.innerHTML += `
        <div class='col-4'>
            <div class='card'>
                <img src="${country.flags.png}" class='card-img-top' alt="..."/>
                <div class='card-body'>
                    <h3 class='card-title'>${country.name.common}</h3>
                    <p class='card-text'>${country.capital}</p>
                </div>
            </div>
        </div>
        `
            })
        })
}

handleGetCountries()

const handleSearch = () => {
    let value = searchInput.value
    fetch(`https://restcountries.com/v3.1/name/${value}`)
        .then(res => res.json())
        .then(json => {
            console.log(json)
            name.innerHTML = json[0].name.common
            capital.innerHTML = json[0].capital
            currency.innerHTML = Object.values(json[0].currencies).map(el => el.name)
            language.innerHTML = Object.values(json[0].languages).map(el => el)
            flags.src = json[0].flags.png
            maps.href = json[0].maps.googleMaps
            fetch(`http://api.weatherapi.com/v1/current.json?key=4b9538e90e4c4ee49d860744230811&lang=ru&days=4&q=${json[0].capital}`)
                .then(res => res.json())
                .then(data => {
                    console.log(json)
                    city.innerHTML = data.location.name
                    time.innerHTML = data.location.localtime
                    tempC.innerHTML = data.current.temp_c
                    tempF.innerHTML = data.current.temp_f
                    verdict.innerHTML = data.current.condition.text

                })
        })
    result.classList.remove('hidden')
}
// submit.addEventListener('click', () => handleSearch(),  function(event) {
//     if (event.which === 13) {
//         $('#submit').click()
//     }
// })

searchInput.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
        handleSearch()
        submit.click()
    }
})


