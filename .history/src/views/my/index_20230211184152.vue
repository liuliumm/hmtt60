<template>
  <div class="my-container">
    <!-- 未登录头部 -->
    <div class="header not-login">
      <div class="login-btn">
        <img alt="" class="mobile-img" src="~@/assets/mobile.png"/>
        <!-- 这里的~不添加也是可以的（在css中是必须添加~才能使用@的） -->
        <span class="text">登录 / 注册</span>
      </div>
    </div>
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
      flex-direction: column;//设置主轴的方向为y轴
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
</style>
