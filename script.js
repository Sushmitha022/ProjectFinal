document.addEventListener("DOMContentLoaded", () => {
    console.log("Website Loaded");

    // Animate image when it scrolls into view
    const image = document.querySelector('.about-image');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.5
    });

    if (image) {
        observer.observe(image);
    }

    // 🌤️ Live Weather for Kovalam, Kerala
    const apiKey = "e123a51ccd567fbe0f0577bfd53b386f";
    const city = "Kovalam,IN";

    fetch("https://api.openweathermap.org/data/2.5/weather?q=Kovalam,IN&appid=YOUR_API_KEY&units=metric")
        .then(response => response.json())
        .then(data => {
            const temp = data.main.temp;
            const desc = data.weather[0].description;
            const weatherElement = document.getElementById("live-weather");
            if (weatherElement) {
                weatherElement.innerHTML = `🌤️ ${temp}°C, ${desc}`;
            }
        })
        .catch(error => {
            console.error("Error fetching weather:", error);
            const weatherElement = document.getElementById("live-weather");
            if (weatherElement) {
                weatherElement.innerHTML = "Weather info not available";
            }
        });

    // 🔍 Handle Search and Redirect
    window.handleSearch = function () {
    const input = document.getElementById("search-input").value.toLowerCase().trim();

    const redirects = {
        "kovalam": "states/kovalam.html",
        "kerala": "states/kerala.html",
        "varkala": "states/varkala.html",
        "alleppey": "states/alleppey.html",
        "tamil nadu": "states/tamil.html",
        "marina": "states/marina.html",
        "rameswaram": "states/rameswaram.html",
        "pondicherry": "states/pondicherry.html",
        "karnataka": "states/karnataka.html",
        "om": "states/om.html",
        "kudle": "states/kudle.html.",
        "malpe": "states/malpe.html",
        "andhra pradesh": "states/ap.html",
        "rushikonda": "states/rushikonda.html",
        "rama krishna": "states/rkbeach.html",
        "bheemunipatnam": "states/bheemu.html",
        "goa": "states/goa.html",
        "palolem": "states/palolem.html",
        "calangute": "states/calangute.html",
        "anjuna":"states/anjuna.html",
        "maharashtra": "states/maharashtra.html",
        "juhu": "states/juhu.html",
        "tarkarli": "states/tarkarli.html",
        "kashid": "states/kashid.html",
        "gujarat": "states/gujarat.html",
        "mandvi": "states/mandvi.html",
        "madhavpur": "states/madhavpur.html",
        "diu": "states/diu.html",
        "west bengal": "states/westbengal.html",
        "digha": "states/digha.html",
        "mandarmani": "states/mandarmani.html",
        "tajpur": "states/tajpur.html",
        "odisha": "states/odisha.html",
        "puri": "states/puri.html",
        "chandrabhaga": "states/chandra.html",
        "gopalpur": "states/gopalpur.html"

        
    };

    for (const keyword in redirects) {
        if (input === keyword || input.includes(keyword)) {
            window.location.href = redirects[keyword];
            return;
        }
    }

    alert("No match found. Please try another beach or state.");
};



});

window.openStreetViewFullscreen = function () {
  const streetViewContainer = document.getElementById('streetViewContainer');

  streetViewContainer.innerHTML = `
    <iframe
      width="100%"
      height="100%"
      frameborder="0"
      style="border:0"
      allowfullscreen
      src="https://www.google.com/maps/embed?pb=!4v1748880285197!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJQzRpNm1NMEFF!2m2!1d8.733313493646282!2d76.70496314351942!3f193.13932993894622!4f-2.3595838696455758!5f0.7820865974627469">
    </iframe>
  `;

  streetViewContainer.classList.add('fullscreen');

  streetViewContainer.addEventListener('click', () => {
    streetViewContainer.classList.remove('fullscreen');
    streetViewContainer.innerHTML = '';
  }, { once: true });
};



