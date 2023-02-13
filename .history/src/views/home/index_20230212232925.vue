<template>
  <div class="home-container">
    <!-- 导航栏 原本只能通过title属性设置一个导航栏的标题，现在添加一个搜索按钮，需要插槽-->
    <!-- 这样的效果就是将原本标题的位置，换成一个按钮进行显示 -->
    <van-nav-bar class="page-nav-bar">
      <!-- 在按钮中增加一个名字为title的插槽 -->
      <!-- 导航组件之导航栏的插槽的名称之一是title -->
      <!-- 按钮的参数的类型为primary info warning danger，选择了info  参数round规定为圆形按钮 -->
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
      >
        搜索
      </van-button>
    </van-nav-bar>
    <!-- /导航栏 -->
  </div>
</template>

<script>
export default {
  // 组件名称
  name: "HomeIndex",
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
.home-container {
  /* 视频问题 */
  /* #这里需要添加deep，这个标签样式并不是我们自己添加的标签所带的样式，
  所以需要添加/deep/或者全局控制，只有是自己添加的标签才可以直接在scoped中控制样式 */
// 每当出现样式显示不全，但是样式却又生效了，同时style样式还使用了scoped，都可以尝试此方法来解决。
  /deep/ .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
}
</style>