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
    width: ;
    height: ;
    .login-btn{
      width: ;
      height: ;
      .mobile-img{
      background-image: url(~@/assets/mobile.png);
      height: ;
      width: ;
      margin: ;
    }
    .text{
      font-size: ;
      color: ;
    }
    }
    
  }
}
</style>
