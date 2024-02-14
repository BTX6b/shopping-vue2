module.exports = {
  productionSourceMap: false,
  devServer: {
  // 配置代理服务器 解决跨域问题
    proxy: {
      '/api': {
        target: 'http://39.98.123.211'
        // pathRewrite: { '^/api': '' }
      }
    }
  }
}
