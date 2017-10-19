let comments = [
	{
		'username' : 'Chris',
		'content' : 'first'
	},
	{
		'username' : 'Andy',
		'content' : 'second'
	},
	{
		'username' : 'David',
		'content' : 'third'
	}
];

let html = '';
$.each(comments, function(commentIndex, comment){
	html += '<div class="comment"><h6>'
			+ comment['username']
			+ ':</h6><p class="para">'
			+ comment['content']
			+ '<p></p>'
			+ '</div>';
});

$('#resText').html(html);