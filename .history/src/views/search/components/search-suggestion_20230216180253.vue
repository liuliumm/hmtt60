<template>
  <div class="search-suggestion">
    <van-cell title="黑马程序员..." icon="search"></van-cell>
    <van-cell title="黑马程序员..." icon="search"></van-cell>
    <van-cell title="黑马程序员..." icon="search"></van-cell>
    <van-cell title="黑马程序员..." icon="search"></van-cell>
    <van-cell title="黑马程序员..." icon="search"></van-cell>
  </div>
</template>

<script>
export default {
  name: "SearchSuggestion",
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  watch: {
    //只要searchText发生变化，我们都需要发起请求，显示最新的联想建议（联想建议会随着输入的内容变化而变化），所以我们需要监听searchText的变化，那么就需要使用watch
    // searchText:function(){}
    // searchText(){}
    searchText: {
        // 当 searchText 发生改变的时候就会调用 handler 函数
        // 注意：handler 函数名称是固定的
      handler(val) {
        console.log(val);
      },
      // deep: true,
      // 首次监视触发（如果不添加这个属性，那么handler无法监听到第一次searchText的变化）
      immediate: true,  //immediate立即的意思
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped lang="less"></style>
</style>