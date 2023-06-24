const API_KEY = "8a0f583c7ee04ce494208f279f4297d7";
// JSON = Javascript Object Notation
const url = "https://newsapi.org/v2/everything?q=";
window.addEventListener('load',() => fetchNews("India"));
function reload(){
    window.location.reload();
}
async function fetchNews(query){
    // Fetch Library use to fetch api  and ${it works like concatination}
   const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
   const data = await res.json();
//    Because data ke andar jo articles jo hote hai usme data ata hai
   bindData(data.articles);
    
}

function bindData(articles){
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');
    // we have make it empty because every time the page is reload more data will come and without deleteing all data will combine 
    cardsContainer.innerHTML = '';

    articles.forEach((article) => {
        // if image link has not given then it will not return image
        if(!article.urlToImage) return;
        // cloneNode means we suppose to do deep cloning means all div should have to clone
        const cardClone =newsCardTemplate.content.cloneNode(true); 
        fillDataCard(cardClone,article)
        cardsContainer.appendChild(cardClone);
        
    });
}

//  For Data Binding
function fillDataCard(cardClone,article){
    const newsImg =cardClone.querySelector('#news-img');
    const newsTitle =cardClone.querySelector('#news-title');
    const newsSource =cardClone.querySelector('#news-source');
    const newsDesc=cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;
    const date = new Date(article.publishedAt).toLocaleString("en-us",{
        timeZone:"Asia/Jakarta"
    });
    newsSource.innerHTML = `${article.source.name} •${date}`;
    cardClone.firstElementChild.addEventListener("click",() =>{
        window.open(article.url,"_blank"); 
    })
    

}

// parameter is id as well as SearchQuery
let curSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem =document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav?.classList.add('active');

}

const searchButton = document.getElementById('search-button')
const searchText = document.getElementById('search-text');

searchButton.addEventListener("click",() =>{
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = null;
});