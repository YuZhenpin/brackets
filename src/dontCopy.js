document.addEventListener('cut', function(e){
	e.preventDefault();
	console.log('Ctrl + X, cutting');
}, false);
document.addEventListener('copy', function(e){
	e.preventDefault();
	console.log('Ctrl + C, copying');
}, false);
