
## clone之后需要把submodule也弄下来:
- git submodule update --init  .

## 需要的环境:
- io.js(nodejs的激进版本): https://iojs.org
- nodejs版本管理工具: npm

## 运行之前,安装依赖库:
- 在本目录下执行 npm install

## 运行:
- 正向代理服务器: node proxy.js
- 反向代理服务器: node proxy.js e.o2obest.cn (所有请求都发到e.o2obest.cn上)

## 添加新的特殊用例:
- 修改specialPaths.js

## 测试:
- 需要安装nodeunit: `npm install -g nodeunit`
- `npm test`
- 添加代码之后,修改test_proxy.js, 参考'test("specialPaths",...)'
