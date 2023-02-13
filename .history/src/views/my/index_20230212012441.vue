<template>
  <div class="my-container">
    <!-- 未登录头部 -->
    <div class="header not-login">
      <div class="login-btn">
        <img alt="" class="mobile-img" src="~@/assets/mobile.png" />
        <!-- 这里的~不添加也是可以的（在css中是必须添加~才能使用@的） -->
        <span class="text">登录 / 注册</span>
      </div>
    </div>
    <!-- 已登录头部 -->
    <div class="header user-info">
      <div class="base-info">
        <div class="left">
          <van-image
            class="avatar"
            round
            src="https://img.yzcdn.cn/vant/cat.jpeg"
            fit="cover"
          />
          <span class="name">黑马头条号</span>
        </div>
        <div class="right">
          <van-button size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">10</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">10</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">10</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">10</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- /已登录头部 -->
    <!-- 宫格导航
	    column-num: 2 ，列数为2列，代表一行两列
	    clickable: 是否开启格子点击反馈(点击格子之后，会出现灰色效果) -->
    <van-grid class="grid-nav mb-9" :column-num="2" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- /宫格导航 -->
  </div>
</template>

<script>
export default {
  name: "MyIndex",
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="less">
// 未登录头部样式
.my-container {
  .header {
    background-image: url(~@/assets/banner.png);
    height: 361px;
    background-size: cover;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex; // 设置弹性布局
      flex-direction: column; //设置主轴的方向为y轴
      justify-content: center; // 设置主轴上的子元素排列方式为居中对齐
      align-items: center; // 设置侧轴上的子元素排列方式为垂直居中
      .mobile-img {
        // background-image: url(~@/assets/mobile.png);
        height: 132px;
        width: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }
}

// 已登录头部样式
.user-info {
  .base-info {
    height: 231px;
    padding: 76px 32px 23px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      .avatar {
        width: 132px;
        height: 132px;
        border: 4px solid #fff;
        margin-right: 23px;
      }
      .name {
        font-size: 30px;
        color: #fff;
      }
    }
  }
  .data-stats {
    display: flex;
    .data-item {
      height: 130px;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #fff;
      .count {
        font-size: 36px;
      }
      .text {
        font-size: 23px;
      }
    }
  }
}
// 宫格导航样式
.grid-nav {
    .grid-item {
      height: 141px;
      i.toutiao {
        font-size: 45px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
      span.text {
        font-size: 28px;
      }
    }
  }
</style>
