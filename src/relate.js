/*!
 * 相对化脚本，用于将React、Vue等项目默认生成的绝对地址转换为相对地址。
 * @author Molay
 */

var path = require('path');
var relativism = require('@jusfoun-vis/relativism');
var relate = relativism.relate;

relate({
  type: 'react',
  dist: path.join(__dirname, '..', 'build'),
  src: path.join(__dirname),
  build: true,
  removeSourceMap: true
});
