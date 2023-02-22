<template>
  <div class="search-container">
    <van-search
      v-model="value"
      placeholder="请输入搜索关键词"
      input-align="center"
      background="#1989fa"
    />
  </div>
</template>

<script>
export default {
    data: {
        return: {
            value: "",
        }
    },
};
</script>

<style scoped lang="less">

</style>