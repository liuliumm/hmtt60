<template>
  <van-button
    :icon="value ? 'good-job-o' : 'good-job'"
    :class="{ liking: value }"
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
      type: boolean,
      required: true,
    },
    articleId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  methods: {
    async onlike() {
      if (this.value) {
        await deleteLikings(this.articleId);
      } else {
        await addLikings(this.articleId);
      }
      this.$emit("input", !this.value);
      this.$toast.success(!this.value ? "点赞成功" : "点赞失败");
    },
  },
};
</script>

<style>
</style>