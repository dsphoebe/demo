const LOCAL_STOR_KEY = 'keyboardNav'

const {keys, hash} = init()

generatorKeyboard(keys, hash)

bindKey(hash)

function tag(tagName) {
  return document.createElement(tagName)
}

function createButton(keyValue) {
  const button = tag('button')
  button.textContent = 'E'
  button.id = keyValue            
  button.onclick = function(e) {
    const button = e.target
    const img = button.nextSibling
    const keyValue = button.id
    const newWebsite = prompt('请输入键位「'+ keyValue +'」对应的网站地址')
    hash[keyValue] = newWebsite
    img.src = newWebsite + '/favicon.ico'
    img.onerror = function(e) {
      e.target.src = 'https://www.favicon.cc/logo3d/407592.png'
    }
    localStorage.setItem(LOCAL_STOR_KEY, JSON.stringify(hash))
  }
  return button
}

function createImg(website) {
  var img = tag('img')
  img.src = website + '/favicon.ico'
  img.onerror = function(e) {
    e.target.src = 'https://www.favicon.cc/logo3d/407592.png'
  }
  return img
}

function generatorKeyboard(key, hash) {
  const main = document.getElementsByTagName('main')[0]
  const ul = tag('ul')
  for (let index = 0; index < keys.length; index++) {
    const row = keys[index]
    for (let index2 = 0; index2 < row.length; index2++) {
      const keyValue = row[index2]
      const li = tag('li')

      if (typeof keyValue != 'string') {
        for (let keyValueIndex = 0; keyValueIndex < keyValue.length; keyValueIndex++) {
          const currentKeyValue = keyValue[keyValueIndex]
          const currentText = document.createTextNode(currentKeyValue)
          if (keyValueIndex + 1 >= keyValue.length) {
            const br = tag('br')
            li.appendChild(br);
          }
          li.appendChild(currentText);
        }
      } else {

        const button = createButton(keyValue)
        li.append(button)

        const website = hash[keyValue]
        if (website) {
          const img = createImg(website)
          img ? li.append(img) : void(0)
        }

        var text = document.createTextNode(keyValue)
        li.appendChild(text);
      }
      ul.append(li)
    }
  }
  main.appendChild(ul);
}

function bindKey(hash) {
  document.onkeypress = function(e){
    const key = e['key'],
      website = hash[key]
    window.open(website, '_blank')
  }
}

function init() {
  const keys = {
    0: {
      0: 'ESC',
      1: 'F1',
      2: 'F2',
      3: 'F3',
      4: 'F4',
      5: 'F5',
      6: 'F6',
      7: 'F7',
      8: 'F8',
      9: 'F9',
      10: 'F10',
      11: 'F11',
      12: 'F12',
      'length': 13
    },
    1: {
      0: {
        0: '~',
        1: '`',
        'length': 2
      },
      1: {
        0: '!',
        1: '1',
        'length': 2
      },
      2: {
        0: '@',
        1: '2',
        'length': 2
      },
      3: {
        0: '#',
        1: '3',
        'length': 2
      },
      4: {
        0: '$',
        1: '4',
        'length': 2
      },
      5: {
        0: '%',
        1: '5',
        'length': 2
      },
      6: {
        0: '^',
        1: '6',
        'length': 2
      },
      7: {
        0: '&',
        1: '7',
        'length': 2
      },
      8: {
        0: '*',
        1: '8',
        'length': 2
      },
      9: {
        0: '(',
        1: '9',
        'length': 2
      },
      10: {
        0: ')',
        1: '0',
        'length': 2
      },
      11: {
        0: '_',
        1: '-',
        'length': 2
      },
      12: {
        0: '+',
        1: '=',
        'length': 2
      },
      13: '\u2190',
      'length': 14
    }, 
    2: {
      0: '\u21c4',
      1: 'q',
      2: 'w',
      3: 'e',
      4: 'r',
      5: 't',
      6: 'y',
      7: 'u',
      8: 'i',
      9: 'o',
      10: 'p',
      11: {
        0: '{',
        1: '[',
        'length': 2
      },
      12: {
        0: '}',
        1: ']',
        'length': 2
      },
      13: {
        0: '|',
        1: '\\',
        'length': 2
      },
      'length': 14
    },
    3: {
      0: '\u21e9',
      1: 'a',
      2: 's',
      3: 'd',
      4: 'f',
      5: 'g',
      6: 'h',
      7: 'j',
      8: 'k',
      9: 'l',
      10: {
        0: '\:',
        1: '\;'
      },
      11: {
        0: '"',
        1: '\'',
        'length': 2
      },
      12: '\u21b5',
      'length': 13
    },
    4: {
      0: '\u21e7',
      1: 'z',
      2: 'x',
      3: 'c',
      4: 'v',
      5: 'b',
      6: 'n',
      7: 'm',
      8: {
        0: '<',
        1: ',',
        'length': 2
      },
      9: {
        0: '>',
        1: ',',
        'length': 2
      },
      10: {
        0: '?',
        1: '/',
        'length': 2
      },
      11: '\u21e7',
      'length': 12
    }, 
    5: {
      0: 'Control',
      1: 'Win',
      2: 'Alt',
      3: '',
      4: 'Alt',
      5: '\u2196',
      6: 'Fn',
      7: 'Control',
      'length': 8
    },
    'length': 6
  }

  let hash = localStorage.getItem(LOCAL_STOR_KEY)
  hash = hash && JSON.parse(hash) || {
    'q': 'https://www.qq.com',
    'w': 'https://www.aliyun.com',
    'e': 'https://exmail.qq.com',
    'r': 'http://www.raychase.net',
    't': 'https://www.taobao.com',
    'y': 'https://www.youtube.com',
    'u': 'http://www.uniqlo.com',
    'i': 'http://iqiyi.com',
    'o': 'https://outlook.live.com',
    'p': 'https://www.pinterest.com',
    'a': 'https://www.amazon.cn',
    's': 'https://www.sitepoint.com',
    'd': 'https://douban.com',
    'f': 'https://facebook.com',
    'g': 'http://www.google.com',
    'h': 'https://www.hao123.com',
    'j': 'http://www.jssor.com',
    'k': 'https://www.kuaidi100.com',
    'l': 'http://www.lofter.com',
    'z': 'https://zhihu.com',
    'x': 'https://xiedaimala.com',
    'c': 'https://codepen.io',
    'v': 'https://vimeo.com',
    'b': 'https://www.baidu.com',
    'n': 'https://www.namesilo.com',
    'm': 'https://map.baidu.com',
  }
  return {keys, hash}
}