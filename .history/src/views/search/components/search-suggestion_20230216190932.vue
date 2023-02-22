<template>
  <div class="search-suggestion">
    <van-cell
      v-for="(text, index) in suggestions"
      :key="index"
      :title="text"
      icon="search"
    >
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from "@/api/search";
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
        this.loadSearchSuggestions(val);
      },
      // deep: true,
      // 首次监视触发（如果不添加这个属性，那么handler无法监听到第一次searchText的变化）
      //   immediate: true,  //immediate立即的意思
    },
  },
  data() {
    return {
      suggestions: [], // 联想建议数据列表
    };
  },
  methods: {
    async loadSearchSuggestions(q) {
      try {
        const { data } = await getSearchSuggestions(q); //这里的大括号表示解构后面的函数传递的值
        // 补充过滤返回空值的处理，视频中没有。
        // 后台返回的列表中有的项为空，导致展示一个空的项，所以此处过滤掉这种数据
        console.log(data);
        this.suggestions = data.data.options.filters(it => it);
      } catch {
        this.$toast("获取失败"); //$toast轻提示
      }
    },
  },
};
</script>

<style scoped lang="less"></style>
</style>