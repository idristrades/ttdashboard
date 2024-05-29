// Update input field chart symbol
function changeSymbol() {
  var newSymbol = document.getElementById("ticker").value.toUpperCase();
  if (newSymbol.length <= 6) {
    var chartFrames = document.querySelectorAll("#tradingview");
    for (var i = 0; i < chartFrames.length; i++) {
      var iframe = chartFrames[i];
      var iframeSrc = iframe.src;
      iframeSrc = iframeSrc.replace(/symbol=([A-Z]+)/, "symbol=" + newSymbol);
      iframe.src = iframeSrc;
    }
  } else {
    alert("Ticker symbol invalid.");
  }
}

// Focus on the input field all the time
document.addEventListener('keydown', (event) => {
  if (document.activeElement !== document.getElementById("ticker")) {
    document.getElementById("ticker").focus();
  }
});

// Check if screen width is greater than 768px
if (window.screen.width > 768) {
  document.addEventListener('keydown', (event) => {
    if (document.activeElement !== document.getElementById("ticker")) {
      document.getElementById("ticker").focus();
    }
  });
}

// Clear the input field, results, charts, and financials with Escape
function handleEscape(event) {
  if (event.key === "Escape") {
    // Clear input field
    document.getElementById("ticker").value = "";

    // Clear results
    document.getElementById("results").innerHTML = "<h6>▣｜SHORTCUTS</h6><p>Enter a ticker symbol to display the links here</p>";

    // Clear financials
    const finDiv = document.getElementById('fin');
    finDiv.innerHTML = '';

    // Clear charts (if tradingview iframe exists)
    const tradingViewIframe = document.getElementById("tradingview");
    if (tradingViewIframe) {
      tradingViewIframe.src = tradingViewIframe.src.replace(/symbol=[^&]+/, "symbol=SPY");
    }

    // Re-render financials widget (optional)
    const widgetSettings = {
      "height": "100%",
      "colorTheme": "dark",
      "isTransparent": true,
      "symbol": "SPY",
    };

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-financials.js';
    script.async = true;
    script.innerHTML = JSON.stringify(widgetSettings);

    finDiv.appendChild(script);
  }
}

document.addEventListener("keydown", handleEscape);
// all the above is for ESCAPE
	
// Uppercase everything in the input field
const inputField = document.getElementById("ticker");
inputField.addEventListener("input", function() {
  this.value = this.value.toUpperCase();
});  
  
// Update offering URLs
const form = document.getElementById("ticker-form");
const results = document.getElementById("results");

form.addEventListener("submit", function(event) {
 inputField.value = inputField.value.trim();
 event.preventDefault();

const ticker = document.getElementById("ticker").value.toUpperCase();

// Validate ticker length (optional)
if (ticker.length < 1 || ticker.length > 6) {
 alert("Error: Please enter a valid ticker symbol.");
 return;
}

// Define URLs with placeholders for ticker symbol
const xcomUrl = "https://x.com/search?q=%24";
const newsUrl = "https://www.stocktitan.net/news/";
const form4Url = "http://openinsider.com/screener?s=";
const finUrl = "https://stockanalysis.com/stocks/";
const brwUrl = "https://chartexchange.com/symbol/";
const shortintUrl = "https://fintel.io/ss/us/";
const institUrl = "https://fintel.io/so/us/";
const filingsUrl = "https://www.sec.gov/edgar/search/?r=el#/dateRange=30d&entityName=";
const offeringUrl = "https://www.sec.gov/edgar/search/?r=el#/dateRange=custom&category=custom&entityName=";

// Go back 3 years
const today = new Date();
today.setFullYear(today.getFullYear() - 3);

// Build the modified URLs
const modifiedXcomUrl = xcomUrl + ticker + "&src=recent_search_click&f=live";
const modifiedNewsUrl = newsUrl + ticker;
const modifiedForm4Url = form4Url + ticker + "&o=&pl=&ph=&ll=&lh=&fd=365&fdr=&td=0&tdr=&fdlyl=&fdlyh=&daysago=&xp=1&vl=&vh=&ocl=&och=&sic1=-1&sicl=100&sich=9999&grp=0&nfl=&nfh=&nil=&nih=&nol=&noh=&v2l=&v2h=&oc2l=&oc2h=&sortcol=0&cnt=100&page=1";
const modifiedFinUrl = finUrl + ticker + "/financials/ratios/?p=quarterly";
const modifiedBorrowUrl = brwUrl + ticker + "/borrow-fee/";
const modifiedFilingsUrl = filingsUrl + ticker;
const modifiedShortintUrl = shortintUrl + ticker;
const modifiedInstitUrl = institUrl + ticker;
const modifiedOfferingUrl = offeringUrl + ticker + "&startdt=" + today.toISOString().split('T')[0] + 
"&enddt=2050-12-31&forms=S-1%252CF-1%252CS-3%252CF-3%252CRW%252CEFFECT%252C424B3%252C424B4%252C424B5%252CS-11%252CRW%2520WD";

// Display the results
results.innerHTML = `
  <h6>▣｜SHORTCUTS</h6>
<ul>
  <li><a href="${modifiedFilingsUrl}" target="_blank">☰｜ LATEST SEC FILINGS</a>
  <li><a href="${modifiedOfferingUrl}" target="_blank">☰｜ RECENT OFFERINGS</a></li>
  </li><li><a href="${modifiedXcomUrl}" target="_blank">☰｜ RECENT TWEETS</a></li>
  <li><a href="${modifiedNewsUrl}" target="_blank">☰｜ LATEST NEWS</a></li>
  <li><a href="${modifiedForm4Url}" target="_blank">☰｜ INSIDER BUYS</a></li>
  <li><a href="${modifiedInstitUrl}" target="_blank">☰｜ F.13G-13D-13F</a></li>
  <li><a href="${modifiedShortintUrl}" target="_blank">☰｜ FLOAT SHORT</a></li>
  <li><a href="${modifiedBorrowUrl}" target="_blank">☰｜ BORROW FEE</a></li>
  <li><a href="${modifiedFinUrl}" target="_blank">☰｜ FINANCIALS</a></li>
</ul>
`;
});

  // CLEAR =>
  const clearBtn = document.getElementById("clear-btn");
