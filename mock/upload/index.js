const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

module.exports = async function(ctx, next) {
  try {
    // 创建上传文件夹
    mkdir(path.join(__dirname, '../../uploads/'));

    const file = ctx.request.files.file; // 上传的文件在ctx.request.files.file

    // 创建可读流
    const reader = fs.createReadStream(file.path);

    // 获取文件MD5
    const md5 = await readFileMd5(file.path);

    // 创建可写流
    const fileName = md5 + '.' + file.name.split('.')[1];
    const filePath = path.join(__dirname, '../../uploads/', fileName);
    const stream = fs.createWriteStream(filePath);
    reader.pipe(stream);

    // 接口返回文件信息
    ctx.body = {
      code: '0',
      desc: '上传文件成功',
      data: {
        name: file.name,
        url: `/${fileName}`
      }
    };
  } catch (error) {
    console.error(error);
    // 发生错误
    ctx.body = {
      code: '999999',
      desc: error,
      data: null
    };
  }
};

function mkdir(path, mode) {
  const isDirExists = fs.existsSync || path.existsSync;

  if (typeof mode === 'undefined') {
    // 511 === 0777
    mode = 511 & ~process.umask();
  }
  if (isDirExists(path)) return;
  path
    .replace(/\\/g, '/')
    .split('/')
    .reduce(function(prev, next) {
      if (prev && !isDirExists(prev)) {
        fs.mkdirSync(prev, mode);
      }
      return prev + '/' + next;
    });
  if (!isDirExists(path)) {
    fs.mkdirSync(path, mode);
  }
}

const readFileMd5 = url => {
  return new Promise(resolve => {
    let md5sum = crypto.createHash('md5');
    let stream = fs.createReadStream(url);
    stream.on('data', function(chunk) {
      md5sum.update(chunk);
    });
    stream.on('end', function() {
      let fileMd5 = md5sum.digest('hex');
      resolve(fileMd5);
    });
  });
};
