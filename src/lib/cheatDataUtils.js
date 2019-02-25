export function fixNum(num) {
  let result = Number(num);
  if (result) {
    num = num + '';
    let fix = ''; // 小数点情况
    let splitArr = num.split('.');
    num = splitArr[0];
    fix = splitArr[1] ? splitArr[1] : '';
    num = num.replace(/\d{1,3}(?=(\d{3})+$)/g, function(s) {
      return s + ',';
    });
    return num + fix;
  }
  return num;
}
// 保留小数
export function _fixNum(num, long) {
  let numLong = 2;
  if (long === 0) {
    numLong = long;
  }
  if (long) {
    numLong = long;
  }
  num = Number(num).toFixed(numLong);
  if (num) {
    num = num + '';
    let fix = ''; // 小数点情况
    let splitArr = num.split('.');
    num = splitArr[0];
    fix = splitArr[1] ? splitArr[1] : '';
    num = num.replace(/\d{1,3}(?=(\d{3})+$)/g, function(s) {
      return s + ',';
    });
    if (fix) {
      return num + '.' + fix;
    }
    return num;
  }
  return num;
}

export function _fixData(num) {
  // 去掉今天末尾为0的填充数据
  for (let len = num.length; len--;) {
    if (num[len] === null) {
      num.pop();
    } else {
      break;
    }
  }
  return num;
}
// 百分数
export function getPrecent(num) {
  return parseFloat(num * 100).toFixed(2) + '%';
};

// 除法
export function floatDiv(arg1, arg2, isNotPercent) {
  let t1 = 0;
  let t2 = 0;
  let r1, r2;
  try {
    t1 = arg1.toString().split('.')[1].length;
  } catch (e) {
  }
  try {
    t2 = arg2.toString().split('.')[1].length;
  } catch (e) {
  }
  r1 = Number(arg1.toString().replace('.', ''));
  r2 = Number(arg2.toString().replace('.', ''));
  if (r2 === 0) {
    return '∞';
  } else {
    var _num = (r1 / r2) * Math.pow(10, t2 - t1);
  }
  if (isNotPercent) {
    return _num.toFixed(2);
  } else {
    return parseFloat((_num * 100).toPrecision(12)).toFixed(2) + '%';
  }
}

// 深拷贝
export function deepCopy(o) {
  if (o instanceof Array) {
    let n = [];
    for (let i = 0; i < o.length; ++i) {
      n[i] = deepCopy(o[i]);
    }
    return n;
  } else if (o instanceof Object) {
    let n = {};
    for (let i in o) {
      n[i] = deepCopy(o[i]);
    }
    return n;
  } else {
    return o;
  }
}
export function getCookie(name) {
  const regexp = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
  const matches = regexp.exec(document.cookie);
  return matches ? matches[2] : null;
};

export function safeGet(p, o, type) {
  // p 路径 数组形式
  // o 数据源
  // 返回的格式 不传默认返回undefine
  // use like this safeGet(['user', 'context', 'name'], this.props, [])
  return p.reduce((xs, x) => (xs && xs[x]) ? xs[x] : type, o);
};

export function uaType() {
  let ua = window && window.navigator && window.navigator.userAgent;
  if (ua && (ua.indexOf('iphone') > 0 || ua.indexOf('Android') > 0 || ua.indexOf('iPad') > 0)) {
    return true;
  } else {
    return false;
  }
};
