<template>
  <div>
    <div class="article-list">
      <van-pull-refresh
        :success-text="refreshSuccessText"
        :success-duration="1500"
        v-model="isRefreshLoading"
        @refresh="onRefresh"
      >
        <!-- // 父子组件都需要修改error的值，所以需要添加sync -->
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          :error.sync="error"
          error-text="请求失败，点击重新加载"
          @load="onLoad"
        >
          <ArticleItem
            v-for="(article, id) in list"
            :key="id"
            :article="article"
          />
          <!-- </ArticleItem> -->
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { getArticles } from "@/api/article";
import ArticleItem from "@/components/article-item";
export default {
  name: "ArticleList",
  props: {
    channel: {
      type: String,
      required: true, // 表示前端必须传参数
      // 如果没有加 required:true，那么就算父组件没有给子组件传值，子组件也就是空，不会报错
      // 只要在组件上写了这个字段及为传值，传空也是传了null值，不写才会报错
    },
  },
  components: {
    ArticleItem
  },
  data() {
    return {
      list: [], // 文章列表数据
      loading: false, // 上拉加载更多的 loading 状态
      finished: false, // 是否加载结束
      refreshing: false,
      error: false, // 是否加载失败
      timestamp: null, // 请求下一页数据的时间戳
      // 控制下拉刷新的失败状态
      isRefreshLoading: false,
      refreshSuccessText: "",
    };
  },
  methods: {
    async onLoad() {
      try {
        //   console.log("onLoad");
        // const ref = await getArticles()
        // console.log("-2", ref);
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道 id
          // 你可以把 timestamp 理解为页码
          // 如果请求第1页数据：当前最新时间戳 Date.now
          // 如果请求之后的数据，使用本次接口返回的数据中的 pre_timestamp
          timestamp: this.timestamp || Date.now(), // 时间戳，请求最新数据传当前的时间戳，请求某一刻的数据就传递具体的一个时间戳
          with_top: 1, // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        });
        console.log("-1", data);
        const { results } = data.data;
        console.log("0", data.data);
        console.log("1", results);
        this.list.push(...results);
        this.loading = false;
        console.log("2", results);
      } catch (err) {
        console.log(err);
      }

      //   setTimeout(() => {
      //     if (this.refreshing) {
      //       this.list = [];
      //       this.refreshing = false;
      //     }

      //     for (let i = 0; i < 10; i++) {
      //       this.list.push(this.list.length + 1);
      //     }
      //     this.loading = false;

      //     if (this.list.length >= 40) {
      //       this.finished = true;
      //     }
      //   }, 1000);
    },
    async onRefresh() {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道 id
          timestamp: Date.now(), // 下拉刷新每次都应该获取最新数据
          with_top: 1, // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        });
        const { results } = data.data;
        this.list.unshift(...results);

        // 3. 关闭下拉刷新的 loading 状态
        this.isRefreshLoading = false;

        // 更新下拉刷新成功提示的文本
        this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`;
      } catch (err) {
        this.refreshSuccessText = "刷新失败";
        this.isreFreshLoading = false; // 关闭下拉刷新的 loading 状态
      }
    },
    //   // 清空列表数据
    //   this.finished = false;

    //   // 重新加载数据
    //   // 将 loading 设置为 true，表示处于加载状态
    //   this.loading = true;
    //   this.onLoad();
    // },
  },
};
</script>

<style>
.article-list{
    height: 79vh;
    overflow-y: auto;
}
</style>