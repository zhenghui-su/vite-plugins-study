import './src/test';

fetch('/api/users', {
	method: 'post',
})
	.then((data) => {
		console.log('data', data);
	})
	.catch((error) => {
		console.log('error', error);
	});
