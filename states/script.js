document.addEventListener("DOMContentLoaded", () => {
  console.log("Website Loaded");

  // Animate image when it scrolls into view
  const image = document.querySelector(".about-image");
  if (image) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(image);
  }

  // Live Weather for Kovalam, Kerala
  // 🌦 Dynamic Live Weather Based on Page
const weatherApiKey = "3cd0513e2455b77b52837f124036290c"; // Your real key
let weatherCity = "";

if (window.location.pathname.includes("kovalam.html")) {
  weatherCity = "Kovalam,IN";
} else if (window.location.pathname.includes("varkala.html")) {
  weatherCity = "Varkala,IN"; // Different city!
} else {
  weatherCity = "Thiruvananthapuram,IN"; // fallback or use relevant area
}

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${weatherCity}&appid=${weatherApiKey}&units=metric`)
  .then((response) => response.json())
  .then((data) => {
    const temp = data.main.temp;
    const desc = data.weather[0].description;
    const weatherElement = document.getElementById("live-weather");
    if (weatherElement) {
      weatherElement.innerHTML = `🌤️ ${temp}°C, ${desc}`;
    }
  })
  .catch((error) => {
    console.error("Error fetching weather:", error);
    const weatherElement = document.getElementById("live-weather");
    if (weatherElement) {
      weatherElement.innerHTML = "Weather info not available";
    }
  });


  // Geolocation for directions
  // Geolocation for directions (Dynamic Beach Name & Coords)
const directionDiv = document.getElementById("auto-direction");
if (directionDiv) {
  directionDiv.innerHTML = "📍 Getting your location...";

  let destLat, destLng, beachName;

  if (window.location.pathname.includes("kovalam.html")) {
    destLat = 8.4002;
    destLng = 76.9784;
    beachName = "Kovalam Beach";
  } else if (window.location.pathname.includes("varkala.html")) {
    destLat = 8.7364;
    destLng = 76.7160;
    beachName = "Varkala Beach";
  } else if (window.location.pathname.includes("catamaran.html")) {
    destLat = 9.4981;
    destLng = 76.3388;
    beachName = "Alleppey Beach";
  } else {
    destLat = 8.5241;
    destLng = 76.9366;
    beachName = "the destination";
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        const distance = getDistanceFromLatLonInKm(
          userLat,
          userLng,
          destLat,
          destLng
        ).toFixed(1);

        directionDiv.innerHTML = `
          📍 You are <strong>${distance} km</strong> from <strong>${beachName}</strong>. <br>
          <a href="https://www.google.com/maps/dir/?api=1&destination=${destLat},${destLng}" target="_blank">🚗 Get Directions</a>
        `;
      },

        (error) => {
          console.error("Geolocation error:", error);
          let msg = "Location access denied or unavailable.";
          if (error.code === 1) msg = "❌ Permission denied. Please allow location.";
          else if (error.code === 2) msg = "❌ Position unavailable.";
          else if (error.code === 3) msg = "❌ Timeout getting location.";
          directionDiv.innerHTML = msg;
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      directionDiv.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

  // Distance calculation
  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
});
// Weather API Key (replace if needed)
const weatherApiKey = "3cd0513e2455b77b52837f124036290c";

// Coordinates and cities for each beach
const beachData = {
  "Kovalam Beach": { lat: 8.4002, lng: 76.9784, city: "Kovalam,IN" },
  "Varkala Beach": { lat: 8.7364, lng: 76.7160, city: "Varkala,IN" },
  "Alleppey Beach": { lat: 9.4981, lng: 76.3388, city: "Alleppey,IN" }
};

let map;
let marker;

// Called by Google Maps script
function initMap() {
  const defaultLocation = { lat: 8.5241, lng: 76.9366 }; // Trivandrum center
  map = new google.maps.Map(document.getElementById("map"), {
    center: defaultLocation,
    zoom: 9,
  });

  marker = new google.maps.Marker({
    position: defaultLocation,
    map,
    title: "Select a beach from the dropdown",
  });

  // Event listener for dropdown
  const selector = document.getElementById("beachSelector");
  if (selector) {
    selector.addEventListener("change", () => {
      const selected = selector.value;
      if (selected && beachData[selected]) {
        updateMap(selected);
        updateWeather(selected);
        updateDirection(selected);
      }
    });
  }
}

// Update map with selected beach
function updateMap(beachName) {
  const { lat, lng } = beachData[beachName];
  const location = { lat, lng };

  map.setCenter(location);
  map.setZoom(13);
  marker.setPosition(location);
  marker.setTitle(beachName);
}

// Fetch and display weather
function updateWeather(beachName) {
  const city = beachData[beachName].city;
  const weatherDiv = document.getElementById("weather");
  weatherDiv.innerHTML = "🌤️ Loading weather...";

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`)
    .then(res => res.json())
    .then(data => {
      const temp = data.main.temp;
      const desc = data.weather[0].description;
      weatherDiv.innerHTML = `🌡️ ${temp}°C, ${desc}`;
    })
    .catch(err => {
      console.error("Weather fetch error:", err);
      weatherDiv.innerHTML = "❌ Weather info not available.";
    });
}

