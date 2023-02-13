<template>
  <div class="layout-container">
    <!-- 子路由出口 -->
    <router-view />
    <!-- /子路由出口 -->
    <!-- 底部标签导航栏 -->
    <!--
      route: 开启路由模式，路由模式下会匹配路径和标签的to属性，并自动选中标签
     -->

    <van-tabbar class="layout-tabbar" route>
      <van-tabbar-item replace to="/" >
        <i slot="icon" class="toutiao toutiao-shouye"></i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item replace to="/text" class=".toutiao-wenda">
        问答
      </van-tabbar-item>
      <van-tabbar-item replace to="/text" class=".toutiao-shipin">
        视频
      </van-tabbar-item>
      <van-tabbar-item replace to="/text" class=".toutiao-wode">
        我的
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  // 组件名称
  name: "LayoutIndex",
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
.layout-container {
  .layout-tabbar {
    i.toutiao {
      font-size: 40px;
    }
    span.text {
      font-size: 20px;
    }
  }
}
</style>