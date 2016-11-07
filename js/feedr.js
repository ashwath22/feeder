// Create the Elements.
var search = document.querySelector(".search");
var displayDiggArticles = document.querySelector(".displayDiggArticles");
var displayGuardianArticles = document.querySelector(".displayGuardianArticles");
var displayBbcArticles = document.querySelector(".displayBbcArticles");
var displayNytArticles = document.querySelector(".displayNytArticles");
var popUpContainer = document.querySelector(".popUpContainer");
var article = document.querySelector(".article");
var popUp = document.querySelector(".popUp");
var diggLink = document.querySelector("#diggLink");
var guardianLink = document.querySelector("#guardianLink");
var bbcLink = document.querySelector("#bbcLink");
var showAll = document.querySelector("#showAll");

// for popup
var main = document.querySelector("#main");
var popUp = document.querySelector("#popUp");
var close = document.querySelector("a.closePopUp");

// setup URLs for API calls.
var diggUrl = "https://accesscontrolalloworiginall.herokuapp.com/http://digg.com/api/news/popular.json";
var guardianUrl = "http://content.guardianapis.com/search?q=technology&api-key=4aec2a05-eda5-4352-a802-522cfa655803";
var bbcUrl = "https://newsapi.org/v1/articles?source=bbc-sport&sortBy=top&apiKey=158fb7af227c4843879cbe7f7f2bb5b3";
// var nytUrl = "https://api.nytimes.com/svc/topstories/v1/home.json?api-key=cc05a6f7dfbf495b8025bb79f2f1b0c4";

var articleTemplate = document.querySelector("#article-template");

// Add Event Listeners. 
showAll.addEventListener('click', showArticles);
diggLink.addEventListener('click', getDiggArticles);
guardianLink.addEventListener('click', getGuardianArticles);
bbcLink.addEventListener('click', getBbcArticles);

// window.addEventListener('load', showArticles);
displayDiggArticles.addEventListener('click', showDiggPopup);
displayGuardianArticles.addEventListener('click', showGuardianPopup);
displayBbcArticles.addEventListener('click', showBbcPopup);
// displayNytArticles.addEventListener('click', showNytPopup);



close.addEventListener('click', closePopup);

var diggId = null;
var guardianId = null;
var bbcId = null;
var nytId = null;


// Digg Popup
function showDiggPopup(event) {
    event.preventDefault();
    target = event.target.closest("ARTICLE");
    diggId = target.id;
    console.log(diggId);
    popUp.classList.remove("loader", "hidden");
    jQuery.getJSON(diggUrl, getDiggData);
} 

function getDiggData(json) {
    // diggJson = json;
    var articles = json.data.feed;
    console.log(articles);
    articles.forEach( function(article){
        // console.log(article.content.content_id);
        if (article.content.content_id === diggId) {
            // console.log(article.content.content_id);
            var templateFn = Handlebars.compile(diggPopUpTemplate.innerHTML);
            popUpContainer.innerHTML = templateFn(article);     
        }
    });
    
}

// Guardian popup
function showGuardianPopup(event) {
    event.preventDefault();
    target = event.target.closest("ARTICLE");
    guardianId = target.id;
    popUp.classList.remove("loader", "hidden");
    jQuery.getJSON(guardianUrl, getGuardianData);
} 

function getGuardianData(json) {
    var articles = json.response.results;
    articles.forEach( function(article){
        if (article.id === guardianId) {
            console.log(article.id);
            var templateFn = Handlebars.compile(guardianPopUpTemplate.innerHTML);
            popUpContainer.innerHTML = templateFn(article); 
            console.log(article);    
        }
    });
    
}

// BBC popup
function showBbcPopup(event) {
    event.preventDefault();
    target = event.target.closest("ARTICLE");
    bbcId = target.id;
    console.log(bbcId);
    popUp.classList.remove("loader", "hidden");
    jQuery.getJSON(bbcUrl, getBbcData);
} 

function getBbcData(json) {
    var articles = json.articles;
    console.log(articles);
    articles.forEach( function(article){
        if (article.publishedAt === bbcId) {
            console.log(article.publishedAt);
            var templateFn = Handlebars.compile(bbcPopUpTemplate.innerHTML);
            popUpContainer.innerHTML = templateFn(article);   
        }
    });
    
}


// //NYT popup
// function showNytPopup(event) {
//     event.preventDefault();
//     target = event.target.closest("ARTICLE");
//     bbcId = target.id;
//     console.log(nytId);
//     popUp.classList.remove("loader", "hidden");
//     jQuery.getJSON(nytUrl, getNytData);
// } 

// function getNytData(json) {
//     // var articles = json.articles;
//     console.log(json);
//     articles.forEach( function(article){
//         if (article.publishedAt === bbcId) {
//             console.log(article.publishedAt);
//             var templateFn = Handlebars.compile(bbcPopUpTemplate.innerHTML);
//             popUpContainer.innerHTML = templateFn(article);   
//         }
//     });
    
// }



function closePopup(event) {
    event.preventDefault();
    popUp.classList.add("loader", "hidden");
}

// Add Event Handler functions.
function showArticles (event) {
    event.preventDefault();
    // JSONify!!
    displayGuardianArticles.innerHTML = '';
    displayBbcArticles.innerHTML = '';
    displayDiggArticles.innerHTML = '';
    console.log("Showing all");
    jQuery.getJSON(diggUrl, appendDiggArticles);
    jQuery.getJSON(guardianUrl, appendGuardianArticles);
    jQuery.getJSON(bbcUrl, appendBbcArticles);
    // jQuery.getJSON(nytUrl, appendNytArticles);
}

function getDiggArticles(event) {
    console.log("Digg");
    event.preventDefault();
    displayGuardianArticles.innerHTML = '';
    displayBbcArticles.innerHTML = '';
    // JSONify!!
    jQuery.getJSON(diggUrl, appendDiggArticles);
}

// update the articles on the page.
function appendDiggArticles(json) {
    var articles = json.data;
    // console.log("DIGG: ", json.data);
    articles.newsSource = "DIGG";
    var templateFn = Handlebars.compile(DiggArticleList.innerHTML);
    displayDiggArticles.innerHTML = templateFn(articles);
}

function getGuardianArticles(event) {
    console.log("Digg");
    event.preventDefault();
    displayDiggArticles.innerHTML = '';
    displayBbcArticles.innerHTML = '';
    // JSONify!!
    jQuery.getJSON(guardianUrl, appendGuardianArticles);
}

function appendGuardianArticles(json) {
    json.newsSource = "The Guardian";
    // console.log("Guardian: ", json);
    var templateFn = Handlebars.compile(GuardianArticleList.innerHTML);
    displayGuardianArticles.innerHTML = templateFn(json);
}


function getBbcArticles(event) {
    console.log("Digg");
    event.preventDefault();
    displayDiggArticles.innerHTML = '';
    displayGuardianArticles.innerHTML = '';
    // JSONify!!
    jQuery.getJSON(bbcUrl, appendBbcArticles);
}

function appendBbcArticles(json) {
    json.newsSource = "BBC sport";
     // console.log("BBC sport: ", json);
    var templateFn = Handlebars.compile(BbcArticleList.innerHTML);
    displayBbcArticles.innerHTML = templateFn(json);   
}

// function appendNytArticles(json) {
//     json.newsSource = "The NYT";
//     // console.log("NYT: ", json.results);
//     var templateFn = Handlebars.compile(NytArticleList.innerHTML);
//     displayNytArticles.innerHTML = templateFn(json);
// }