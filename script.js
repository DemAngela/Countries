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

submit.addEventListener('click', () => {
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
        })
    result.classList.remove('hidden')
})

