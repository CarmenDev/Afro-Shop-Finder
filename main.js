// Buttons and search bar variables
const advertise_btn = document.getElementById('advertise');
const login_btn = document.getElementById('login');
const help_btn = document.getElementById('help');

const searchbar = document.querySelector('.main-searchbar');
const shops_btn = document.getElementById('shops-btn');
const restaurants_btn = document.getElementById('restaurants-btn');
const clubs_btn = document.getElementById('clubs-btn');
const save_btn = document.getElementById('save-btn');

const search_results = document.querySelector('.search_results');
// Map container variable
const map_container = document.getElementById('map-container');


// Google maps API
let map;

let options = {
    zoom: 8,
    center: {lat: 53.5511, lng: 9.9937}
}

function initMap() { 
    map = new google.maps.Map(map_container, options);
    // addNewMarkers({
    //     coords: {lat: 53.5811744, lng: 9.9347062},
    //     name: '<h3> You\'re here </h3>'
    // });
}

// Public function add new markers
let markersArray = []; // keep track of all the markers we're adding to the page

function addNewMarkers(props) {

    const marker = new google.maps.Marker({
        position: props.coords,
        map: map
    });
    
    const infoWindow = new google.maps.InfoWindow({
        content: props.name
    });

    marker.addListener('click', function() {
        infoWindow.open(map, marker);
    });
    
    markersArray.push(marker);
    
    map.setCenter(marker.getPosition());
};

// Sets the map on all markers in the array.
function setMapOnAll(map) {
    for (let i = 0; i < markersArray.length; i++) {
      markersArray[i].setMap(map);
    }
  };
// Refresh search results
function reloadDiv() {
    search_results.innerHTML = ' ';
};
// Refresh map and search results
function reloadSearch() {
   setMapOnAll(null);
   reloadDiv();
};

// Center the map to geocoded IP
// Recenter map to search results


// MAIN SEARCHBAR
shops_btn.addEventListener('click', getShops);

function getShops(e) {
    reloadSearch();
    
    // Input value variable
    const inputVal = searchbar.value;

    fetch("./shops.json")
        .then(function(resp) {
            return resp.json();
        })
        .then(function(data) {

                let newArray = data.filter(function(obj) { // new array = list of shops
                if(obj.zipCode === inputVal || obj.city === inputVal) {
                    return obj;
                }
            })

            newArray.forEach(element => {
                let print = document.createElement('li');
                print.classList.add('listElement');
                search_results.appendChild(print);
                print.textContent = element.infos;
                // ADD MULTIPLE MARKERS. Add a marker for each location

                addNewMarkers({
                    coords: JSON.parse(element.coords),
                    name: element.name
                 });
            });

        })
}

restaurants_btn.addEventListener('click', getRestaurants);

function getRestaurants(e) {
    reloadSearch();
    // Input value variable
    const inputVal = searchbar.value;

    fetch("./restaurants.json")
        .then(function(resp) {
            return resp.json();
        })
        .then(function(data) {

            const newArray = data.filter(function(obj) {
                if(obj.zipCode === inputVal || obj.city === inputVal) {
                    return obj;
                }
            }) 
         
            newArray.forEach(element => {
                let print = document.createElement('li');
                print.classList.add('listElement');
                search_results.appendChild(print);
                print.textContent = element.infos;  
                // ADD MULTIPLE MARKERS. Add a marker for each location

                addNewMarkers({
                    coords: JSON.parse(element.coords),
                    name: element.name
                 });
            });
        })
}

clubs_btn.addEventListener('click', getClubs);

function getClubs(e) {
    reloadSearch();
    // Input value variable
    const inputVal = searchbar.value;

    fetch("./clubs.json")
        .then(function(resp) {
            return resp.json();
        })
        .then(function(data) {

            const newArray = data.filter(function(obj) {
                if(obj.zipCode === inputVal || obj.city === inputVal) {
                    return obj;
                }
            }) 
            
            newArray.forEach(element => {
                let print = document.createElement('li');
                print.classList.add('listElement');
                search_results.appendChild(print);
                print.textContent = element.infos;
                // ADD MULTIPLE MARKERS. Add a marker for each location

                addNewMarkers({
                    coords: JSON.parse(element.coords),
                    name: element.name
                 });
            });
        })
}

