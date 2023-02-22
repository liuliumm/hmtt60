<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-show="isDeleteShow">
        <!-- //如果isDeleteShow为true显示此模板 -->
        <span @click="$emit('clear-search-history')">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDeleteShow = false">完成</span>
        <!-- //点击完成退出删除状态 -->
      </div>
      <!-- //如果isDeleteShow为false，则显示删除按钮。点击删除按钮将isDeleteShow变为true，进入删除状态 -->
      <van-icon v-show="!isDeleteShow" name="delete" @click="isDeleteShow = true" />
    </van-cell>
    <van-cell
      :title="text"
      v-for="(text, index) in searchHistories"
      :key="index"
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
  data() {
    return {
      // 定义当前是否是删除状态
      isDeleteShow: false, // 控制删除显示状态
    };
  },
  props: {
    searchHistories: {
      type: Array,
      // 凡是引用类型的数据，默认值都使用一个函数生成对应的值
      default: () => [],
      required: true,
    },
  },
  methods: {
    onSearchItemClick(text,index) {
      // 如果是删除状态，则执行删除操作
      if (this.isDeleteShow) {
        console.log(this.searchHistories)

        this.searchHistories.splice(index, 1);
        console.log(this.searchHistories)
      } else {
        // 否则执行搜索操作
        this.$emit("search", text);
      }
    },
  },
};
</script>

<style scoped lang="less"></style>
</style>