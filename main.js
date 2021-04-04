// the AllergyEats API needs geographical coordinates (latitude and longitude)
// embedded in the URL as parameters

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
function buildQuery(info, allergens) {
  // use Geolocation API:
  // https://developer.mozilla.org/en-US/docs/Web/API/GeolocationCoordinates
  // to get coordinates
  // allergenString = allergens.join('%2C'); // URI-encoded comma
  allergenString = allergens.join(',');

  // after we retrieve the URL
  function onRetrieve(position) {
    info.innerHTML = 'fetching data'
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(longitude, latitude);
    url = `https://api.allergyeats.com/api/v1/restaurant/query?take=20&allergynames=${allergenString}&distance=20&location=${latitude}%2C${longitude}`

    fetch(url).then((json) => {
      console.log(json);
      info.innerHTML = json;
    }).catch(() => {
      info.innerHTML = 'could not get data';
    });
  }
  function onError() {
    // tell the user their location could not be retrieved
  }

  info.innerHTML = 'getting location...'
  navigator.geolocation.getCurrentPosition(onRetrieve, onError);

}

// wait till the HTML loads
window.onload = function() {

  // get the button element in our code
  const button = document.getElementById('restaurants');
  const infoBox = document.getElementById('restaurant-info');

  // add a listener so that every time the button is clicked,
  // something happens
  button.addEventListener('click', () => {
    buildQuery(infoBox, ['Peanuts', 'Tree Nuts']);
  });

}
