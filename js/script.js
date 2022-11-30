const btn = document.querySelector("#search-button");
let populationIndex = 0;

btn.addEventListener("click", (event) => {
    event.preventDefault();
    const langInput = document.querySelector("#language");
    const language = langInput.value.toLowerCase();
    langInput.value = "";
    const countryContainer = document.querySelector("#country-container");
    countryContainer.innerText = "";
    const url = `https://restcountries.com/v3.1/lang/${language}`;

    fetch(url).then((response) => {
        if (response.status >= 200 && response.status < 300) {
            return response.json();
        }
        else {
            throw "Error";
        }
    }
    ).then((countryData) => {
        // hittar index för landet med störst befolkning
        countryData.forEach((country, index) => {
            if (countryData[populationIndex].population < country.population) {
                populationIndex = index;
            }
        })
        // skapar element med info om länderna 
        countryData.forEach((country) => {
            const countryFlag = document.createElement("img");
            countryFlag.src = country.flags.png;
            const countryInfo = document.createElement("h3");
            countryInfo.innerText = `Official name: ${country.name.official}
            Subregion: ${country.subregion}
            Capital: ${country.capital}
            Population: ${country.population}`;
            countryContainer.append(countryInfo, countryFlag);

            if (country == countryData[populationIndex]) {
                countryInfo.classList.add("biggest-population-marker");
            }
        })
        populationIndex = 0;
    }
    ).catch((error) => {
        console.log(error);
        let errorMessage = document.createElement("p");
        countryContainer.append(errorMessage);
        errorMessage.innerText = "Invalid language.";
    })
})