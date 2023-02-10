/**
 * PostCSS 配置文件
 */
module.exports = {
  // 配置要使用的 PostCSS 插件
    plugins: {
      // 配置使用 autoprefixer 插件
        // 作用：生成浏览器 CSS 样式规则前缀
      // 'autoprefixer': {
            // autoprefixer 插件的配置
                // 配置要兼容到的环境信息
        // browsers: ['Android >= 4.0', 'iOS >= 8']
      // },
      // 配置使用 postcss-pxtorem 插件
        // 作用：把 px 转为 rem
      'postcss-pxtorem': {
        // 配置要转换的 CSS 属性
            // * 表示所有
        // rootValue: 37.5,
        // propList: ['*']
        rootValue({ file }) {  //`rootValue`：表示根元素字体大小，它会根据根元素大小进行单位转换
          return file.indexOf('vant') !== -1 ? 37.5 : 75
                    // indexOf() 方法对大小写敏感！
                    // 注释：如果要检索的字符串值没有出现，则该方法返回 -1。
        },
        propList: ['*'] 
        // `propList` 用来设定可以从 px 转为 rem 的属性
        // 例如 `*` 就是所有属性都要转换，`width` 就是仅转换 `width` 属性
      }
    }
  }
  