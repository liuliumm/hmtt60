<template>
  <div class="login-container">
    <van-nav-bar title="登录" />
    <van-form @submit="onSubmit">
      <van-field
        name="手机号"
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '请输入手机号' }]"
      >
        <!-- 通过插槽处理自定义图标 -->
        <!-- 新版本插槽的写法 ， 相当于slot="left-icon" -->
        <template #left-icon>
          <i class="toutiao toutiao-shouji" />
        </template>
      </van-field>

      <van-field
        type="password"
        name="验证码"
        center
        clearable
        placeholder="请输入短信验证码"
      >
        <template #left-icon>
          <i class="toutiao toutiao-yanzhengma" />
        </template>
        <template #button>
          <van-button class="send-sms-btn" round type="primary"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  // 组件名称
  name: "LoginIndex",
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {};
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    onSubmit(values) {
      console.log("submit", values);
    },
  },
  // 以下是生命周期钩子   注：没用到的钩子请自行删除
  /**
   * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
   */
  created() {},
  /**
   * el 被新创建的 vm.$ el 替换，并挂载到实例上去之后调用该钩子。
   * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$ el 也在文档内。
   */
  mounted() {},
};
</script> 

<style scoped lang="less">
.send-sms-btn {
  width: 162px;
  height: 46px;
  line-height: 46px;
  background-color: #ededed;
  font-size: 16px;
  color: #666;
}
</style>