const fs = require('fs');
const path = require('path');

module.exports = (options) => {
	// 该插件最主要的工作就是拦截http请求
	// 当我们使用fetch或axios去请求的时候，一般有个域名
	// axios 有个 baseUrl 用来写地址
	// 当打给本地的开发服务器的时候， viteServer 服务器接管
	return {
		configureServer(server) {
			// server 服务器的相关配置
			// middlewares 中间件 这里了解即可, 比较难以理解
			// 一个请求来临了-> 把上下文交给n个中间件来处理 -> 把处理结果返回给用户

			const mockStat = fs.statSync('mock');
			console.log('mockStat', mockStat);
			const isDirectory = mockStat.isDirectory();
			let mockResult = [];
			if (isDirectory) {
				// 获取当前的执行根目录 process.cwd()
				mockResult = require(path.resolve(process.cwd(), 'mock/index.js'));
				console.log('mockResult', mockResult);
			}

			server.middlewares.use((req, res, next) => {
				// req 请求对象 -> 用户发过来的请求, 有请求头请求体如url cookie
				// res 响应对象 -> 服务器返回给用户的数据 可以写东西 比如 res.header
				// next 是否交给下一个中间件, 调用next方法会将处理结果交给下一个中间件
				console.log('req--', req);
				console.log('res--', res);
				// 看我们请求的地址在mockResult里面有没有
				const matchItem = mockResult.find(
					(mockDescriptor) => mockDescriptor.url === req.url
				);
				console.log('matchItem', matchItem);

				if (matchItem) {
					console.log('进来了');
					const responseData = matchItem.response(req);
					console.log('responseData', responseData); // 这就是那一大串的数据
					// 强制设置请求头格式为json 用以兼容中文
					res.setHeader('Content-Type', 'application/json');
					res.end(JSON.stringify(responseData)); // 会自动设置请求头 它是异步的
				} else {
					next(); // 如果不调用next 你又不响应就会一直转, 因为没返回
				}
			});
		},
	};
};
