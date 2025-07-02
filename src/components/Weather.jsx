import {useState} from "react";


async function GetWeather (city)
{
    const url = `https://serverweather-ev0x.onrender.com/send/`;
    try {
        const responseFromServer = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain' },
            body: city  // <<< обязательно!
        });
        let jsonResponse = await responseFromServer.json();
        console.log(jsonResponse);
        return jsonResponse;
    }
    catch (err) {
        console.error('Ошибка при получении данных:', err.message);
        return null;
    }
}



function Weather() {

    const [response, setResponse] = useState(null);
    const [cityName, setCityName] = useState('');


    const handleSubmit = (e)=> {
        e.preventDefault();
        async function fetchWeather() {
            const data = await GetWeather(cityName);
            setResponse(data);
         }
        fetchWeather();
    }


    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <label> Введите название города</label><br />
                    <input className="input"
                           type="text"
                           value={cityName}
                           onChange={(event) => setCityName(event.target.value)} />
                    <button type = "submit"> Отправить </button>
                </form>

            </div>
            <div>

                {response && (
                    <div>
                        <ul style={{ listStyle: "none", textAlign: 'left'}}>
                            <li>облачность: {response.description}</li>
                            <li>температура: {response.temperature} °C</li>
                            <li>скорость ветра: {response.windSpeed} м/с</li>
                        </ul>
                    </div>
                )}
            </div>
        </>
    )
}

export default Weather