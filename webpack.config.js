const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = (env, argv) => {
  const config = {
    mode: 'development',
    entry: './src/index.js',
    output: {
      // 输出文件的目标路径，必须要是绝对路径
      path: resolve(__dirname, 'typeScriptStudy'),
      // 输出文件名称
      filename: 'index.js',
    },
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    },
    module: {
      rules: [
        // 处理CSS和Sass或者scss
        {
          test: /\.s?[ac]ss$/i,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                // 默认css中的图片地址
                publicPath: '../',
              },
            },
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ], // less-loader作用是将less转换成普通的css
        },
        // 处理JS
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    // 按需加载
                    useBuiltIns: 'usage',
                    // corejs的版本
                    corejs: 3,
                    targets: {
                      browsers: ['last 1 version', '> 1%'],
                    },
                  },
                ],
              ],
              plugins: [
                [
                  '@babel/plugin-transform-runtime',
                  {
                    corejs: false, // 使用这行代码需要安装@babel/runtime-corejs3 包
                  },
                ],
              ],
            },
          },
        },
        // 处理图片
        {
          test: /\.(png|gif|jpe?g)$/i,
          // 使用资源模块
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: 8 * 1024,
            },
          },
          generator: {
            filename: 'image/[name][ext]',
          },
        },
      ],
    },
    optimization: {
      minimize: true,
      minimizer: [
        // JS压缩
        new TerserPlugin({
          test: /\.js(\?.*)?$/i, //匹配参与压缩的文件
          parallel: true, // 使用多进程并行运行
          extractComments: false, //将注释剥离到单独的文件中
          //Terser 压缩配置
          terserOptions: {
            format: {
              comments: false,
            },
            // 生产环境生效
            compress: {
              drop_console: true, //传true就是干掉所有的console.*这些函数的调用.
              drop_debugger: true, //干掉那些debugger;
              pure_funcs: ['console.log'], // 如果你要干掉特定的函数比如console.info ，又想删掉后保留其参数中的副作用，那用pure_funcs来处理
            },
          },
        }),
        // css压缩
        new CssMinimizerPlugin(),
      ],
    },
    plugins: [
      // Css压缩
      new MiniCssExtractPlugin({
        filename: 'css/[name].css', // [name]的意思是保持打包之前的css名字
      }),

      require('autoprefixer'),

      // Html的配置
      new HtmlWebpackPlugin({
        // 指定打包后的名称
        filename: 'index.html',
        // 用来指定生成HTML的模版
        template: './src/index.html',
      }),
      // 将src中不需要处理的文件，直接输出到目录中
      new CopyWebpackPlugin({
        patterns: [{ from: 'src/public', to: 'public' }],
      }),
      // 打包之前，删除历史文件
      new CleanWebpackPlugin(),
    ],
    // 开发服务器
    devServer: {
      // 指定加载内容的路径
      // contentBase新版中已经被static替换
      static: resolve(__dirname, 'src'),

      //启用gzip压缩
      compress: true,

      // 指定端口号
      port: 9999,

      // 启用热更新
      liveReload: true,

      // 配置代理：解决接口跨域问题（整体模式固定）
      proxy: {},
    },
    // 配置目标
    target: 'web',
  };

  // 判断当前是否是生产环境打包
  if (env.production) {
    config.mode = 'production';
    // 插件配置
    config.plugins = [
      // Css压缩
      new MiniCssExtractPlugin({
        filename: 'css/[name].css', // [name]的意思是保持打包之前的css名字
      }),

      require('autoprefixer'),

      // Html的配置
      new HtmlWebpackPlugin({
        // 指定打包后的名称
        filename: 'index.html',
        // 用来指定生成HTML的模版
        template: './src/index.html',
        // 指定HTML中使用的变量
        title: 'Webpack.Demo',
        // 压缩HTML
        minify: {
          collapseWhitespace: true, // 折叠空格
          keepClosingSlash: true,
          removeComments: true, // 删除注释
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true,
        },
      }),
      // 将src中不需要处理的文件，直接输出到目录中
      new CopyWebpackPlugin({
        patterns: [{ from: 'src/public', to: 'public' }],
      }),
      // 打包之前，删除历史文件
      new CleanWebpackPlugin(),
    ];
  }
  return config;
};