// Get user's distance and directions to selected beach
function updateDirection(beachName) {
  const dirDiv = document.getElementById("auto-direction");
  const { lat: destLat, lng: destLng } = beachData[beachName];

  dirDiv.innerHTML = "📍 Getting your location...";

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userLat = pos.coords.latitude;
        const userLng = pos.coords.longitude;

        const distance = getDistance(userLat, userLng, destLat, destLng).toFixed(1);

        dirDiv.innerHTML = `
          📍 You are <strong>${distance} km</strong> from ${beachName}.<br>
          <a href="https://www.google.com/maps/dir/?api=1&destination=${destLat},${destLng}" target="_blank">🚗 Get Directions</a>
        `;
      },
      (err) => {
        let msg = "❌ Location unavailable.";
        if (err.code === 1) msg = "❌ Permission denied.";
        if (err.code === 2) msg = "❌ Position unavailable.";
        if (err.code === 3) msg = "❌ Timeout.";
        dirDiv.innerHTML = msg;
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  } else {
    dirDiv.innerHTML = "❌ Geolocation not supported.";
  }
}

// Distance calculator (Haversine formula)
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
function toRad(deg) {
  return deg * (Math.PI / 180);
}
const slider = document.getElementById('slider');

function slideLeft() {
  slider.scrollBy({
    left: -320,
    behavior: 'smooth'
  });
}

function slideRight() {
  slider.scrollBy({
    left: 320,
    behavior: 'smooth'
  });
}

