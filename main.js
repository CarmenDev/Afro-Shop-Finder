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

// Google maps API
function initMap() {
    // Map otions
    const options = {
        zoom: 8,
        center: {lat: 53.5511, lng: 9.9937}
    }
    // New map
    const map = new google.maps.Map(document.getElementById('map-container'), options);

//     Add marker
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

// Button functions
// advertise
advertise_btn.addEventListener('click', getAd);
function getAd(e) {
    const paraAd = document.createElement('p');
    paraAd.innerHTML = '<a href="#"> Contact us</a> to be featured here.';
    search_results.appendChild(paraAd);
    form.style.display = "none";
    setTimeout(function(){
        paraAd.style.display = "none";
    }, 3000);
};

// sign in or join
login_btn.addEventListener('click', loginForm);
const form = document.getElementById('form');
function loginForm(e) {
    form.style.display = "block";

}

// help
help_btn.addEventListener('click', getHelp);
function getHelp(e) {
    const paraHelp = document.createElement('p');
    paraHelp.innerHTML = 'We are not available at the moment, please try again later.';
    const helpMeme = document.createElement('div');
    helpMeme.classList.add('helpmeme');
    helpMeme.innerHTML = '<iframe src="https://giphy.com/embed/UVeILcYrYq2PpTE4u6" width="480" height="360" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/king-of-boys-kingofboys-kemi-salami-UVeILcYrYq2PpTE4u6"></a></p>';
    form.style.display = "none";
    search_results.appendChild(paraHelp);
    search_results.appendChild(helpMeme);
    setTimeout(function(){
        paraHelp.style.display = "none";
        helpMeme.style.display = "none";
    }, 5000);
};

// Franco: use parseInt method to check if zipcode or cityname
// Fetch all the restaurants info when click on "restaurants", same for clubs and shops.
// From there filter the info from json files according to the value entered in the input field.
// 3 functions: getShops, getRestaurants, getClubs
// 1 function displayInfo to filter the data according to the inputvalue in searchbar

// Function to fetch the afro shops from the json file: use fetch
// Loop through the shop file to find a match according to the zip or city name
// Show the shops info on the right side in case there are matches
// Add markers on the map in case there are matches


// Check input value
// let check = searchbar.value == 'zipCode' || searchbar.value == 'city'; // should check if true or false
// 1 Iterate through the entire list of objects in a JSON array
// 2 then for each JSON object, we get the value mapped to the given key

// Main searchbar
shops_btn.addEventListener('click', getShops);

function getShops(e) {
    fetch("./shops.json")
        .then(function(resp) {
            return resp.json();
        })
        .then(function(data) {
            for(let prop in obj) {
                let check = searchbar.value == obj.city || searchbar.value == obj.zipCode;
                if(check) {
                    const result = obj.infos;
                    search_results.appendChild(result);
                } else {
                    search_results.innerHTML = `No results`;
                }
            }
        })
}
// "I used fetch to store the info on a remote server in the future"


// Function to fetch the restaurants from the json file: use fetch
// Loop through the restaurant file to find a match according to the zip or city name
// Show the restaurants info on the right side in case there are matches
// Add markers on the map in case there are matches
restaurants_btn.addEventListener('click', getRestaurants);

function getRestaurants(e) {
    fetch("./restaurants.json")
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data) {
        console.log(data); // Process the data, loop to go through the array and grab the key to print it. 
        // displayInfo function as callback to print the data?
    })

}



// Function to fetch the clubs from the json file: use fetch
// Loop through the club file to find a match according to the zip or city name
// Show the clubs info on the right side in case there are matches
// Add markers on the map in case there are matches
clubs_btn.addEventListener('click', getClubs);

function getClubs(e) {
    fetch("./clubs.json")
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data) {
        search_results.innerHTML = data.infos; // Process the data, loop to go through the array and grab the key to print it. 
        // displayInfo function as callback to print the data?
    })

}

// Check for input value
/*
let check = searchbar.value == "search_value"; // should check if true or false
if(check) {
    // print out infos for the corresponding objects
} else {
    search_results.innerHTML = "No results."; // add a timeout
};
*/

// Display info
function displayInfo(){
    
}; // the data should be an array

// Bottom nav
const aboutBtn = document.getElementById('about');
const privacyBtn = document.getElementById('privacy');
const cookiePref = document.getElementById('cookie');
const termsOfUse = document.getElementById('terms');

// about
aboutBtn.addEventListener('click', displayAbout);

function displayAbout() {
    const aboutUs = document.createElement('p');
    aboutUs.innerHTML = 'Afro Shop Finder is an application created in Hamburg in August 2020. <br> It helps you find afro shops, clubs and restaurants across Germany <br> thanks to a city or ZIP code search. <br> Your restaurant, club or shop does not appear in the search results? <br> Join <a href="#">here</a>.'
    search_results.appendChild(aboutUs);
};

// privacy portal
privacyBtn.addEventListener('click', displayPrivacy);

function displayPrivacy() {
    const privacyTitle = document.createElement('h1');
    privacyTitle.innerHTML = 'Afro Shop Finder Privacy Policy';
    search_results.appendChild(privacyTitle);
    const privacyText = document.createElement('p');
    privacyText.innerHTML = 'Afro Shop Finder.de is part of the Afro Shop Finder.com Group. This privacy policy will explain how our organization uses the personal data we collect from you when you use our website. <br> Topics: <br> What data do we collect? <br> How do we collect your data? <br> How will we use your data? <br> How do we store your data? <br> Marketing <br> What are your data protection rights? <br> What are cookies? <br> How do we use cookies? <br> What types of cookies do we use? <br> How to manage your cookies <br> Privacy policies of other websites <br> Changes to our privacy policy <br> How to contact us <br> How to contact the appropriate authorities'
    search_results.appendChild(privacyText);
};

// cookie preference
cookiePref.addEventListener('click', displayCookiePref);

function displayCookiePref() {
    const cookiePrefImg = document.createElement('img');
    cookiePrefImg.classList.add('cookiePrefImg');
    cookiePrefImg.src = './img/cookie_preference.jpg';
    search_results.appendChild(cookiePrefImg);
    setTimeout(function(){
        cookiePrefImg.style.display = "none";
    }, 4000);
};

// terms of use
