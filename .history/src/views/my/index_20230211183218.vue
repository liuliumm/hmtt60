<template>
  <div class="my-container">
    <!-- 未登录头部 -->
    <div class="header not-login">
      <div class="login-btn">
        <img src="" alt="" class="mobile-img" />
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
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile-img {
        background-image: url(~@/assets/mobile.png);
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
