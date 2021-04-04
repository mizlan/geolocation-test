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
function buildQuery(allergens) {
  // use Geolocation API:
  // https://developer.mozilla.org/en-US/docs/Web/API/GeolocationCoordinates
  // to get coordinates
  longitude = GeolocationCoordinates.longitude;
  latitude = GeolocationCoordinates.latitude;
  console.log(longitude, latitude)
  // allergenString = allergens.join('%2C'); // URI-encoded comma
  allergenString = allergens.join(','); // URI-encoded comma
  url = `https://api.allergyeats.com/api/v1/restaurant/query?take=20&allergynames=${allergenString}&distance=20&location=${latitude}%2C${longitude}`
  fetch(url)
}

// wait till the HTML loads
window.onload = function() {

  // get the button element in our code
  const button = document.getElementById('restaurants');

  // add a listener so that every time the button is clicked,
  // something happens
  button.addEventListener('click', () => {
    buildQuery(['Peanuts', 'Tree Nuts']);
  });

}
