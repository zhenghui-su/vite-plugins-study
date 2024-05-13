module.exports = (options) => {
	return {
		// 转换 html
		transformIndexHtml: {
			enforce: 'pre',
			transform: (html, ctx) => {
				// ctx 表示当前整个请求的一个执行期上下文, 和之前的开发服务器类似
				console.log('html', html);

				return html.replace(/<%= title %>/g, options.inject.data.title);
			},
		},
	};
};
