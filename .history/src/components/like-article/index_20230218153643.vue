<template>
  <van-button
    :icon="value === 1 ? 'good-job' : 'good-job-o'"
    :class="{ liking: value === 1 }"
    @click="onlike"
  >
  </van-button>
</template>

<script>
import { addLikings, deleteLikings } from "@/api/user";
import { Toast } from "vant";
export default {
  name: "LikingArticle",
  data() {
    return {};
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
      let status = -1
      if (this.value === 1) {
        await deleteLikings(this.articleId);
      } else {
        await addLikings(this.articleId);
        status = 1
      }
      console.log("like:", status);
      this.$emit("input", status);
      this.$toast.success(status === 1 ? "点赞成功" : "点赞失败");
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