<template>
  <div>
    <div class="article-list">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <!-- // 父子组件都需要修改error的值，所以需要添加sync -->
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          :error.sync="error"
          error-text="请求失败，点击重新加载"
          @load="onLoad"
        >
          <van-cell v-for="item in list" :key="item" :title="item" />
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { getArticles } from "@/api/article";
export default {
  name: "ArticleList",
  created () {
    // this.loadArticles();
  },
  props: {
    channel: {
      type: Object,
      required: true, // 表示前端必须传参数
      // 如果没有加 required:true，那么就算父组件没有给子组件传值，子组件也就是空，不会报错
      // 只要在组件上写了这个字段及为传值，传空也是传了null值，不写才会报错
    },
  },
  data() {
    return {
      list: [],// 文章列表数据
      loading: false,// 上拉加载更多的 loading 状态
      finished: false,// 是否加载结束
      refreshing: false,
      error: false, // 是否加载失败
      timestamp: null // 请求下一页数据的时间戳
    };
  },
  methods: {
    async onLoad() {
        try {
    //   console.log("onLoad");
            const article = await getArticles();
            console.log(article);
        }catch(err){
            console.log(err)
        }

      setTimeout(() => {
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        }

        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        this.loading = false;

        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
   
  },
};
</script>

<style>
</style>