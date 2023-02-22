<template>
  <div>
    <van-cell title="搜索历史" value="全部删除完成" />
    <van-cell v-for="text in searchHistories" :key="text" :title="text">
      <template #default>
        <van-icon name="close" />
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  props: {
    searchHistories: {
      type: Array,
      // 凡是引用类型的数据，默认值都使用一个函数生成对应的值
      default: () => []
    }
  }
}
</script>

<style scoped></style>
