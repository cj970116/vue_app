# 这是一个vue_app项目

## 🔥 [项目预览地址](https://cj970116.github.io/vue_app)

## 用(传统方式)命令行把修改过后的代码上传到Github
1. git add .
2. git commit -m "提交信息"
3. git push

## 制作首页App组件
1. 完成 Header 区域，使用的是 Vant-ui 中的Header组件
2. 制作底部的 Tabbar 区域，使用的是 MUI 的 Tabbar.html
 + 在制作 购物车 小图标的时候，操作会相对多一些：
 + 先把 扩展图标的 css 样式，拷贝到 项目中
 + 拷贝 扩展字体库 ttf 文件，到项目中
 + 为 购物车 小图标 ，添加 如下样式 `mui-icon mui-icon-extra mui-icon-extra-cart`
3. 要在 中间区域放置一个 router-view 来展示路由匹配到的组件

## 改造 tabbar 为 router-link

## 设置路由高亮

## 点击 tabbar 中的路由链接，展示对应的路由组件

## 制作首页轮播图布局

## 加载首页轮播图数据axios
1. 获取数据， 如何获取axios呢， 使用 vue-axios
2. 使用 vue-axios 的 this.$axios.get 获取数据
3. 获取到的数据，要保存到 data 身上
4. 使用 v-for 循环渲染 每个 item 项

## 改造 九宫格 区域的样式

## 正在热映 页面 制作
1. 绘制界面， 使用 MUI 中的 media-list.html
2. 使用 vue-axios 获取数据
3. 渲染真实数据

## 实现 正在热映列表 点击跳转到新闻详情
1. 把列表中的每一项改造为 router-link,同时，在跳转的时候应该提供唯一的Id标识符
2. 创建新闻详情的组件页面  NewsInfo.vue
3. 在 路由模块中，将 新闻详情的 路由地址 和 组件页面对应起来

## 实现 新闻详情 的 页面布局 和数据渲染

## 单独封装一个 comment.vue 评论子组件
1. 先创建一个 单独的 comment.vue 组件模板
2. 在需要使用 comment 组件的 页面中，先手动 导入 comment 组件
 + `import comment from './comment.vue'`
3. 在父组件中，使用 `components` 属性，将刚才导入 comment 组件，注册为自己的 子组件
4. 将注册子组件时候的，注册名称，以 标签形式，在页面中 引用即可

## 获取所有的评论数据显示到页面中
1. getComments

## 实现点击加载更多评论的功能
1. 为加载更多按钮，绑定点击事件，在事件中，请求 下一页数据
2. 点击加载更多，让 pageIndex++ , 然后重新调用 this.getComments() 方法重新获取最新一页的数据
3. 为了防止 新数据 覆盖老数据的情况，我们在 点击加载更多的时候，每当获取到新数据，应该让 老数据 调用 数组的 concat 方法，拼接上新数组

## 发表评论
1. 把文本框做双向数据绑定
2. 为发表按钮绑定一个事件
3. 通过 vue-axios发送一个请求，把评论内容提交给 服务器
5. 当发表评论OK后，重新刷新列表，以查看最新的评论
注:由于豆瓣接口需要登陆才能发表评论,这里我们选择使用本地数据渲染

## 改造图片分析 按钮为 路由的链接并显示对应的组件页面

## 绘制 电影排行列表 组件页面结构并美化样式
 1. 制作 顶部的滑动条
 2. 制作 底部的图片列表
### 制作顶部滑动条的坑们：
 1. 需要借助于 Vant-ui 中的tab

### 制作图片列表区域
1. 图片列表需要使用懒加载技术，我们可以使用 Mint-UI 提供的现成的 组件 `lazy-load`
2. 根据`lazy-load`的使用文档，尝试使用
3. 渲染图片列表数据

### 实现了 图片列表的 懒加载改造和 样式美化
使用了vant-ui的懒加载组件

## 实现了 点击图片 跳转到 图片详情页面
1. 在改造 li 成 router-link 的时候，需要使用 tag 属性指定要渲染为 哪种元素


## 实现 图片详情中 缩略图的功能
1. 使用 插件 vant-ui 缩略图组件
2. 获取到所有的图片列表，然后使用 v-for 指令渲染数据

## 绘制商品购买组件
1.绘制经典的两列布局,使用flex
2.从接口获取数据并渲染
## 绘制商品详情页面
1.使用mui卡片列表样式
2.使用mui的numbox自定义一个子组件,以便其他组件使用
3.从接口获取数据渲染页面,控制numbox加减范围

## 绘制购物车组件
1.绘制2个列表,上面渲染商品简略信息,下面是结算列表
2.使用vuex状态管理组件进行跨组件数据传递,并将其存入localstorage中
3.动态计算商品数量,价格,增加删除功能
