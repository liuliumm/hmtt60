<template>
  <div>
    <van-cell v-for="text in suggestions" :key="text">
      <template #title>
        <van-icon name="search" />
        <!-- <span v-html="highlight2(text)" /> -->
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from "@/api/search";
import { debounce } from "lodash";
export default {
  name: "SearchSuggestion",
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      suggestions: [], // 联想建议数据列表
    };
  },
  watch: {
    //只要searchText发生变化，我们都需要发起请求，显示最新的联想建议（联想建议会随着输入的内容变化而变化），所以我们需要监听searchText的变化，那么就需要使用watch
    // searchText:function(){}
    // searchText(){}
    // searchText: {
    //   // 当 searchText 发生改变的时候就会调用 handler 函数
    //   // 注意：handler 函数名称是固定的
    //   handler(val) {
    //     this.loadSearchSuggestions(val);
    //   },
    //   // deep: true,
    //   // 首次监视触发（如果不添加这个属性，那么handler无法监听到第一次searchText的变化）
    //     immediate: true,  //immediate立即的意思
    // },
    searchText: {
      handler: debounce(function () {
        this.loadSearchSuggestions();
      }, 1000),
      immediate: true,
    },
  },

  methods: {
    async loadSearchSuggestions() {
      try {
        const ret = await getSearchSuggestions({ q: this.searchText }); //这里的大括号表示解构后面的函数传递的值
        // 补充过滤返回空值的处理，视频中没有。
        // 后台返回的列表中有的项为空，导致展示一个空的项，所以此处过滤掉这种数据
        // console.log(ret);
        // it: null 0 是假值会被过滤掉
        this.suggestions = ret.data.data.options.filter((it) => it);
        console.log("11:", this.suggestions);
      } catch (error) {
        console.log("error: ", error);
        // this.$toast("获取失败"); //$toast轻提示
      }
    },
    // async getSearchSuggestion() {
    //   try {
    //     const ret = await getSearchSuggestion({ q: this.searchText })
    //     // 思路1: 修改options数据本身 不使用，原因：将来可能还会使用后台返回的数据本身，现在改了将来不好用，还得存两份数据
    //     // 思路2: 现在仅仅是在显示时候改个呈现，那我们使用函数或者过滤器对数据做一次转换，然后使用转换后的结果进行显示
    //     // it: null 0 是假值会被过滤掉
    //     this.suggestions = ret.data.data.options.filter(it => it)
    //   } catch (error) {
    //     console.log('error: ', error)
    //   }
    // }
  },
};
</script>

<style scoped lang="less"></style>