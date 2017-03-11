var quotes = [
	"I think success has no rules, but you can learn a lot from failure.(Jean Kerr)",
	"Do you love life ? Then do not squander time for that's the stuff5 life is made of .(Benjamin Franklin , American president )",
	"To choose time is to save time .( Francis Bacon , British philosopher )",
	"A man can fail many times, but he isn't a failure until he begins to blame somebody else.(J. Burroughs)",
	"An aim in life is the only fortune worth finding.(Robert Louis Stevenson)",
	"Genius only means hard-working all one's life. (Mendeleyev  Russian chemist)",
	"There is no such thing as a great talent without great will - power. (Balzac)",
	"Cease to struggle and you cease to live.（Thomas Carlyle）",
	"A strong man will struggle with the storms of fate.(Thomas Addison)",
	"Living without an aim is like sailing without a compass.（John Ruskin）"
]
function newQuote(){
	var randomNumber = Math.floor(Math.random()*(quotes.length));
	document.getElementById('quoteDisplay').innerHTML = quotes[randomNumber];
}