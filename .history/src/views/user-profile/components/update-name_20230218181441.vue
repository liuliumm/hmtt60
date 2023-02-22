<template>
  <div class="update-name">
    <!-- 导航栏 -->
    <van-nav-bar title="设置昵称" left-text="取消" right-text="确定" />
    <!-- /导航栏 -->
    <van-field
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="7"
      placeholder="请输入新昵称"
      show-word-limit
    />
  </div>
</template>

<script>
export default {
  // 组件名称
  name: "UpdateName",
  // 组件参数 接收来自父组件的数据
  props: {},
  // 组件状态值
  data() {
    return { message: "" };
  },
  // 组件方法
  methods: {},
};
</script>

<style scoped lang="less">
.field-wrap {
  padding: 20px;
}
</style>