<template>
  <div ref="comment-list" class="comment-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      v-model.sync:error="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <!-- reply-click监听处理 -->
      <comment-item
        v-for="(item, index) in list"
        :comment="item"
        :key="index"
        :title="item.content"
        @reply-click="$emit('reply-click', $event)"
      />
    </van-list>
  </div>
</template>
分页总结：
    pageNum 页码，pageSize 每页条目数
    page	页码，perPage  每页条目数
    timestamp 时间戳 ， 每页条目数服务器控制
    offset 获取下一页数据的标记 ， limit 每页限制显示多少条

<script>
import { getComments } from "@/api/comment";
import CommentItem from "./comment-item";
export default {
  name: "CommentList",
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false,
      offset: null, // 获取下一页数据的标记 (分页，从哪开始取这页数据)
      limit: 10, // (分页，每页多少条)
    };
  },
  components: {
    CommentItem,
  },
  props: {
    source: {
      type: [Number, String, Object],
      require: true,
    },
    list: {
      type: Array,
      // default，默认值，如果是数组或者对象，需要通过函数的形式返回
      default: () => [],
      // 1. 传递 使用传递过来的数据
      // 2. 不传递 使用默认值
      // required: true // 如果有默认值，就不需要再声明必传，所以required和default不会同时声明
    },
    // 增加type参数，默认值为a，取值范围只能是a或者c
    type: {
      type: String,
      // 自定义 Prop 数据验证
      validator(value) {
        return ["a", "c"].includes(value);
      },
      default: "a",
    },
  },
  created() {
    // 页面一加载就获取评论数量
    this.onLoad();
  },
  methods: {
    async onLoad() {
      try {
        // 异步更新数据
        const { data } = await getComments({
          type: "a", //评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.source.toString(), // 源id，文章id或评论id(特别注意：需要手动加上toString()，否则会在source的值两边加上双引号，导致id不是一个有效的整形)
          offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          limit: this.limit, // 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
        });
        // 2. 将数据添加到列表中
        const { results } = data.data;
        console.log("Comments", results);
        this.list.push(...results);
        // 将获取到文章评论数据后传递给父组件
        this.$emit("onload-success", data.data);
        // 加载状态结束
        this.loading = false;
        //  4. 数据加载完成，判断是否还有数据
        if (results.length) {
          // 有就更新获取下一页的数据页码
          this.offset = data.data.last_id;
        } else {
          // 没有就将 finished 设置结束
          this.finished = true;
        }
      } catch (error) {
        this.error = true;
        this.loading = false; // 加载状态结束
      }
    },
  },
};
</script>

<style scoped lang="less">
</style>