// BUTTON FUNCTIONS
// advertise
advertise_btn.addEventListener('click', getAd);
function getAd(e) {
    reloadSearch();
    const paraAd = document.createElement('p');
    paraAd.innerHTML = '<a href="#"> Contact us</a> to be featured here.';
    search_results.appendChild(paraAd);
    form.style.display = "none";
    setTimeout(function(){
        paraAd.style.display = "none";
    }, 3000);
};

// sign in or join
// login_btn.addEventListener('click', loginForm);
// const form = document.getElementById('form');
// function loginForm(e) {
//     form.style.display = "block";
// }

// help
help_btn.addEventListener('click', getHelp);
function getHelp(e) {
    reloadSearch();
    const paraHelp = document.createElement('p');
    paraHelp.innerHTML = 'We\'re not available at the moment, please try again later.';
    const helpMeme = document.createElement('div');
    helpMeme.classList.add('helpmeme');
    helpMeme.innerHTML = '<iframe src="https://giphy.com/embed/UVeILcYrYq2PpTE4u6" width="480" height="360" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/king-of-boys-kingofboys-kemi-salami-UVeILcYrYq2PpTE4u6"></a></p>';
    search_results.appendChild(paraHelp);
    search_results.appendChild(helpMeme);
    setTimeout(function(){
        paraHelp.style.display = "none";
        helpMeme.style.display = "none";
    }, 5000);
};

// BOTTOM NAV
const aboutBtn = document.getElementById('about');
const privacyBtn = document.getElementById('privacy');
const cookiePref = document.getElementById('cookie');
const termsOfUse = document.getElementById('terms');

// about
aboutBtn.addEventListener('click', displayAbout);

function displayAbout() {
    reloadSearch();
    const aboutUs = document.createElement('p');
    aboutUs.innerHTML = 'Afro Shop Finder is an application created in Hamburg in August 2020. <br> It helps you find afro shops, clubs and restaurants across Germany <br> thanks to a city or ZIP code search.'
    search_results.appendChild(aboutUs);
};

// privacy portal
privacyBtn.addEventListener('click', displayPrivacy);

function displayPrivacy() {
    reloadSearch();
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
    reloadSearch();
    const cookiePrefImg = document.createElement('img');
    cookiePrefImg.classList.add('cookiePrefImg');
    cookiePrefImg.src = './img/cookie_preference.jpg';
    search_results.appendChild(cookiePrefImg);
    setTimeout(function(){
        cookiePrefImg.style.display = "none";
    }, 4000);
};

// terms of use
termsOfUse.addEventListener('click', displayTerms)

function displayTerms() {
    reloadSearch();
    const termsTitle = document.createElement('h1');
    termsTitle.innerHTML = 'Terms and Conditions';
    search_results.appendChild(termsTitle);
    const termsText = document.createElement('p');
    termsText.innerHTML = 'The purpose of a Terms and Conditions agreement is to prevent misunderstandings between the business owner (you), and the consumer. The agreement helps you: <br>Protect your intellectual property <br> Avoid website abuse <br> Define the limits of your legal obligations to the consumer <br> Essentially, the T&C helps you run your business more effectively <br> and with greater peace of mind. <br> This agreement forms the basis of an enforceable legal relationship. <br> It tells anyone browsing your website, whether they are a casual visitor or an active client, what their legal responsibilities and rights are.<br> It also gives you, as the business owner and service provider, authority over certain undesirable things that a consumer may do on your website. <br> However, let us consider the specific reasons why business owners should always include a Terms and Conditions agreement on their website.'
    search_results.appendChild(termsText);
}
