const quoteCOntainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const author = document.getElementById('author');
const newQuoteButton = document.getElementById('new-quote');
const twitterButton = document.getElementById('twitter');
const loader = document.getElementById('loader');

let quotes = []

// Loader
function loading() {
    quoteCOntainer.style.display = 'none';
    loader.hidden = false;
}

function complete() {
    quoteCOntainer.style.display = 'block';
    loader.hidden = true;
}

function getNewQuote() {
    loading()
    const quote = quotes[Math.floor(Math.random() * quotes.length)]
    // Handle unknown author
    if (!quote.author){
        author.textContent = 'unknown author'
    } else {
        author.textContent = quote.author
    }
    // Handle long quote
    if (quote.text.length > 100){
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text
    complete();
}

//Get Quotes from API
async function getQuotes(){
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json'
    try{
        const response = await fetch(apiUrl)
        quotes = await response.json()
        getNewQuote(quotes)
    } catch(error) {
        //Catch error here
    }
}

//Tweet quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${author.textContent}`
    window.open(twitterUrl, '_blank')
}

//Event Listeners
newQuoteButton.addEventListener('click', getNewQuote)
twitterButton.addEventListener('click', tweetQuote)

getQuotes()