clearBtn.addEventListener("click", function() {

  // Clear the charts
  const iframes = document.querySelectorAll("iframe");
  for (let iframe of iframes) {
    if (iframe.id === "tradingview") {
      iframe.src = iframe.src.replace(/symbol=[^&]+/, "symbol=SPY");
    }
   }

  // Clear the results
  const results = document.getElementById("results");
  results.innerHTML = "<h6>▣｜SHORTCUTS</h6><p>Enter a ticker symbol to display the links here</p>";
  
  // Refocus the input field
  const inputField = document.getElementById("ticker");
  inputField.focus();

  // Clear financials
  const finDiv = document.getElementById('fin');
  finDiv.innerHTML = '';

  const widgetSettings = {
    "height": "100%",
    "colorTheme": "dark",
    "isTransparent": true,
    "symbol": "SPY",
  };

  const script = document.createElement('script');
  script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-financials.js';
  script.async = true;
  script.innerHTML = JSON.stringify(widgetSettings);

  finDiv.appendChild(script);
});

// Financials
    document.getElementById('ticker-form').onsubmit = function(event) {
      event.preventDefault();
      const newSymbol = document.getElementById('ticker').value || "SPY";
      const finDiv = document.getElementById('fin');
  
      finDiv.innerHTML = '';
  
      const widgetSettings = {
        "height": "100%",
        "colorTheme": "dark",
        "isTransparent": true,
        "displayMode": "regular",
        "symbol": newSymbol,
      };
  
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-financials.js';
      script.async = true;
      script.innerHTML = JSON.stringify(widgetSettings);
  
      finDiv.appendChild(script);
    };

// Navigation menu on mobile
const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('section');

navLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const clickedSectionId = link.href.split('#')[1];
    const clickedSection = document.getElementById(clickedSectionId);

    // Show only the clicked section and hide the rest
    sections.forEach(section => {
      section.classList.toggle('hidden', section !== clickedSection);
    });
  });
});


// SECTION 4 handling
const navItems = document.querySelectorAll("nav a");
const section4 = document.getElementById("section4");

function handleResize() {
  const isDesktop = window.innerWidth >= 768;
  if (isDesktop) {
    section4.style.display = "none"; // Hide on desktop resize
  } else {
    // Check if section4 was previously shown by sec-4 click
    if (section4.classList.contains("on-mobile")) {
      section4.style.display = "block"; // Keep visible on mobile resize
    } else {
      section4.style.display = "none"; // Hide on mobile resize if not shown by sec-4
    }
  }
}

// Add event listener for window resize
window.addEventListener("resize", handleResize);

navItems.forEach(navItem => {
  navItem.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default anchor tag behavior

    section4.classList.remove("on-mobile"); // Reset class for mobile resize handling
    section4.style.display = "none"; // Reset section4 display to none for all clicks

    // Check if clicked item is sec-4
    if (navItem.id === "sec-4") {
      section4.style.display = "block"; // Show section4 only for sec-4 click
      section4.classList.add("on-mobile"); // Add class for mobile resize handling
    }
  });
});

// Call handleResize function initially
handleResize();
