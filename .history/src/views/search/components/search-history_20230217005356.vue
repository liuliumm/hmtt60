<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <span>全部删除</span>
      <span>完成</span>
      <van-icon name="delete" />
    </van-cell>
    <van-cell :title="text" v-for="text in searchHistories" :key="text">
      <template #default>
        <van-icon name="close" />
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "SearchHistory",
  props: {
    searchHistories: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped lang="less"></style>
</style>