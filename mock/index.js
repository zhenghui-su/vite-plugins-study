const mockjs = require('mockjs');

const userList = mockjs.mock({
	'data|100': [
		{
			// 表示生成100条数据
			// name: '@cname', // 表示随机生成中文名字
			ename: '@name()', // 生成不同的英文名字 目前有个bug 英文和中文一块，英文也会生成中文
			'id|+1': 1, // 表示id自增
			avatar: mockjs.Random.image(), // 表示随机生成图片
		},
	],
});
// console.log('userList', userList);
module.exports = [
	{
		method: 'post',
		url: '/api/users',
		response: ({ body }) => {
			// body 请求体
			// 比如我们有个分页 page pageSize 一般会放body
			return {
				code: 200,
				data: userList,
				msg: 'success',
			};
		},
	},
];
