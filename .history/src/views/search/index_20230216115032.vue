<template>
  <div class="search-container">
    <!-- v-model="searchText"  双向绑定searchText
        show-action  显示搜索框右侧取消按钮
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"	输入搜索关键字，敲回车之后触发搜索事件
        @cancel="onCancel" 点击取消按钮，触发cancel事件 -->
    <van-search
      v-model="value"
      show-action
      placeholder="请输入搜索关键词"
      background="#3296fa"
      input-align="center"
      class="search-btn"
      @search="onSearch"
      @cancel="onCancel"
    />
  </div>
</template>

<script>
import { ref } from "vue";
import { Toast } from "vant";
export default {
  name: "SearchIndex",
  data() {
    return {
      searchText: "",
    };
  },
  setup() {
    const value = ref("");
    const onSearch = (val) => //val：输入的关键字
        Toast(val);
    const onCancel = () => 
        Toast("取消");
        this.$router.back() //返回上一页（首页）
    return {
      value,
      onSearch,
      onCancel,
    };
  },
};
</script>

<style scoped lang="less">
// .search-btn{
//     background-color: #1989fa;
// }
</style>