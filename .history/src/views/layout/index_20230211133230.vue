<template>
  <div class="">
    <!-- 子路由出口 -->
    <router-view />
    <!-- /子路由出口 -->
    <!-- 底部标签导航栏 -->
    <!--
      route: 开启路由模式，路由模式下会匹配路径和标签的to属性，并自动选中标签
     -->
    <router-view />

    <van-tabbar route>
      <van-tabbar-item replace to="/" class=".toutiao-shouye">首页</van-tabbar-item>
      <van-tabbar-item replace to="/" class=".toutiao-wenda">问答</van-tabbar-item>
      <van-tabbar-item replace to="/" class=".toutiao-shipin">视频</van-tabbar-item>
      <van-tabbar-item replace to="/" class=".toutiao-wode">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  // 组件名称
  name: "",
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {};
  },

  setup() {
    const active = ref(0);
    return { active };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {},
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
</style>