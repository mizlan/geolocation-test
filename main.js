// the AllergyEats API needs geographical coordinates (latitude and longitude)
// embedded in the URL as parameters

userLocation = {
  latitude: undefined,
  longitude: undefined,
  denied: false,
  loaded: false
}

// use Geolocation API:
// https://developer.mozilla.org/en-US/docs/Web/API/GeolocationCoordinates
// to get coordinates
function getPosition(options) {
  return new Promise((resolve, reject) => 
    navigator.geolocation.getCurrentPosition(resolve, reject, options)
  );
}

let locationFetch = getPosition().then((position) => {
  userLocation.latitude  = position.coords.latitude;
  userLocation.longitude = position.coords.longitude;
  userLocation.loaded = true;
  document.getElementById('restaurant-info').innerHTML = 'location loaded';
}).catch((err) => {
  if (err.message.includes('denied')) {
    denied = true;
  }
  infoBox.innerHTML = 'location denied';
});

function locationHasLoaded() {
  return userLocation.loaded
}

// supported allergens:
// - Peanuts
// - Dairy
// - Wheat
// - Fish
// - Sesame
// - Tree Nuts
// - Eggs
// - Gluten
// - Shellfish
// - Soy
async function buildQuery(info, allergens) {

  await locationFetch;
  info.innerHTML = 'getting nearby restaurants...'

  allergenString = allergens.join(',');

  longitude = userLocation.longitude;
  latitude = userLocation.latitude;
  url = `https://api.allergyeats.com/api/v1/restaurant/query?take=20&allergynames=${allergenString}&distance=20&location=${latitude}%2C${longitude}`

  fetch(url).then(async (res) => {
    let data = await res.json();
    info.innerHTML = JSON.stringify(data);
    console.log(data);
  }).catch(() => {
    info.innerHTML = 'could not get data';
  });
}

window.onload = function() {

  const button = document.getElementById('restaurants');
  const infoBox = document.getElementById('restaurant-info');

  if (locationHasLoaded()) {
    infoBox.innerHTML = 'location loaded'
  } else if (userLocation.denied) {
    infoBox.innerHTML = 'location denied, cannot get nearby restaurants'
  } else {
    infoBox.innerHTML = 'getting location...'
  }

  button.addEventListener('click', () => {
    buildQuery(infoBox, ['Peanuts', 'Tree Nuts']);
  });
}
