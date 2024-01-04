document.addEventListener("DOMContentLoaded", () => {
    const earthquakeDataElement = document.getElementById("earthquakeData");
    const apiUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&orderby=time&starttime=2023-01-04&endtime=2023-01-05&minmagnitude=5";
  
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Handle the earthquake data here and display it on the page
        const earthquakes = data.features;
        earthquakes.forEach(earthquake => {
          const { mag, place, time, url } = earthquake.properties;
          const earthquakeInfo = `
            <div>
              <h3>${place}</h3>
              <p>Magnitude: ${mag}</p>
              <p>Time: ${new Date(time).toLocaleString()}</p>
              <p><a href="${url}" target="_blank">More info</a></p>
            </div>`;
          earthquakeDataElement.innerHTML += earthquakeInfo;
        });
      })
      .catch(error => {
        console.error('There was a problem fetching the earthquake data:', error);
      });
  });
  