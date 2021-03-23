const cityname = document.getElementById('cityname');
const submitbtn = document.getElementById('submitbtn');
const city_name = document.getElementById('city_name');
const day = document.getElementById('day');
const today_date = document.getElementById('today_date');

const temp = document.getElementById('temp');
const temp_status = document.getElementById('temp_status');
const datahide = document.querySelector('.middle_layer');

const getCurrentDay = () => {
    let currentTime = new Date();
    let days = ["Sun Day", "Mon Day", "Tues Day", "Wednes Day", "Thurs Day", "Fri Day", "Satur Day"];
    const day = (days[currentTime.getDay()]);
    return day;
};

const getCurrentTime = () => {
    var now = new Date();
    var mon = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
    var month = mon[now.getMonth()];
    var dat = now.getDate();
    var hours = now.getHours();
    var mins = now.getMinutes();
    let perios = "AM";
    if (hours > 11) {
        perios = "PM";
        if (hours > 12)
            hours -= 12;
    }
    if (mins < 10) {
        mins = "0" + mins;
    }
    return `${month} ${dat} | ${hours}:${mins}${perios}`;

};
today_date.innerText = getCurrentTime();
day.innerText = getCurrentDay();
const getInfo = async(event) => {
    event.preventDefault();
    let cityval = cityname.value;

    if (cityval === "") {
        city_name.innerHTML = `plz write the name befor search`;
        datahide.classList.add('data_hide');

    } else {
        try {
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityval}&units=metric&appid=9446df50bbd1c9633f4ff579c3877b9d`;
            const respons = await fetch(url);
            const data = await respons.json();
            const ArrData = [data];
            // day.innerText =

            city_name.innerText = `${ArrData[0].name},${ArrData[0].sys.country}`;
            temp.innerText = ArrData[0].main.temp;
            const tempStatus = ArrData[0].weather[0].main;


            if (tempStatus == "Clear") {
                temp_status.innerHTML = "<i class='fas fa-sun' style='color: #e0eb15;'></i>";
            } else if (tempStatus == "Clouds") {
                temp_status.innerHTML = "<i class='fas fa-cloud' style='color: #f1f2f6;'></i>";
            } else if (tempStatus == "Rain") {
                temp_status.innerHTML = "<i class='fas fa-cloud-rain' style='color: #a4b0be;'></i>";
            } else {
                temp_status.innerHTML = "<i class='fas fa-sun' style='color: #e0eb15;'></i>";
            }

            datahide.classList.remove('data_hide');

        } catch {
            city_name.innerHTML = `plz enter the city name properly`;
            datahide.classList.add('data_hide');
        }

    }
}

submitbtn.addEventListener('click', getInfo)