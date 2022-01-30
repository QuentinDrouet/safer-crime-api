
//initialize variables (from DOM and local)
let map = L.map('map').setView([51.505, -0.09], 13);

const infoBox = document.querySelector('.info-box')
const hud = document.querySelector('.hud')
const mapDiv = document.querySelector('#map')
const starsContainer = document.querySelector('.rating-stars')
const nTitle = document.querySelector('.n-title')
const contactContainer = document.querySelector('.contact')
const infoContainer = document.querySelector('.info')
const crimeContainer = document.querySelector('.crime-details')
const listCrimeContainer = document.querySelector('.list-crime')
const arrowBack = document.querySelector('.fas.fa-arrow-left')
const allCrimes = document.querySelector('.all-crimes')

//event display or hide the list of crimes
listCrimeContainer.addEventListener('click', event => {
    infoContainer.classList.add("active")
    crimeContainer.classList.add("active")
})

arrowBack.addEventListener('click', event => {
    infoContainer.classList.remove("active")
    crimeContainer.classList.remove("active")
})


//function when the user click on the map
function onMapClick(e) {
    //empty the content of DOM containers
    starsContainer.innerHTML = ''
    nTitle.innerHTML = ''
    contactContainer.innerHTML = ''
    allCrimes.innerHTML = ''

    var marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map)

    //display or hide hud and informations about neighbourhood
    hud.classList.add("active")
    infoBox.classList.add("active")

    //initialize center of the map on london
    map.setView([e.latlng.lat, e.latlng.lng], 13)

    //fetch list of crimes from latitude and longitude
    fetch(`https://ukpolicedata.p.rapidapi.com/crimes-street/all-crime?lat=${e.latlng.lat}&lng=${e.latlng.lng}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "ukpolicedata.p.rapidapi.com",
            "x-rapidapi-key": "b4eea8d446mshc4f01aff16aa4a0p1c7187jsn3f4e64028ac2"
        }
    })
        .then(response => response.json())
        .then(crimes => {
            //use function groupby (defined below)
            const groupByCrime = groupBy("category")
            newArray = [groupByCrime(crimes)]

            //display existant crime (tried with foreach but didn't succeed....)
            if (newArray[0]["anti-social-behaviour"] != null) {
                allCrimes.innerHTML += `<p><span>${newArray[0]["anti-social-behaviour"].length}</span>anti-social-behaviour</p>`
            }
            if (newArray[0]["bicycle-theft"] != null) {
                allCrimes.innerHTML += `<p><span>${newArray[0]["bicycle-theft"].length}</span>bicycle-theft</p>`
            }
            if (newArray[0]["burglary"] != null) {
                allCrimes.innerHTML += `<p><span>${newArray[0]["burglary"].length}</span>burglary</p>`
            }
            if (newArray[0]["criminal-damage-arson"] != null) {
                allCrimes.innerHTML += `<p><span>${newArray[0]["criminal-damage-arson"].length}</span>criminal-damage-arson</p>`
            }
            if (newArray[0]["drugs"] != null) {
                allCrimes.innerHTML += `<p><span>${newArray[0]["drugs"].length}</span>drugs</p>`
            }
            if (newArray[0]["other-theft"] != null) {
                allCrimes.innerHTML += `<p><span>${newArray[0]["other-theft"].length}</span>other-theft</p>`
            }
            if (newArray[0]["possession-of-weapons"] != null) {
                allCrimes.innerHTML += `<p><span>${newArray[0]["possession-of-weapons"].length}</span>possession-of-weapons</p>`
            }
            if (newArray[0]["public-order"] != null) {
                allCrimes.innerHTML += `<p><span>${newArray[0]["public-order"].length}</span>public-order</p>`
            }
            if (newArray[0]["robbery"] != null) {
                allCrimes.innerHTML += `<p><span>${newArray[0]["robbery"].length}</span>robbery</p>`
            }
            if (newArray[0]["shoplifting"] != null) {
                allCrimes.innerHTML += `<p><span>${newArray[0]["shoplifting"].length}</span>shoplifting</p>`
            }
            if (newArray[0]["theft-from-the-person"] != null) {
                allCrimes.innerHTML += `<p><span>${newArray[0]["theft-from-the-person"].length}</span>theft-from-the-person</p>`
            }
            if (newArray[0]["vehicle-crime"] != null) {
                allCrimes.innerHTML += `<p><span>${newArray[0]["vehicle-crime"].length}</span>vehicle-crime</p>`
            }
            if (newArray[0]["violent-crime"] != null) {
                allCrimes.innerHTML += `<p><span>${newArray[0]["violent-crime"].length}</span>violent-crime</p>`
            }
            if (newArray[0]["other-crime"] != null) {
                allCrimes.innerHTML += `<p><span>${newArray[0]["other-crime"].length}</span>other-crime</p>`
            }

            //display circle and marks on marker according to the list of crime (high=red)
            let circle

            if (crimes.length < 100) {
                circle = L.circle([e.latlng.lat, e.latlng.lng], {
                    color: '#00DAC6',
                    fillColor: '#00DAC6',
                    fillOpacity: 0.5,
                    radius: 2000
                }).addTo(map)

                starsContainer.innerHTML +=
                    `<div>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star unvalid"></i>
                </div>
                <p>Safe</p>
                `
            }
            else if (crimes.length >= 100 && crimes.length < 500) {
                circle = L.circle([e.latlng.lat, e.latlng.lng], {
                    color: 'orange',
                    fillColor: 'orange',
                    fillOpacity: 0.5,
                    radius: 2000
                }).addTo(map)

                starsContainer.innerHTML +=
                    `<div>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star unvalid"></i>
                    <i class="fas fa-star unvalid"></i>
                </div>
                <p>Be careful</p>
                `

            } else {
                circle = L.circle([e.latlng.lat, e.latlng.lng], {
                    color: '#CE6679',
                    fillColor: '#CE6679',
                    fillOpacity: 0.5,
                    radius: 2000
                }).addTo(map)

                starsContainer.innerHTML +=
                    `<div>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star unvalid"></i>
                        <i class="fas fa-star unvalid"></i>
                        <i class="fas fa-star unvalid"></i>
                        <i class="fas fa-star unvalid"></i>
                    </div>
                    <p>Dangerous</p>
                    `
            }

            //fetch name of neighbourhood after cliking on the map
            fetch(`https://ukpolicedata.p.rapidapi.com/locate-neighbourhood?q=${e.latlng.lat}%2C${e.latlng.lng}`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "ukpolicedata.p.rapidapi.com",
                    "x-rapidapi-key": "b4eea8d446mshc4f01aff16aa4a0p1c7187jsn3f4e64028ac2"
                }
            })
                .then(response => response.json())
                .then(region => {

                    //fetch info about the neighbourhood
                    fetch(`https://ukpolicedata.p.rapidapi.com/${region.force}/${region.neighbourhood}`, {
                        "method": "GET",
                        "headers": {
                            "x-rapidapi-host": "ukpolicedata.p.rapidapi.com",
                            "x-rapidapi-key": "b4eea8d446mshc4f01aff16aa4a0p1c7187jsn3f4e64028ac2"
                        }
                    })
                        .then(response => response.json())
                        .then(street => {

                            //display all info about the neighbourhood if exist
                            nTitle.innerHTML +=
                                `<h2>${street.name}</h2>
                                `
                            if (street.contact_details.telephone != null) {
                                contactContainer.innerHTML +=
                                    `<div>
                                    <i class="fas fa-phone-alt"></i>
                                    <p>${street.contact_details.telephone}</p>
                                    </div>
                                `
                            }
                            if (street.contact_details.email != null) {
                                contactContainer.innerHTML +=
                                    `<div>
                                    <i class="fas fa-envelope"></i>
                                    <p>${street.contact_details.email}</p>
                                    </div>
                                `
                            }
                            if (street.contact_details.website != null) {
                                contactContainer.innerHTML +=
                                    `<div>
                                    <i class="fas fa-globe-americas"></i>
                                    <p>${street.contact_details.website}</p>
                                    </div>
                                `
                            }
                            if (street.contact_details.twitter != null) {
                                contactContainer.innerHTML +=
                                    `<div>
                                    <i class="fab fa-twitter"></i>
                                    <p>${street.contact_details.twitter}</p>
                                    </div>
                                `
                            }
                        })
                })
        })
}

//event name when map is clicked
map.on('click', onMapClick)

//use dark theme map from jawg.io for better UI
var Jawg_Dark = L.tileLayer('https://{s}.tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?lang=en&access-token={accessToken}', {
    attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    minZoom: 0,
    maxZoom: 22,
    subdomains: 'abcd',
    accessToken: '24wk9dUg5dITjFaB4WXpoOtCXhffauHDhMQfTIaG6CC8ESHgAMdnGVyML5kUQqWj'
}).addTo(map)


//function to group values of array according to a key
function groupBy(key) {
    return function group(array) {
        return array.reduce((acc, obj) => {
            const property = obj[key]
            acc[property] = acc[property] || []
            acc[property].push(obj)
            return acc
        }, {})
    }
}