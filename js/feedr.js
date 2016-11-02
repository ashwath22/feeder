// Create the Elements.
var search = document.querySelector(".search");
var displayDiggArticles = document.querySelector(".displayDiggArticles");
var displayArticles2 = document.querySelector(".displayArticles2");
var displayArticles3 = document.querySelector(".displayArticles3");
var article = document.querySelector(".article");
var popUp = document.querySelector(".popUp");

var articleTemplate = document.querySelector("#article-template");

// Add Event Listeners. 
window.addEventListener('load', showArticles)

// Add Event Handler functions.
function showArticles (event) {
    event.preventDefault();
    // displayArticles.innerHTML = '';
    var url1 = "https://accesscontrolalloworiginall.herokuapp.com/http://digg.com/api/news/popular.json";
    jQuery.getJSON(url1, appendArticles1);

    var url2 = "http://content.guardianapis.com/search?q=technology&api-key=4aec2a05-eda5-4352-a802-522cfa655803";
    jQuery.getJSON(url2, appendArticles2);

    var url3 = "https://newsapi.org/v1/articles?source=bbc-sport&sortBy=top&apiKey=158fb7af227c4843879cbe7f7f2bb5b3";
    jQuery.getJSON(url3, appendArticles3);
}

// update the articles on the page.
function appendArticles1(json) {
    var articles = json.data;
    console.log("DIGG: ", json.data);
    articles.newsSource = "DIGG";
    var templateFn = Handlebars.compile(DiggArticleList.innerHTML);
    displayDiggArticles.innerHTML = templateFn(articles);
}

function appendArticles2(json) {
    json.newsSource = "The Guardian";
    console.log("Guardian: ", json);
    var templateFn = Handlebars.compile(articleList2.innerHTML);
    displayArticles2.innerHTML = templateFn(json);
}

function appendArticles3(json) {
    json.newsSource = "BBC sport";
     console.log("BBC sport: ", json);
    var templateFn = Handlebars.compile(articleList3.innerHTML);
    displayArticles3.innerHTML = templateFn(json);   
}
