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

// Clear the input field, results, and financials with Escape
  function handleKeyPress(event) {
    if (event.key === "Escape") {
      document.getElementById("ticker").value = "";
      document.getElementById("results");
      results.innerHTML = "<h6>▣｜Sᴛᴏᴄᴋ ᴅᴀᴛᴀ</h6><p>Enter a ticker symbol to display its data here</p>";
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
    }
  }
  
  document.addEventListener("keydown", function(event) {
  // Check if Escape key is pressed
  if (event.key === "Escape") {
    const tradingViewIframe = document.getElementById("tradingview");
    if (tradingViewIframe) {
      // Clear the chart
      tradingViewIframe.src = tradingViewIframe.src.replace(/symbol=[^&]+/, "symbol=SPY");
    }
  }
});
	
// Uppercase everything in the input field
const inputField = document.getElementById("ticker");
inputField.addEventListener("input", function() {
  this.value = this.value.toUpperCase();
});  
  
// Update offering URLs
const form = document.getElementById("ticker-form");
const results = document.getElementById("results");

form.addEventListener("submit", function(event) {
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
const finvizUrl = "https://finviz.com/quote.ashx?t=";
const finUrl = "https://stockanalysis.com/stocks/";
const brwUrl = "https://chartexchange.com/symbol/";
const shortintUrl = "https://fintel.io/ss/us/";
const filingsUrl = "https://www.sec.gov/edgar/search/?r=el#/dateRange=30d&entityName=";
const offeringUrl = "https://www.sec.gov/edgar/search/?r=el#/dateRange=custom&category=custom&entityName=";

// Go back 3 years
const today = new Date();
today.setFullYear(today.getFullYear() - 3);

// Build the modified URLs
const modifiedXcomUrl = xcomUrl + ticker + "&src=recent_search_click&f=live";
const modifiedNewsUrl = newsUrl + ticker;
const modifiedForm4Url = form4Url + ticker + "&o=&pl=&ph=&ll=&lh=&fd=365&fdr=&td=0&tdr=&fdlyl=&fdlyh=&daysago=&xp=1&vl=&vh=&ocl=&och=&sic1=-1&sicl=100&sich=9999&grp=0&nfl=&nfh=&nil=&nih=&nol=&noh=&v2l=&v2h=&oc2l=&oc2h=&sortcol=0&cnt=100&page=1";
const modifiedFinvizUrl = finvizUrl + ticker;
const modifiedFinUrl = finUrl + ticker + "/financials/ratios/?p=quarterly";
const modifiedBorrowUrl = brwUrl + ticker + "/borrow-fee/";
const modifiedFilingsUrl = filingsUrl + ticker;
const modifiedShortintUrl = shortintUrl + ticker;
const modifiedOfferingUrl = offeringUrl + ticker + "&startdt=" + today.toISOString().split('T')[0] + 
"&enddt=2050-12-31&forms=S-1%252CF-1%252CS-3%252CF-3%252CRW%252CEFFECT%252C424B3%252C424B4%252C424B5%252CS-11%252CRW%2520WD";

// Display the results
results.innerHTML = `
  <h6>▣｜STOCK DATA</h6>
<ul>
  <li><a href="${modifiedFilingsUrl}" target="_blank">☰｜ LATEST SEC FILINGS</a>
  <li><a href="${modifiedOfferingUrl}" target="_blank">☰｜ RECENT OFFERINGS</a></li>
  </li><li><a href="${modifiedXcomUrl}" target="_blank">☰｜ RECENT TWEETS</a></li>
  <li><a href="${modifiedNewsUrl}" target="_blank">☰｜ LATEST NEWS</a></li>
  <li><a href="${modifiedForm4Url}" target="_blank">☰｜ INSIDER BUYS</a></li>
  <li><a href="${modifiedShortintUrl}" target="_blank">☰｜ FLOAT SHORT</a></li>
  <li><a href="${modifiedBorrowUrl}" target="_blank">☰｜ BORROW FEE</a></li>
  <li><a href="${modifiedFinUrl}" target="_blank">☰｜ FINANCIALS</a></li>
  <li><a href="${modifiedFinvizUrl}" target="_blank">☰｜ FINVIZ</a></li>
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
  results.innerHTML = "<h6>▣｜Sᴛᴏᴄᴋ ᴅᴀᴛᴀ</h6><p>Enter a ticker symbol to display its data here</p>";
  
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
