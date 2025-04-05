## 介绍
该目录下的脚本是本人博客园的js主题脚本。  

大致上是基于https://github.com/Zou-Wang/CNblogs-Theme-Sakura这个主题的1.0版本进行修改的。  
但是事实上我并不是很喜欢这个主题，现在已经将这个主题改得完全不一样了，有非常大的区别。  

## 使用
博客园开通js权限……   
> 并不推荐除了我之外的人使用，因为我并没有新创建一个博客园账号去测试如何从零开始使用这个主题。  

由于是自己用的，因此并不会把使用说明写得很详细，但是你可以通过这个仓库，来了解这个博客的样式和js是如何写出来的。  
...

1. /css/index.css  
2. main.js(main后面可能加数字，因为博客园文件有缓存，改了之后不会立即生效)。  
## 开发
使用less简化css的编写。  
使用easy-less插件，按Ctrl+S时自动将less文件编译成css文件。  
https://marketplace.cursorapi.com/items?itemName=mrcrowl.easy-less  

### 框架迁移
前面用lit写了一些小组件，但是后面越来越觉得lit-html不好用。因此需要换成其他模板，现在正考虑使用preact，jsx加编译，能够有更好的编写体验。  
### 博客园环境
1. 博客园自带jquery环境。  
截止到2025.3.9，目前的版本是3.3.1。  
2. jquery.writeCapture插件，没了解过。  
3. css环境，放在env目录下。这些css在网页中自动加载，因此如果我们写html控件，应当考虑这些css的影响。  
4. 百度和谷歌，以及博客园自带的js，一万来行，谁去看。  