node-ssh-shell
---
基于[ssh2](https://www.npmjs.com/package/ssh2)实现，ssh登陆远程server，命令行shell模式  

[jump-server](https://www.npmjs.com/package/@gavinning/jump-server) 基于node实现的跳板机

### Usage
更多参数请参考[ssh2](https://www.npmjs.com/package/ssh2).Client.connect: Options
```js
const ssh = require('node-ssh-shell')

ssh({
    host: '192.168.100.1',
    port: 22,
    username: 'nodejs',
    password: 'rules',
    privateKey: require('fs').readFileSync('/here/is/my/key'),
    passphrase: 123,
    readyTimeout: 5000
})
```