document.addEventListener("DOMContentLoaded", () => {
    const earthquakeDataElement = document.getElementById("earthquakeData");
    const loadingElement = document.getElementById("loadingMessage");
    //const currentTimeUTC = new Date().toISOString();
    loadingElement.style.display = "block";
  
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('.')[0];

  const apiUrl = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&orderby=time&updatedafter=${twentyFourHoursAgo}&minmagnitude=5`;
  
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        loadingElement.style.display = "none";
        const earthquakes = data.features;
        earthquakes.forEach(earthquake => {
          const { mag, place, time, url } = earthquake.properties;
          const earthquakeInfo = `
            <div class="earthquake-item">
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
  