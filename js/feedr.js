// Create the Elements.
var search = document.querySelector(".search");
var displayArticles = document.querySelector(".displayArticles");
var article = document.querySelector(".article");
var popUp = document.querySelector(".popUp");

var articleTemplate = document.querySelector("#article-template");

// Add Event Listeners. 
window.addEventListener('load', showArticles)
//search.addEventListener('click', showArticles);

// Add Event Handler functions.

function showArticles (event) {
    event.preventDefault();
    //var search = search.value;
    //console.log(search);

    var url = "https://accesscontrolalloworiginall.herokuapp.com/http://digg.com/api/news/popular.json";
    jQuery.getJSON(url,appendArticles);
    //$.getJSON(url,updateArticles);

}

// update the articles on the page.

function appendArticles(json) {

    displayArticles.innerHTML = '';
    var articles = json.data;
    var templateFn = Handlebars.compile(articleList.innerHTML);
    displayArticles.innerHTML = templateFn(articles);
    //get title of an article 
    // console.log(articles.feed[3].content.title_alt);
    // console.log(articles);
    
    //get image of an article 
    // console.log(articles.feed[0].content.media.images[0].url);

    // display array of tags 
    // console.log(articles.feed[0].content.tags[1].display);
}

// function updateMovieDetails(json) {
//     var movies = json.Search;
//     details.innerHTML = '';
//     var templateFn = Handlebars.compile(articleList.innerHTML);
//     details.innerHTML = templateFn(json);
// }