<template>
  <div class="search-container">
    <!-- v-model="searchText"  双向绑定searchText
        show-action  显示搜索框右侧取消按钮
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"	输入搜索关键字，敲回车之后触发搜索事件
        @cancel="onCancel" 点击取消按钮，触发cancel事件 -->
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        input-align="center"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    <!-- /搜索栏 -->

    <!-- 搜索历史记录 -->
    <search-history />
    <!-- /搜索历史记录 -->

    <!-- 联想建议 -->
    <search-suggestion />
    <!-- /联想建议 -->

    <!-- 搜索结果 -->
    <search-result />
    <!-- /搜索结果 -->
  </div>
</template>

<script>
// import { ref } from "vue";
import { Toast } from "vant";
import SearchHistory from "./components/search-history";
// import SearchSuggestion from "./components/search-suggestion";
// import SearchResult from "./components/search-result";
export default {
  name: "SearchIndex",
  components: {
    SearchHistory,
    // SearchSuggestion,
    // SearchResult
  },
  data() {
    return {
      searchText: "",
    };
  },
  methods: {
    onSearch(val) {
      //val：输入的关键字
      Toast(val);
    },
    onCancel() {
      Toast("取消");
      this.$router.back(); //返回上一页（首页）
    },
  },
};
</script>

<style scoped lang="less">
// .search-btn{
//     background-color: #1989fa;
// }
</style>