const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

//get quotes from api
let apiQuotes = [];
//showLoading

const loading = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

const complete = () => {
  loader.hidden = true;
  quoteContainer.hidden = false;
};

const showNewQuotes = () => {
  loading();
  //pick a random apiQuotes
  const quotes = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  //Check if authorField is blank and replace with unknown field
  if (!quoteAuthor) {
    quoteAuthor.textContent = "Unknown";
  } else {
    quoteAuthor.textContent = quotes.author;
  }
  //check quote length for stylimg

  if (quoteText.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  //set quote hide loader
  quoteText.textContent = quotes.text;
  complete();
};

const getQuotes = async () => {
  loading();
  const apiUrl = `https://type.fit/api/quotes`;
  try {
    const res = await fetch(apiUrl);
    apiQuotes = await res.json();
    console.log(apiQuotes);
    showNewQuotes();
  } catch (err) {
    console.log(err);
  }
};

//Tweet Quotes
const tweetQuote = () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
  window.open(twitterUrl, "_blank");
};

//EventListeners
newQuoteBtn.addEventListener("click", showNewQuotes);
twitterBtn.addEventListener("click", tweetQuote);

//onLoad

getQuotes();
