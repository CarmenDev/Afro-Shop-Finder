// AFRO SHOP FINDER
// An app to find all the afro shops, restaurants and clubs according to their location - either city or ZIP

// Use my own list of data (JSON file)? 
// Use the google map API?

// The user will enter a German city or ZIP in the search bar as well as either click on shops, restaurants or clubs.
// For eg, writing "Mannheim" and then clicking on "Shops" will give us the list of all afro shops in Mannheim. This list should appear on the right side, as well as the location on a Google map on the left side.+---
// For eg, writing "76829" and then clicking on "Restaurants" will give us the list of all afro restaurants in Landau/Pfalz. This list shouls appear on the right side, as well as the location on a Google map on the left side.
// If the search has no result, the message "Sorry, it looks like there's nothing going on in that area..." should appear.

// When you click on "Advertise", the message "Contact us to be featured here." with a ahref link on "Contact us" should appear on the right side.
// When you click on "Sign in or join", you should be redirected to a login formular
// When you click on "Help", a message that has to do with you getting help will appear on the right side. I should think of a joke with a meme.
// Saving your search should be an option with the button "Save search" --> localStorage


// Google maps API
function initMap() {
    // Map otions
    const options = {
        zoom: 8,
        center: {lat: 53.5511, lng: 9.9937}
    }
    // New map
    const map = new google.maps.Map(document.getElementById('map-container'), options);

//     // Add marker
//     let marker = new google.maps.Marker({
//         position: {lat: 53.5908, lng: 9.9316},
//         map: map
//     });
    
    addMarker({lat: 53.5511, lng: 9.9937});
    // Add Marker Function
    function addMarker(coords) {
        let marker = new google.maps.Marker({
            position: coords,
            map: map
        });
    }
}

// Buttons and search bar
const advertise_btn = document.getElementById('advertise');
const login_btn = document.getElementById('login');
const help_btn = document.getElementById('help');

const searchbar = document.querySelector('.main-searchbar');
const shops_btn = document.getElementById('shops-btn');
const restaurants_btn = document.getElementById('restaurants-btn');
const clubs_btn = document.getElementById('clubs-btn');
const save_btn = document.getElementById('save-btn');

const search_results = document.querySelector('.search_results');

// Buttons functions
advertise_btn.addEventListener('click', getAd);
function getAd(e) {
    const paraAd = document.createElement("P");
    paraAd.innerHTML = "Contact us to be featured here.";
    search_results.appendChild(paraAd);
};

help_btn.addEventListener('click', getHelp);
function getHelp(e) {
    const paraHelp = document.createElement('p');
    paraHelp.innerHTML = 'We are not available at the moment, please try again later.';
    const helpMeme = document.createElement('div');
    helpMeme.classList.add('helpmeme');
    helpMeme.innerHTML = '<iframe src="https://giphy.com/embed/UVeILcYrYq2PpTE4u6" width="480" height="360" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/king-of-boys-kingofboys-kemi-salami-UVeILcYrYq2PpTE4u6"></a></p>';
    search_results.appendChild(paraHelp);
    search_results.appendChild(helpMeme);

};

// Function to fetch the afro shops info for all German cities
// Loop through the shop file to find a match according to the zip or city name
document.querySelector('shops-btn').addEventListener('click', getShops);

function getShops(e) {
    
}


// Function to fetch the afro restaurants infor for all German cities
// Loop through the restaurant file to find a match according to the zip or city name
document.querySelector('restaurants-btn').addEventListener('click', getRestaurants);

function getRestaurants(e) {
    const xhr = new XMLHttpRequest();

    xhr.open(``);

    e.preventDefault();
}



// How to fetch the afro clubs info for all German cities
document.querySelector('clubs-btn').addEventListener('click', getClubs);

function getClubs(e) {
    const xhr = new XMLHttpRequest();

    xhr.open(``);

    e.preventDefault();
}



// How to materialize the info on the map




// Local storage?

