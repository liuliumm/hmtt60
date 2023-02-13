<template>
  <div class="login-container">
    <van-nav-bar class="page-nav-bar" title="登录">
      <template #left>
        <van-icon name="cross" @click="$router.back()" />
      </template>
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="loginFormRef">
      <van-field
        v-model="user.mobile"
        name="手机号"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <!-- 通过插槽处理自定义图标 -->
        <!-- 新版本插槽的写法 ， 相当于slot="left-icon" -->
        <template #left-icon>
          <i class="toutiao toutiao-shouji" />
        </template>
      </van-field>
      <van-field
        v-model="user.code"
        name="验证码"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
        center
        clearable
        placeholder="请输入短信验证码"
      >
        <template #left-icon>
          <i class="toutiao toutiao-yanzhengma" />
        </template>
        <template #right-icon>
          <van-count-down
            v-if="isCountDown"
            format="ss 秒"
            :time="5 * 1000"
            @finish="isCountDown = false"
          />
          <van-button
            v-else
            class="send-sms-btn"
            round
            type="primary"
            @click="onSendSms"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          class="login-btn"
          >登录</van-button
        >
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

import { login, sendSms } from "@/api/user";
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
        mobile: "",
        code: "",
      },
      userFormRules: {
        mobile: [
          {
            required: true,
            message: "手机号不能为空",
          },
          {
            pattern: /^1[3|5|7|8|9]\d{9}$/,
            // pattern: /^1[3-9]\d{9}$/,
            message: "手机号格式错误",
          },
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码格式错误",
          },
        ],
      },
      isCountDown: false,
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
    async onSubmit(values) {
      try {
        // 1. 获取表单数据
        // const user = this.user
        // TODO: 2. 表单验证
        // 3. 提交表单请求登录
        this.$toast.loading({
          duration: 0, //持续时间，默认时间2s，0表示持续展示不不停止，直到成功或失败
          forbidClick: true, //是否禁止背景点击（forbid: 禁止）
          message: "登陆中...", //提示消息
        })
        // 登录成功以后将后端返回的 token 相关数据存储到容器中
        const { data } = await login(this.user);
        // 1. token 可能用来做页面某些逻辑的判断，所以期望token数据最好是响应式数据 => vuex
        this.$store.commit("setUser", data.data);
        // 2. token 应该是可用一段时间的，在此期间，页面刷新，用户身份应该依然还在 => localStorage
        this.$toast.success("登录成功");
        console.log("登录成功");
        // 3. 回到来的地方
        this.$router.back()
        // 4. 根据请求响应结果处理后续操作
        // const res = await login(this.user);
        // console.log("登陆成功", res);
        // this.$toast.success("登录成功");
      } catch (err) {
        if (+err.response.status === 400) {
          console.log("手机号或验证码错误", err);
          this.$toast.fail("手机号或验证码错误");
        } else {
          console.log("登录失败，请稍候重试", err);
          this.$toast.fail("登录失败，请稍后重试");
        }
      }
    },
    async onSendSms() {
      // 1. 校验手机号
      //这里为啥添加await，是因为validate返回一个Promise
      //参数是van-field的name
      // 0. 先验证一下手机号是否合法
      // ref: ref如果定义在原生的dom元素，取得的是dom元素；如果定义在组件上，取得的是组件实例
      const ret = await this.$refs.loginFormRef.validate("mobile").catch((err) => err);
      //调用validate手动校验
      console.log("------ret: ", ret);
      // js中的6个假值: 0 NaN '' false null undefined
      if (ret) return;
      // 1. 调接口把手机号发给后台
      this.isCountDown = true;
      try {
        await sendSms(this.user.mobile);
        this.$toast.success("发送验证码成功");
      } catch (err) {
        console.log("--------err: ", err);
        if (err.response.status === 429) {
          this.$toast.fail(err.response.data.message);
        } else {
          this.$toast.fail("网络失败，请重试");
        }
      }
      // 2. 验证通过，显示倒计时
      // 3. 请求发送验证码
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