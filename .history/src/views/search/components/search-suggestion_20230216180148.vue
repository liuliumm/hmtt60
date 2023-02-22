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
    searchText: {
      handler(val) {
        console.log(val);
      },
      immediate: true,
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped lang="less"></style>
</style>