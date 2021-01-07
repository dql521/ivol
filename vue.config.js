module.exports = {
  publicPath: './',
  // devServer: {
  //   open: true,
  //   hot: true,
  //   proxy: { // 开发环境代理配置
  //     '/api': { // 匹配 /dev-api 开头的请求，
  //       // 目标服务器地址
  //       target: 'https://45.145.126.108:443',
  //       changeOrigin: false, // 开启代理服务器，上线时关闭代理
  //       pathRewrite: {
  //         //  会将 /dev-api 替换为 '',也就是 /dev-api 会移除，
  //         // 如 /dev-api/db.json 代理到 https://localhost:8080/db.json
  //         '^/api': ''
  //       }
  //     }
  //   }
  // },
  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          require('postcss-px2rem')({
            remUnit: 36
          })
        ]
      }
    }
  }
}
