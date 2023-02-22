<template>
  <div class="search-container">
    <!-- v-model="searchText"  双向绑定searchText
        show-action  显示搜索框右侧取消按钮
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"	输入搜索关键字，敲回车之后触发搜索事件
        @cancel="onCancel" 点击取消按钮，触发cancel事件 -->
    <form action="/" class="form-search">
      <van-search
        v-model.trim="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @focus="isResultShow = false"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    <!-- /搜索栏 -->

    <!-- 绑定条件渲染 -->
    <!-- 搜索结果 -->
    <search-result :search-text="searchText" v-if="isResultShow" />
    <!-- /搜索结果 -->
    <!-- 联想建议 -->
    <search-suggestion
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
    />
    <!-- /联想建议 -->
    <!-- 搜索历史记录 -->
    <!-- 在这里监听子组件的事件clear-search-history， -->
    <!-- 不同于组件和 prop，事件名不存在任何自动化的大小写转换。
    而是触发的事件名需要完全匹配监听这个事件所用的名称。 -->
    <search-history
      :search-histories="searchHistories"
      v-else
      @clear-search-history="searchHistories = []"
      @search="onSearch"
    />
    <!-- /搜索历史记录 -->
  </div>
</template>

<script>
// import { ref } from "vue";
import { Toast } from "vant";
import SearchHistory from "./components/search-history";
import SearchSuggestion from "./components/search-suggestion";
import SearchResult from "./components/search-result";
import { getItem, setItem } from "@/utils/storage";
export default {
  name: "SearchIndex",
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult,
  },
  data() {
    return {
      searchText: "",
      isResultShow: false, // 用来控制搜索结果的显示状态
      // searchHistories: [], // 存储历史记录  (当发生搜索的时候我们才需要记录历史记录)
      searchHistories: getItem("TOUTIAO_SEARCH-HISTORIES") || [],
    };
  },
  watch: {  //数据持久化处理
  // 将存储历史记录的列表里的值发送到token，并存储。页面刷新时在data中定义的该列表中获取
    searchHistories(value) {
      setItem("TOUTIAO_SEARCH-HISTORIES", value);
    },
  },
  methods: {
    onSearch(val) {
      //val：输入的关键字
      // Toast(val);
      this.searchText = val; //将搜索框中的内容改为传递过来的内容
      this.isResultShow = true;
      // 存储搜索历史记录
      // 要求：不要有重复历史记录、最新的排在最前面
      const index = this.searchHistories.findIndex((it) => it === val);
      if (index >= 0) {
        //如果重复，则先删除，然后再头部再添加
        this.searchHistories.splice(index, 1);
      }
      this.searchHistories.unshift(val); //在头部添加
      this.searchHistories = this.searchHistories.slice(0, 10);
      // 渲染搜索结果
      // this.isResultShow = true;
    },
    onCancel() {
      Toast("取消");
      // this.$router.back(); //返回上一页（首页）
    },
  },
};
</script>

<style scoped lang="less">
// .search-btn{
//     background-color: #1989fa;
// }
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .form-search {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>