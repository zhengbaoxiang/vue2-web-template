/*
 * @Date: 2023-12-08 14:32:41
 * @LastEditors: zbx
 * @LastEditTime: 2023-12-08 14:32:44
 * @descript: 文件描述
 */
// 插件打包 zip
console.log("进行 zip ----");

const { zip } = require("compressing");
const { resolve } = require("path");

const fs = require("fs");
const zipPath = `./dist.zip`

zip
    .compressDir(resolve("dist/"), zipPath)
    .then(compressDone)
    .catch(handleError);

// success ~
function compressDone() {
    console.log("zip success~~");
    console.log("zip 包路径 == ", __dirname + zipPath);
}

function handleError(err) {
    console.log(err);
}
