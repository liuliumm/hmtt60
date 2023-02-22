<template>
  <div>
    <van-cell
      @click="$emit('search', text)"
      v-for="text in suggestions"
      :key="text"
    >
      <template #title>
        <van-icon name="search" />
        <!-- <span v-html="highlight2(text)" /> -->
      </template>
    </van-cell>
  </div>
</template>

<script>
// 1. text文本 要显示高亮飘红的样式，必须是html片段
// 2. 把html片段显示到页面中
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
      suggestions: [],
    };
  },
  watch: {
    // searchText: {
    //   immediate: true,
    //   // 定义在函数内的变量是局部变量
    //   // 两次执行同一个函数，第2次还能拿到第1次函数内的局部变量吗？ x 所以用组件实例this来做中介媒介来存储上一次的定时器
    //   handler: function () {
    //     console.log(111)
    //     clearTimeout(this.timerId)

    //     this.timerId = setTimeout(() => {
    //       this.getSearchSuggestion()
    //     }, 1000)

    //     console.log('-timerId: ', this.timerId)
    //   }
    // },
    // 本来: 每次用户输入 都对应执行请求逻辑
    // 目标: 当用户输入稳定后，再执行请求逻辑
    // 思路: 发现要做的事，执行的请求逻辑是固定不变的，只是什么时间执行，所以先找到执行逻辑的代码: handler: function() {}
    // 防抖借助了lodash的debounce函数，第一个参数就是要做的逻辑，把handler的函数传给它，第二个参数就是等待的时间
    searchText: {
      handler: debounce(function () {
        this.getSearchSuggestion();
      }, 1000),
      immediate: true,
    },
  },
  methods: {
    // 实现方案1: 正则, 判断一个字符串是否有符合要求的匹配 1 匹配 2 替换
    // 第1步: 'abc' => '<em style="color: red;">a</em>bc'
    highlight(text) {
      // 数组字面量: [1, 2, 3] 可以很方便的定义出一个数组，但是不能解决灵活定制的情况，比如根据某个数据变量len，生成一个数组，len变量可能是3也可能是5, 此时用数组字面量就搞不定了，因为它无法接收参数定制，需要使用构造函数 new Array(len)
      // 类似同理, 正则字面量也无法接受变量，使用构造函数

      // 第2步：高亮的内容 得是用户输入的内容，不能固定是a
      // const reg = /a/gi => 切换到构造函数的实现方式上
      // Date
      const reg = new RegExp(this.searchText, "gi");
      console.log("---reg: ", reg);
      // const reg1 = /([a-zA-Z]+)-(\d{3,})/
      // 'abc-123'
      const str = text.replace(reg, function ($0) {
        console.log("$0: ", $0);
        return '<span style="color: red;">' + $0 + "</span>";
      });

      console.log("str: ", str);
      return str;
    },
    // 实现方案2：使用数组join和字符串split方法
    // 2.1 先将来字符串按照输入关键词分割成数组(形成效果: 没有关键词的数组项)
    // 2.2 再用目标字符串(包含高亮样式的关键词) 把数组拼起来
    highlight2(text) {
      // null.split 错误：null和undefined 这两个没有任何属性和方法，对它们取属性就会报类型错误TypeError
      const arr = text.split(this.searchText);
      return arr.join(`<span style='color: red;'>${this.searchText}</span>`);
    },
    async getSearchSuggestion() {
      try {
        const ret = await getSearchSuggestions({ q: this.searchText });
        // 思路1: 修改options数据本身 不使用，原因：将来可能还会使用后台返回的数据本身，现在改了将来不好用，还得存两份数据
        // 思路2: 现在仅仅是在显示时候改个呈现，那我们使用函数或者过滤器对数据做一次转换，然后使用转换后的结果进行显示
        // it: null 0 是假值会被过滤掉
        this.suggestions = ret.data.data.options.filter((it) => it);
        console.log(this.suggestions);
      } catch (error) {
        console.log("error: ", error);
      }
    },
  },
};
</script>

<style scoped></style>
