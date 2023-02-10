<template>
  <div class="login-container">
    <van-nav-bar title="登录" />
    <van-form @submit="onSubmit">
      <van-field
        v-model = "user.mobile"
        name="手机号"
        placeholder="请输入手机号"
        
      >
        <!-- 通过插槽处理自定义图标 -->
        <!-- 新版本插槽的写法 ， 相当于slot="left-icon" -->
        <template #left-icon>
          <i class="toutiao toutiao-shouji" />
        </template>
      </van-field>
      <van-field
        v-model = "user.code"
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
        <van-button round block type="info" native-type="submit" >登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
// Toast 默认采用单例模式，即同一时间只会存在一个 Toast，
// 如果需要在同一时间弹出多个 Toast，可以参考下面的示例
// Toast.allowMultiple(); //允许多个
// const toast1 = Toast('第一个 Toast');
// const toast2 = Toast.success('第二个 Toast');

// toast1.clear();
// toast2.clear();

import { login } from '@/api/user'
// import { Toast } from 'vant';
export default {
  // 组件名称
  name: "LoginIndex",
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      user: {
        mobile: '',
        code: "",
      },
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    // onSubmit(values) {
    //   console.log("submit", values);
    // },
    async onSubmit() {
      this.$toast.loading({
        duration: 0, //持续时间，默认时间2s，0表示持续展示不不停止，直到成功或失败
        forbidClick: true, //是否禁止背景点击（forbid: 禁止）
        message: '登陆中...'  //提示消息
      })
      try {
        const res = await login(this.user)
        console.log('登陆成功', res);
        this.$toast.success('登录成功')
      }catch (err) {
        if (err.response.status === 400) {
     	  console.log('手机号或验证码错误', err)
        this.$toast.fail('手机号或验证码错误')
        }else{
          console.log('登录失败，请稍候重试', err)
          this.$toast.fail('登录失败，请稍后重试')
        }
      }
    }
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
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 192px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>