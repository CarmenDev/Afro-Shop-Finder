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
    privacyTitle.innerHTML = 'Legal Notice';
    search_results.appendChild(privacyTitle);
    const privacyText = document.createElement('p');
    privacyText.innerHTML = '<b> Imprint / Angaben gemäß § 5 TMG </b><br> Carmen Odimba <br> Web Developer <br> Kieler Straße 256 <br> 22525 Hamburg <br> <b< Contact / Kontakt </b>Telephone/Telefon: +49 40 63734743 <br> E-mail: carmen.odimba@laposte.net <br> <br> <b> Responsible for content / Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV </b> <br> Carmen Odimba <br> Kieler Straße 256 <br> 22525 Hamburg <br> Germany <br><br> <b>Disclaimer /Haftungsausschluss</b> <br> <b>Liability for content</b> <br> The content of this site has been created with the greatest of care. I cannot, however, guarantee that the information in it is accurate, complete or up-to-date. As a service provider I am responsible under Section 6(1) of the German Media Services Inter-State Agreement and Section 8(1) of the German Teleservices Act for my own content on this site. Service providers are not however obliged to monitor third party information transmitted or stored on their site by them or to look for circumstances which may suggest a violation of the law. This does not affect my statutory obligations to remove or block the use of information. My liability in such cases shall however commence from the time I become aware of an actual violation. On becoming aware of such violations I shall remove this content immediately. <br> <br> <b> Haftung für Inhalte </b> <br> Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann ich jedoch keine Gewähr übernehmen. Als Diensteanbieter bin ich gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG bin ich als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werde ich diese Inhalte umgehend entfernen. <br> <br> <b>Liability for links</b> <br>This website contains links to external third-party websites, over the content of which I have no control. I cannot, therefore, make any guarantees regarding this third-party content. Responsibility for the content of linked sites lies solely with the provider or operator of the site concerned. All linked sites were checked for possible violations of the law when they were linked to mine. At that time I was not aware of any content which may violate the law. However, I cannot be expected to monitor the content of linked sites on an ongoing basis unless I have reason to suspect a violation of the law. On becoming aware of such a violation I shall remove the respective link immediately. <br> <br> <b>Haftung für Links</b> <br>Diese Webseite enthält Links zu externen Webseiten Dritter, auf deren Inhalte ich keinen Einfluss habe. Deshalb kann ich für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werde ich derartige Links umgehend entfernen.<br> <br> <b> Copyright </b> <br>The operator of this site makes every effort to respect the copyrights of outside parties and to employ his own material and material in the public domain. All content and material on this site created by the site operator is governed by German copyright law.  Downloads and copies of this site may be made for private, non-commercial use only. Reproduction, processing, distribution and any form of exploitation beyond that permitted by copyright law requires the written consent of the author or creator concerned. Contributions by third parties are identified as such. Should anyone become aware of a possible copyright infringement, I kindly request that you inform me of such. Upon becoming aware of such a violation I shall remove the respective content immediately. <br> <br> <b> Urheberrecht </b> <br> Die durch der Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitte ich um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen. <br> <br> <b> Data protection </b> <br> As a rule the use of this website is possible without providing any personally relevant data. Any provision of personal data (e.g. name, address or email addresses) occurs entirely on a voluntary basis. These data will not be provided to any third parties without the user\'s express approval. Be aware that the transmission of data via the internet (e.g. communication by email) is subject to security gaps. Complete protection of data from unauthorized access by third parties is not possible. The use of contact details published under the statutory requirement to provide acknowledgements by third parties for the purpose of the transmission of unsolicited advertising and informational material is expressly opposed. The site operator expressly reserves the right to take legal action against the unsolicited mailing of advertising information by way of spamming or similar. <br> <br> <b> Datenschutz </b> <br> Die Nutzung diesrer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf diesen Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder eMail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben. Ich weise darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich. <br> Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten durch Dritte zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit ausdrücklich widersprochen. Der Betreiber der Seiten behält sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-Mails, vor.';
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
    termsText.innerHTML = '<b> Introduction </b> <br> <br> These Website Standard Terms and Conditions written on this webpage shall manage your use of our website, Afro Shop Finder, accessible at afro-shop-finder.com. <br> These Terms will be applied fully and affect to your use of this Website. By using this Website, you agreed to accept all terms and conditions written in here. You must not use this Website if you disagree with any of these Website Standard Terms and Conditions. <br> Minors or people below 18 years old are not allowed to use this Website. <br> <br> <b> Intellectual Property Rights </b> <br> <br> Other than the content you own, under these Terms, Afro Shop Finder and/or its licensors own all the intellectual property rights and materials contained in this Website. <br> You are granted limited license only for purposes of viewing the material contained on this Website. <br> <br> <b> Restrictions </b> <br> <br> You are specifically restricted from all of the following: <br> publishing any Website material in any other media; <br> selling, sublicensing and/or otherwise commercializing any Website material; <br> publicly performing and/or showing any Website material; <br> using this Website in any way that is or may be damaging to this Website; <br> using this Website in any way that impacts user access to this Website; <br> using this Website contrary to applicable laws and regulations, or in any way may cause harm to the Website, or to any person or business entity; <br> engaging in any data mining, data harvesting, data extracting or any other similar activity in relation to this Website; <br> using this Website to engage in any advertising or marketing. <br> Certain areas of this Website are restricted from being access by you and Afro Shop Finder may further restrict access by you to any areas of this Website, at any time, in absolute discretion. Any user ID and password you may have for this Website are confidential and you must maintain confidentiality as well. <br> <br> <b> Your Content </b> <br> <br> In these Website Standard Terms and Conditions, “Your Content” shall mean any audio, video text, images or other material you choose to display on this Website. By displaying Your Content, you grant Afro Shop Finder a non-exclusive, worldwide irrevocable, sub licensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media. <br> Your Content must be your own and must not be invading any third-party\'s rights. Afro Shop Finder reserves the right to remove any of Your Content from this Website at any time without notice. <br> <br> <b> No warranties </b> <br> <br> This Website is provided “as is,” with all faults, and Afro Shop Finder express no representations or warranties, of any kind related to this Website or the materials contained on this Website. Also, nothing contained on this Website shall be interpreted as advising you. <br> <br> <b> Limitation of liability </b> <br> <br> In no event shall Afro Shop Finder, nor any of its officers, directors and employees, shall be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract.  Afro Shop Finder, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website. <br> <br> <b> Indemnification </b> <br> <br> You hereby indemnify to the fullest extent Afro Shop Finder from and against any and/or all liabilities, costs, demands, causes of action, damages and expenses arising in any way related to your breach of any of the provisions of these Terms. <br> <br> <b> Severability </b> <br> <br> If any provision of these Terms is found to be invalid under any applicable law, such provisions shall be deleted without affecting the remaining provisions herein. <br> <br> <b> Variation of Terms </b> <br> <br> Afro Shop Finder is permitted to revise these Terms at any time as it sees fit, and by using this Website you are expected to review these Terms on a regular basis. <br> <br> <b> Assignment </b> <br> <br> The Afro Shop Finder is allowed to assign, transfer, and subcontract its rights and/or obligations under these Terms without any notification. However, you are not allowed to assign, transfer, or subcontract any of your rights and/or obligations under these Terms. <br> <br> <b> Entire Agreement </b> <br> <br> These Terms constitute the entire agreement between Afro Shop Finder and you in relation to your use of this Website, and supersede all prior agreements and understandings. <br> <br> <b> Governing Law & Jurisdiction </b> <br> <br> These Terms will be governed by and interpreted in accordance with German laws, and you submit to the non-exclusive jurisdiction of the state and federal courts located in Germany for the resolution of any disputes.'
    search_results.appendChild(termsText);
};
