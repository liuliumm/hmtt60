<template>
  <van-button
    :icon="value === 1 ? 'good-job' : 'good-job-o'"
    :class="{ liking: value === 1 }"
    @click="onlike"
    :loading="loading"
  >
  </van-button>
</template>
// article 中的 `attitude` 表示用户对文章的态度

// - `-1` 无态度
// - `0` 不喜欢
// - `1` 已点赞
<script>
import { addLikings, deleteLikings } from "@/api/user";
import { Toast } from "vant";
export default {
  name: "LikingArticle",
  data() {
    return { loading: false };
  },
  components: {
    Toast,
  },
  props: {
    value: {
      type: Number,
      required: true,
    },
    articleId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  methods: {
    async onlike() {
      // 开始请求
      this.loading = true;
      try {
        let status = -1;
        if (this.value === 1) {
          await deleteLikings(this.articleId);
        } else {
          await addLikings(this.articleId);
          status = 1;
        }
        console.log("like:", status);
        this.$emit("input", status);
        this.$toast.success(status === 1 ? "点赞成功" : "取消点赞");
      } catch (err) {
        this.$toast.fail("操作失败，请重试");
      }
      // 请求结束
      this.loading = false;
    },
  },
};
</script>

<style scoped lang="less">
.liking {
  .van-icon {
    color: #ff3300;
  }
}
</style>