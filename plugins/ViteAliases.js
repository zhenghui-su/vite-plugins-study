// vite的插件必须返回给vite一个配置对象
const fs = require('fs');
const path = require('path');

function getTotalSrcDir(keyName) {
	const result = fs.readdirSync(path.resolve(__dirname, '../src'));
	const diffResult = diffDirAndFile(result, '../src');
	console.log(diffResult);

	const resolveAliasesObj = {}; // 放的就是一个一个的别名配置 @assets: xxx

	diffResult.dirs.forEach((dirName) => {
		const key = `${keyName}${dirName}`;
		const absPath = path.resolve(__dirname, '../src/' + dirName);
		console.log('key--', key, 'absPath--', absPath);
		resolveAliasesObj[key] = absPath;
	});

	return resolveAliasesObj;
}
function diffDirAndFile(dirFilesArr = [], basePath = '') {
	const result = {
		dirs: [],
		files: [],
	};

	dirFilesArr.forEach((name) => {
		// 用同步写容易理解
		const currentFileStat = fs.statSync(
			path.resolve(__dirname, basePath + '/' + name)
		);
		console.log('currentFileStat', name, currentFileStat.isDirectory());
		const isDirectory = currentFileStat.isDirectory();
		if (isDirectory) {
			result.dirs.push(name);
		} else {
			result.files.push(name);
		}
	});
	return result;
}
module.exports = ({ keyName = '@' }) => {
	return {
		// config函数可以返回一个对象，这个对象是部分的vite config配置
		config(config, env) {
			console.log('参数', config, env);
			// config参数: 目前的一个配置对象
			// env: mode: string, command: string
			// mode: 就是当前环境比如开发还是打包

			// 先读目录
			const resovleAliasesObj = getTotalSrcDir(keyName);
			console.log('resolve', resovleAliasesObj);
			return {
				// 这里我们要返回一个resolve出去, 将src目录下的所有文件夹进行别名控制
				resolve: {
					alias: resovleAliasesObj,
				},
			};
		},
	};
};
