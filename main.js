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
<<<<<<< HEAD

=======
    
>>>>>>> 153127e6055966d58fd334db69faeed882629597
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
    paraAd.innerHTML = '<a href="https://www.instagram.com/springtime.energy/"> Contact us</a> to be featured here.';
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
    termsTitle.innerHTML = 'Terms and Conditions for Afro Shop Finder';
    search_results.appendChild(termsTitle);
    const termsText = document.createElement('p');
    termsText.innerHTML = '<b> Introduction </b> <br> <br> These Website Standard Terms and Conditions written on this webpage shall manage your use of our website, Afro Shop Finder, accessible at afro-shop-finder.com. <br> These Terms will be applied fully and affect to your use of this Website. By using this Website, you agreed to accept all terms and conditions written in here. You must not use this Website if you disagree with any of these Website Standard Terms and Conditions. <br> Minors or people below 18 years old are not allowed to use this Website. <br> <br> <b> Intellectual Property Rights </b> <br> <br> Other than the content you own, under these Terms, Afro Shop Finder and/or its licensors own all the intellectual property rights and materials contained in this Website. <br> You are granted limited license only for purposes of viewing the material contained on this Website. <br> <br> <b> Restrictions </b> <br> <br> You are specifically restricted from all of the following: <br> publishing any Website material in any other media; <br> selling, sublicensing and/or otherwise commercializing any Website material; <br> publicly performing and/or showing any Website material; <br> using this Website in any way that is or may be damaging to this Website; <br> using this Website in any way that impacts user access to this Website; <br> using this Website contrary to applicable laws and regulations, or in any way may cause harm to the Website, or to any person or business entity; <br> engaging in any data mining, data harvesting, data extracting or any other similar activity in relation to this Website; <br> using this Website to engage in any advertising or marketing. <br> Certain areas of this Website are restricted from being access by you and Afro Shop Finder may further restrict access by you to any areas of this Website, at any time, in absolute discretion. Any user ID and password you may have for this Website are confidential and you must maintain confidentiality as well. <br> <br> <b> Your Content </b> <br> In these Website Standard Terms and Conditions, “Your Content” shall mean any audio, video text, images or other material you choose to display on this Website. By displaying Your Content, you grant Afro Shop Finder a non-exclusive, worldwide irrevocable, sub licensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media. <br> Your Content must be your own and must not be invading any third-party\'s rights. Afro Shop Finder reserves the right to remove any of Your Content from this Website at any time without notice. <br> <br> <b> No warranties </b> <br> <br> This Website is provided “as is,” with all faults, and Afro Shop Finder express no representations or warranties, of any kind related to this Website or the materials contained on this Website. Also, nothing contained on this Website shall be interpreted as advising you. <br> <br> <b> Limitation of liability </b> <br> <br> In no event shall Afro Shop Finder, nor any of its officers, directors and employees, shall be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract.  Afro Shop Finder, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website. <br> <br> <b> Indemnification </b> <br> <br> You hereby indemnify to the fullest extent Afro Shop Finder from and against any and/or all liabilities, costs, demands, causes of action, damages and expenses arising in any way related to your breach of any of the provisions of these Terms. <br> <br> <b> Severability </b> <br> <br> If any provision of these Terms is found to be invalid under any applicable law, such provisions shall be deleted without affecting the remaining provisions herein. <br> <br> <b> Variation of Terms </b> <br> <br> Afro Shop Finder is permitted to revise these Terms at any time as it sees fit, and by using this Website you are expected to review these Terms on a regular basis. <br> <br> <b> Assignment </b> <br> <br> The Afro Shop Finder is allowed to assign, transfer, and subcontract its rights and/or obligations under these Terms without any notification. However, you are not allowed to assign, transfer, or subcontract any of your rights and/or obligations under these Terms. <br> <br> <b> Entire Agreement </b> <br> <br> These Terms constitute the entire agreement between Afro Shop Finder and you in relation to your use of this Website, and supersede all prior agreements and understandings. <br> <br> <b> Governing Law & Jurisdiction </b> <br> <br> These Terms will be governed by and interpreted in accordance with German laws, and you submit to the non-exclusive jurisdiction of the state and federal courts located in Germany for the resolution of any disputes.'
    search_results.appendChild(termsText);
<<<<<<< HEAD
};
=======
}
>>>>>>> 153127e6055966d58fd334db69faeed882629597