// ✅ 1. Add this before the function
const streetViewLinks = {
  "kovalam.html": "https://www.google.com/maps/embed?pb=!4v1748074800901!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJQ1V1Sld3LUFF!2m2!1d8.383684984014423!2d76.98002295693998!3f306.97491174026277!4f-12.728553216554872!5f1.6393872335022586" ,
  "varkala.html": "https://www.google.com/maps/embed?pb=!4v1748880285197!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJQzRpNm1NMEFF!2m2!1d8.733313493646282!2d76.70496314351942!3f193.13932993894622!4f-2.3595838696455758!5f0.7820865974627469",
  "alleppey.html": "https://www.google.com/maps/embed?pb=!4v1749221052526!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJQzhnTXZackFF!2m2!1d9.492748183208507!2d76.31777591923299!3f276.1243210814369!4f10.300756920850617!5f0.7820865974627469",
  "rushikonda.html": "https://www.google.com/maps/embed?pb=!4v1749459478432!6m8!1m7!1sIgTGcfj5uR1pdIgtHOVmHQ!2m2!1d17.78212229087661!2d83.38511090232286!3f82.6368007939211!4f-4.878652781175646!5f0.7820865974627469",
  "rkbeach.html": "https://www.google.com/maps/embed?pb=!4v1749466857054!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJQ2hyNF93YUE.!2m2!1d17.71416181228227!2d83.32365786596486!3f110.7483!4f0!5f0.7820865974627469" ,
  "rameswaram.html": "https://www.google.com/maps/embed?pb=!4v1749396574880!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJQ01qTlh5TWc.!2m2!1d9.290203028090364!2d79.32152601739766!3f136.30203693814352!4f-14.123224958502675!5f0.49515859479445656",
  "pondicherry.html": "https://www.google.com/maps/embed?pb=!4v1749442167998!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJQ0U1NENhYUE.!2m2!1d11.93127728537682!2d79.83580193185354!3f280.36896153141527!4f-5.5609587593394!5f0.7820865974627469", 
  "palolem.html": "https://www.google.com/maps/embed?pb=!4v1749576991567!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJRDR0Ti12MUFF!2m2!1d15.00990472495908!2d74.02322003926467!3f48.9093260143917!4f2.0404159500408667!5f0.7820865974627469" ,
  "om.html": "https://www.google.com/maps/embed?pb=!4v1749446092222!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJQ2s2Zi1ZZEE.!2m2!1d14.51924049983513!2d74.32300389389485!3f326.9703796037307!4f11.857653221056708!5f0.7820865974627469",
  "marina.html": "https://www.google.com/maps/embed?pb=!4v1749391559042!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJRDQ1ZG5OalFF!2m2!1d13.04995260460426!2d80.28240257341209!3f33.237042752239525!4f-4.764387635458107!5f0.7820865974627469" ,
  "malpe.html": "https://www.google.com/maps/embed?pb=!4v1749455640658!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJQ2t6YXJUVVE.!2m2!1d13.36128292009993!2d74.69759292589409!3f341.02779071059587!4f-16.794025623457827!5f0.7820865974627469" ,
  "kudle.html": "https://www.google.com/maps/embed?pb=!4v1749451782003!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJQ1p5OENYUkE.!2m2!1d14.52603470320796!2d74.31528192039166!3f260.7694!4f0!5f0.7820865974627469",
  "bheemu.html": "https://www.google.com/maps/embed?pb=!4v1749473946662!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJQ21vT2lFZUE.!2m2!1d17.89229538832594!2d83.45568189500584!3f217.83487461925563!4f13.918165660500847!5f0.7820865974627469" ,
  "calangute.html":"https://www.google.com/maps/embed?pb=!4v1749579475228!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJQ200N1hweHdF!2m2!1d15.55187451296034!2d73.752948202496!3f182.6855063837823!4f-1.252884276357861!5f0.7820865974627469",
  "anjuna.html": "https://www.google.com/maps/embed?pb=!4v1749582370754!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJQ2V2UF9KckFF!2m2!1d15.57334967218906!2d73.74097811145832!3f254.87455546991842!4f-11.45789213556047!5f0.7820865974627469",
  "juhu.html": "https://www.google.com/maps/embed?pb=!4v1749624394092!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJQ2s3b3piMkFF!2m2!1d19.10475082989342!2d72.82427471020469!3f258.2636150046122!4f-0.4499985642338231!5f0.7820865974627469",
  "tarkarli.html": "https://www.google.com/maps/embed?pb=!4v1749625845488!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJQ0dnN1RnZEE.!2m2!1d16.01368640904737!2d73.48983342966434!3f252.39557!4f0!5f0.7820865974627469" ,
  "kashid.html": "https://www.google.com/maps/embed?pb=!4v1749624757032!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJQzI5OW5UZWc.!2m2!1d18.44600972686603!2d72.90286775588918!3f251.60004243431115!4f0.7688969635212715!5f0.7820865974627469",
  "mandvi.html": "https://www.google.com/maps/embed?pb=!4v1749632553961!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJQ3MxYUswUmc.!2m2!1d22.82984410490491!2d69.32611971362975!3f12.630315887189958!4f-5.840707988089463!5f0.7820865974627469",
  "diu.html": "https://www.google.com/maps/embed?pb=!4v1749633310224!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJQzI4clRic1FF!2m2!1d20.70526206032132!2d70.91558039366558!3f104.37281003373941!4f14.148157682633979!5f0.7820865974627469",
  "madhavpur.html": "https://www.google.com/maps/embed?pb=!4v1749633485856!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJQ3lyY1BidFFF!2m2!1d21.25637689789145!2d69.95594759334372!3f247.54632731449527!4f-8.471488727495185!5f0.7820865974627469",
  "puri.html": "https://www.google.com/maps/embed?pb=!4v1749641157816!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJRENzS3Y2UkE.!2m2!1d19.79996038947685!2d85.84379843442947!3f179.61642293573564!4f-1.4878102848171721!5f0.7820865974627469",
  "chandra.html":  "https://www.google.com/maps/embed?pb=!4v1749641265974!6m8!1m7!1spumo7Kc1LPRvO5lKTrknHw!2m2!1d19.86670336772776!2d86.115246611896!3f123.33402808725577!4f-0.08876994677240191!5f0.7820865974627469" ,
  "gopalpur.html": "https://www.google.com/maps/embed?pb=!4v1749641425724!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJRG0zTV9BelFF!2m2!1d19.25543447216825!2d84.90761599478306!3f149.18801818498935!4f8.641103069700193!5f0.7820865974627469" ,
  "digha.html": "https://www.google.com/maps/embed?pb=!4v1749643695806!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJQ2UxOE9wV0E.!2m2!1d21.62742498212549!2d87.53680383355281!3f153.05399285468982!4f-6.5554599801137385!5f0.7820865974627469" ,
  "tajpur.html": "https://www.google.com/maps/embed?pb=!4v1749647480067!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJQzRwcE9lNWdF!2m2!1d21.64439617667864!2d87.61205306963491!3f301.55312103246257!4f8.282522315695061!5f0.7820865974627469" ,
  "mandarmani.html": "https://www.google.com/maps/embed?pb=!4v1749647629033!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJQ0UxWnFSYnc.!2m2!1d21.6489550382857!2d87.6461800374275!3f323.45585010879284!4f18.12795859100514!5f0.7820865974627469" 
};

// ✅ 2. Then add your function
window.openStreetViewFullscreen = function () {
  const streetViewContainer = document.getElementById('streetViewContainer');
  const currentPage = window.location.pathname.split("/").pop();
  const embedLink = streetViewLinks[currentPage];

  if (!embedLink) {
    alert("Street View not available for this beach.");
    return;
  }

  streetViewContainer.innerHTML = `
    <button id="closeStreetView" style="
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 10000;
      background: rgba(0,0,0,0.6);
      color: white;
      border: none;
      padding: 8px 12px;
      cursor: pointer;
      font-size: 16px;
      border-radius: 4px;
    ">❌ Close</button>
    <iframe
      width="100%"
      height="100%"
      frameborder="0"
      style="border:0"
      allowfullscreen
      src="${embedLink}">
    </iframe>
  `;

  streetViewContainer.classList.add('fullscreen');

  document.getElementById('closeStreetView').addEventListener('click', () => {
    streetViewContainer.classList.remove('fullscreen');
    streetViewContainer.innerHTML = '';
  });


   
};



