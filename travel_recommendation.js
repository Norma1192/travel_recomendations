const searchBtn = document.getElementById("searchBtn");
const resetBtn = document.getElementById("resetBtn");

const keywords = {
    "beach": "beaches",
    "beaches": "beaches",
    "temple": "temples",
    "temples": "temples",
    "country": "countries",
    "countries": "countries"
};

const tzOptions = {
    japan: { timeZone: 'Asia/Tokyo', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' },
    australia: { timeZone: 'Australia/Sydney', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' },
    brazil: { timeZone: 'America/New_York', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' }
}


function searchInfo() {
    const input = document.getElementById("destinationInput").value.toLowerCase();
    const resultDiv = document.getElementById("result");

    resultDiv.innerHTML = '';

    fetch("travel_recommendation_api.json")
        .then(response => response.json())
        .then(data => {
            const place = input in keywords ? keywords[input] : undefined;
            const country = data.countries.find(item => item.name.toLowerCase() === input);

            if (country) {
                let divTime = document.createElement("div");
                divTime.classList.add("result-info");
                const tzInfo = new Date().toLocaleTimeString('en-US', tzOptions[input]);

                divTime.innerHTML = `<p><b>Current time in ${country.name}: </b>${tzInfo}</p>`;
                resultDiv.appendChild(divTime);
                for (let i = 0; i < country.cities.length; i++) {
                    let city = country.cities[i];
                    let divCity = addInfo(city.name, city.imageUrl, city.description);
                    resultDiv.appendChild(divCity);
                }


            } else if (place) {
                if (place === "countries") {
                    for (let i = 0; i < data[place].length; i++) {
                        let divCountry = document.createElement("div");
                        divCountry.classList.add("result-info");

                        let countryName = document.createElement("h2");
                        countryName.innerText = data[place][i].name;

                        divCountry.appendChild(countryName);
                        resultDiv.appendChild(divCountry);

                    }

                } else {
                    for (let i = 0; i < data[place].length; i++) {
                        let iPlace = data[place][i];
                        let divPlace = addInfo(iPlace.name, iPlace.imageUrl, iPlace.description);
                        resultDiv.appendChild(divPlace);
                    }
                }

            }else {
                resultDiv.innerHTML = "Destination not found."
            }

        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'An error occurred while fetching data.';
        })

}

function addInfo(pname, pimg, pdescription) {
    let divPlace = document.createElement("div");
    divPlace.classList.add("result-info");

    let placeName = document.createElement("h2");
    placeName.innerText = pname;

    let placeImg = document.createElement("img");
    placeImg.src = pimg;

    let placeDescription = document.createElement("p");
    placeDescription.innerText = pdescription;

    divPlace.appendChild(placeName);
    divPlace.appendChild(placeImg);
    divPlace.appendChild(placeDescription);

    return divPlace;
}

function resetInfo() {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";
}