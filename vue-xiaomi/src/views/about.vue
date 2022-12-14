<template>
  <div class="about">
    <header>
      <h1 class="title W">  关于我们</h1>
    </header>
    <div class="txt W">
      <h1>Store（参考小米商城）</h1>
      <h2>前言</h2>
      <p>
        2020年寒假尤其特殊，因为新型冠状病毒肺炎疫情，学校至今没有开学。想起上学期利用课余时间学习了`Vue.js`、`Node.js`，一直想做个完整的项目实战一下，但之前在学校并没有那么多的时间。现在恰好有时间，就想着做一个项目巩固之前学到的东西。
      </p>
      <p>
        思来想去，最后决定模仿 <a href="">小米商城</a>
        做一个电商项目。可能时间隔得有点久了，之前学的东西很多都差不多忘记了，做这个项目基本上都是看着官方的文档一点一点做的。在家里也免不了有各种各样的事情耽误了项目的进度。现在终于差不多做好了，分享出来，新手上路，如有错误，请多多指教。
      </p>
      <h1>说明</h1>
      <ul>
        <li>
          <p>
            本项目前后端分离，前端参考 小米商城
            实现，但与小米官方没有关系，纯属个人瞎搞，若需要购买小米产品请到小米官方商城。
          </p>
        </li>
        <li>
          <p>这是本项目的前端，后端请移步到store-server 。</p>
        </li>
        <li>
          <p>
            前端已经部署在阿里云，欢迎访问 http://106.15.179.105/
            （没有兼容移动端，请使用电脑访问）。
          </p>
        </li>
        <li>
          <p>
            后端也已经部署在阿里云，接口地址已经修改为线上地址，本地运行前端也可以正常访问后端。
          </p>
        </li>
        <li>
          <p>
            本人在读本科大三，今年暑假即将开始实习，后面的时间可能没有那么的自由，但会不定期的更新完善该项目，如有问题请直接在
            Issues 中提。
          </p>
        </li>
        <li>
          <p>如果觉得这个项目还不错，您可以点右上角 Star支持一下， 谢谢！ _</p>
        </li>
      </ul>
      <h1>项目简介</h1>
      <p>
        本项目前后端分离，前端基于Vue+Vue-router+Vuex+Element-ui+Axios，参考小米商城实现。后端基于Node.js(Koa框架)+Mysql实现。
      </p>
      <p>
        前端包含了11个页面：首页、登录、注册、全部商品、商品详情页、关于我们、我的收藏、购物车、订单结算页面、我的订单以及错误处理页面。
      </p>
      <p>
        实现了商品的展示、商品分类查询、关键字搜索商品、商品详细信息展示、登录、注册、用户购物车、订单结算、用户订单、用户收藏列表以及错误处理功能。
      </p>
      <p>
        后端采取了MVC模式，根据前端需要的数据分模块设计了相应的接口、控制层、数据持久层。后端传送地址store-server
        。
      </p>
      <h1>技术栈</h1>
      <p><span>前端：</span>Vue+Vue-router+Vuex+Element-ui+Axios</p>
      <p><span>后端：</span>Node.js、Koa框架</p>
      <p><span>数据库：</span>Mysql</p>
      <h1>功能模块</h1>
      <h2>登录</h2>
      <p>
        页面使用了element-ui的Dialog实现弹出蒙版对话框的效果，登录按钮设置在App.vue根组件，通过vuex中的showLogin状态控制登录框是否显示。
      </p>
      <p>
        这样设计是为了既可以通过点击页面中的按钮登录，也可以是用户访问需要登录验证的页面或后端返回需要验证登录的提示后自动弹出登录框，减少了页面的跳转，简化用户操作。
      </p>
      <p>
        用户输入的数据往往是不可靠的，所以本项目前后端都对登录信息进行了校验，前端基于element-ui的表单校验方式，自定义了校验规则进行校验。
      </p>
      <h2>注册</h2>
      <p>
        页面同样使用了element-ui的Dialog实现弹出蒙版对话框的效果，注册按钮设置在App.vue根组件，通过父子组件传值控制注册框是否显示。
      </p>
      <p>
        用户输入的数据往往是不可靠的，所以本项目前后端同样都对注册信息进行了校验，前端基于element-ui的表单校验方式，自定义了校验规则进行校验。
      </p>
      <h2>首页</h2>
      <p>
        首页主要是对商品的展示，有轮播图展示推荐的商品，分类别对热门商品进行展示。
      </p>
      <h2>全部商品</h2>
      <p>
        全部商品页面集成了全部商品展示、商品分类查询，以及根据关键字搜索商品结果展示。
      </p>
      <h2>商品详情页</h2>
      <p>
        商品详情页主要是对某个商品的详细信息进行展示，用户可以在这里把喜欢的商品加入购物车或收藏列表。
      </p>
      <h2>我的购物车</h2>
      <p>购物车采用vuex实现，页面效果参考了小米商城的购物车。</p>
      <p>详细实现过程请看：基于Vuex实现小米商城购物车</p>
      <h2>订单结算</h2>
      <p>
        用户在购物车选择了准备购买的商品后，点击“去结算”按钮，会来到该页面。
        <br />
        用户在这里选择收货地址，确认订单的相关信息，然后确认购买。
      </p>
      <h2>我的收藏</h2>
      <p>
        用户在商品的详情页，可以通过点击加入 喜欢
        按钮，把喜欢的商品加入到收藏列表。
      </p>
      <h2>我的订单</h2>
      <p>对用户的所有订单进行展示。</p>
      <h2>运行项目</h2>
      <p><span>注意：</span></p>
      <p>
        后端接口地址已经修改为线上的地址，本地运行会直接分为我部署在服务器的后端。
      </p>
      <p>
        为了方便测试，数据库数据没有加密，注册时切记不要使用自己的常用密码。
      </p>
      <p>
        如果需要自己运行后端，请移步到store-server
        clone后端项目，并修改前端的接口地址为您的服务器地址。
      </p>
      <ul>
        <li>1. Clone project</li>
        <li>git clone https://github.com/hai-27/vue-store.git</li>
        <li>2. Project setup</li>
        <li>cd vue-store</li>
        <li>npm install</li>
        <li>3. Compiles and hot-reloads for development</li>
        <li>npm run serve</li>
        <li>4. Compiles and minifies for production</li>
        <li>npm run build</li>
      </ul>
      <p><span>作者 </span>hai-27</p>
      <p>2020年3月8日</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang='scss'>
header {
  border-bottom: 5px solid orangered;
  background-color: #fff;
}
.title {
  font-size: 30px;
  padding-left: 10px;
  margin-bottom: 20px;
}
li {
  margin: 10px 0;
  padding: 10px 20px;
}
.txt {
  background-color: #fff;
  padding: 20px 20px;
  h1 {
    font-size: 30px;
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
  }
  h2 {
    font-size: 28px;
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
  }
  p {
    font-size: 20px;
    margin: 20px 0;
    padding: 0 20px;
    span {
      font-size: 20px;
      font-weight: 700;
    }
  }
}
</style>
