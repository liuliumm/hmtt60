<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <!-- //如果isDeleteShow为true显示此模板 -->
        <span @click="$emit('clear-search-history')">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDeleteShow = false">完成</span>
        <!-- //点击完成退出删除状态 -->
      </div>
      <!-- //如果isDeleteShow为false，则显示删除按钮。点击删除按钮将isDeleteShow变为true，进入删除状态 -->
      <van-icon v-else name="delete" @click="isDeleteShow = true" />
    </van-cell>
    <van-cell
      :title="text"
      v-for="text in searchHistories"
      :key="text"
      @click="onSearchItemClick(text)"
    >
      <template #default>
        <van-icon v-show="isDeleteShow" name="close" />
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
      // 凡是引用类型的数据，默认值都使用一个函数生成对应的值
      default: () => [],
      required: true,
    },
  },
  methods: {
    onSearchItemClick(text) {
      // 如果是删除状态，则执行删除操作
      if (this.isDeleteShow) {
        this.searchHistories.splice(index, 1);
      } else {
        // 否则执行搜索操作
        this.$emit("search", item);
      }
    },
  },
};
</script>

<style scoped lang="less"></style>
</style>