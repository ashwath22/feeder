// Create the Elements.
var search = document.querySelector(".search");
var displayDiggArticles = document.querySelector(".displayDiggArticles");
var displayGuardianArticles = document.querySelector(".displayGuardianArticles");
var displayBbcArticles = document.querySelector(".displayBbcArticles");
var article = document.querySelector(".article");
var popUp = document.querySelector(".popUp");

// setup URLs for API calls.
var diggUrl = "https://accesscontrolalloworiginall.herokuapp.com/http://digg.com/api/news/popular.json";
var guardianUrl = "http://content.guardianapis.com/search?q=technology&api-key=4aec2a05-eda5-4352-a802-522cfa655803";
var bbcUrl = "https://newsapi.org/v1/articles?source=bbc-sport&sortBy=top&apiKey=158fb7af227c4843879cbe7f7f2bb5b3";
           
var articleTemplate = document.querySelector("#article-template");

// Add Event Listeners. 
window.addEventListener('load', showArticles);
displayDiggArticles.addEventListener('click', showPopup);
var diggJson = null;
var diggId = null;

// Popup
function showPopup(event) {
    event.preventDefault();
    target = event.target.closest("ARTICLE");
    id = target.id;
    jQuery.getJSON(diggUrl, getData);
    
    console.log('Digg json: ', diggJson);
} 

function getData(json) {
    console.log('json: ', json);
    diggJson = json;
}

// Add Event Handler functions.
function showArticles (event) {
    event.preventDefault();
    // JSONify!!
    jQuery.getJSON(diggUrl, appendDiggArticles);
    jQuery.getJSON(guardianUrl, appendGuardianArticles);
    jQuery.getJSON(bbcUrl, appendBbcArticles);
}

// update the articles on the page.
function appendDiggArticles(json) {
    var articles = json.data;
    // console.log("DIGG: ", json.data);
    articles.newsSource = "DIGG";
    var templateFn = Handlebars.compile(DiggArticleList.innerHTML);
    displayDiggArticles.innerHTML = templateFn(articles);
}

function appendGuardianArticles(json) {
    json.newsSource = "The Guardian";
    // console.log("Guardian: ", json);
    var templateFn = Handlebars.compile(GuardianArticleList.innerHTML);
    displayGuardianArticles.innerHTML = templateFn(json);
}

function appendBbcArticles(json) {
    json.newsSource = "BBC sport";
     // console.log("BBC sport: ", json);
    var templateFn = Handlebars.compile(BbcArticleList.innerHTML);
    displayBbcArticles.innerHTML = templateFn(json);   
}
