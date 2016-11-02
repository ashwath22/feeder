var search = document.querySelector("search");
var container = document.querySelector("container");
var article = document.querySelector("article");
var popUp = document.querySelector("popUp");

// Add Event Listeners. 
window.addEventListener("load", showArticles);

// Add Event Handler functions.

function showArticles (event) {
    event.preventDefault();
    var url = "https://accesscontrolalloworiginall.herokuapp.com/http://digg.com/api/news/popular.json";
    jQuery.getJSON(url, appendArticles);
}

function appendArticles(json) {
	// console.log(json.data.feed[0].content.title);
	// console.log(json.data.feed[0].content.description);
	console.log(json.data.feed[0].content.media.images[0].original_url);

}