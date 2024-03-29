/*
*  @description: The Socrata Open Data API allows you to programmatically access a wealth of open data resources
*   from governments, non-profits, and NGOs around the world. Click the link below and try a live example right now.
*
*   @maintainer: rgaia
*   @date: 06/03/2022 (GMT-3)
*/

const API_URL = 'http://localhost:8000';

/*
* Returns JSON of Peach Farms from NASA API
*/
async function getFarmsByFruitname(fruitname /*, url*/) {
  //Load fruit farm and return as JSON
  const url =  "https://api.open-nasa-raf/fruitName=" + fruitname;
  const request_url = url + fruitname;

  return null;
}


//Load Planets and return as JSON
async function httpGetPlanets() {
  const response = await fetch(`${API_URL}/v1/planets`);

  return await response.json();
}

// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
  const response = await fetch(`${API_URL}/v1/launches`);
  const fetchedLaunches = await response.json();

  return fetchedLaunches.sort((a, b) => {
    return a.flightNumber - b.flightNumber;
  });
}

// Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {
  try {
    return await fetch(`${API_URL}/v1/launches`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(launch),
    });
  } catch (err) {
    return {
      ok: false,
    };
  }
}

// Delete launch with given ID.
async function httpAbortLaunch(id) {
  try {
    return await fetch(`${API_URL}/v1/launches/${id}`, {
      method: "delete",
    });
  } catch (err) {
    console.error(err);
    return {
      ok: false,
    };
  }
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};