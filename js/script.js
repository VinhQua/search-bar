const cityList = document.querySelector('.place-list');
const searchInput = document.querySelector('input');


const cities = [];
const getCityData = async function(){
    const request = await fetch(`https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json`);
    const cityData = await request.json();
    //console.log(cityData);
    cities.push(...cityData);
    //console.log(cities);
    displayCityInfo();
}
getCityData();

const displayCityInfo = function(){
    console.log(cities);
    cities.forEach(function(place){

        const li = document.createElement("li");
        const cityName = place.city;
        const stateName = place.state
        li.innerHTML = `${cityName}, ${stateName} `;
        cityList.append(li);
        //console.log(li);
    });
};
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
const filterCity = function(){
    
    const regex = new RegExp(searchInput.value,"gi");
    cityList.innerHTML = "";
    cities.forEach(place =>{
        if (place.city.match(regex) || place.state.match(regex)){
            const li = document.createElement("li");
            const cityName = place.city.replace(regex,`<span class="highlight">${searchInput.value}</span>`);
            const stateName = place.state.replace(regex,`<span class="highlight">${searchInput.value}</span>`);
            const population = `<span class="population">${numberWithCommas(place.population)}</span>`;
            li.innerHTML = `<span class="name">${cityName}, ${stateName}</span> 
            <span class="detail">${population}</span>`;
            
            cityList.append(li);
        }
    })
}

searchInput.addEventListener('input',filterCity);
