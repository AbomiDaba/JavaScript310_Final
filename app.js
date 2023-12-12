
const input = document.getElementById('input');
const button = document.getElementById('button');
const searchDiv = document.getElementById('search')
const weatherListDiv = document.getElementById('weather-list')
const toDelete = document.getElementById('toDelete');

setTimeout (() => {
    toDelete.remove()
}, 10000)

// creates div and weather data to go in div for each day
const createList = (listOfDays) => {
    while (weatherListDiv.firstChild) {
        weatherListDiv.removeChild(weatherListDiv.firstChild);
    }
    const row1 = document.createElement('div')
    const row2 = document.createElement('div')
    row1.id = 'row-1'
    row2.id = 'row-2'
    row1.classList.add('rows');
    row2.classList.add('rows');
    weatherListDiv.appendChild(row1);
    weatherListDiv.appendChild(row2);

    // loop thru returned list of days
    for (let day = 0; day < listOfDays.length; day++) {
        const currentDay = listOfDays[day];
        console.log(currentDay)
        // create html elements to display weather data
        const dayDiv = document.createElement('div');
        const h5 = document.createElement('h5');
        const img = document.createElement('img');
        const descriptionDiv = document.createElement('div');
        const description = document.createElement('p');
        const tempDiv = document.createElement('div');
        const highTemp = document.createElement('p')
        const lowTemp = document.createElement('p');
        // Add class name and appemd elements to divs
        dayDiv.classList.add('weather-days');
        tempDiv.classList.add('temp')
        descriptionDiv.appendChild(img);
        descriptionDiv.appendChild(description);
        dayDiv.appendChild(h5);
        dayDiv.appendChild(descriptionDiv);
        dayDiv.appendChild(tempDiv);
        if (day <= 4) {
            row1.appendChild(dayDiv);
        } else {
            row2.appendChild(dayDiv);
            
        }
        // Put the high and low temps to temp div
        tempDiv.appendChild(highTemp)
        tempDiv.appendChild(lowTemp);
        // Insert weather data into elements
        description.innerText = currentDay.day.condition.text
        img.src = `https:${currentDay.day.condition.icon}`;
        const strongTag = document.createElement('strong');
        strongTag.innerText = `${currentDay.day.maxtemp_f} / `;
        highTemp.appendChild(strongTag);
        lowTemp.innerText = currentDay.day.mintemp_f;
        const date = new Date(currentDay.date);
        console.log(date)
        const dayOfWeek = date.getDay();
        console.log(dayOfWeek)

        if (dayOfWeek === 0) {
            h5.innerText = 'Sunday'
        } else if (dayOfWeek === 1 ) {
            h5.innerText = 'Monday'
        } else if (dayOfWeek === 2 ) {
            h5.innerText = 'Tuesday'
        } else if (dayOfWeek === 3 ) {
            h5.innerText = 'Wednessday'
        } else if (dayOfWeek === 4 ) {
            h5.innerText = 'Thursday'
        } else if (dayOfWeek === 5 ) {
            h5.innerText = 'Friday'
        } else if (dayOfWeek === 6 ) {
            h5.innerText = 'Saturday'
        }


    }
}

searchDiv.addEventListener('click', (e) => {
    if (e.target.id === 'button' ) {
        if (input.value.trim().length === 0) {
            e.preventDefault()
            input.classList.add('error');
            alert('Please enter a city');
        } else {
            input.classList.remove('error');
            const location = input.value;
            let url = `https://api.weatherapi.com/v1/forecast.json?key=724ac1ecd0904090820195607230912&q=${location}&days=10&aqi=no&alerts=no`;

            const wetherCall = async () => {
                try {
                    const res = await fetch(url);
                    const data = await res.json();
                    const forecastday = await data.forecast.forecastday;
                    // console.log(forecastday);
                    createList(forecastday)
                    
                } catch (error) {
                    console.log(error)
                }
            }
            localStorage.setItem('Location', input.value);
            wetherCall()

        }
    }
})
