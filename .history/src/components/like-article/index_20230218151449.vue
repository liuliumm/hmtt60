<template>
  <van-button
    :icon="value ? 'good-job' : 'good-job-o'"
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
      type: Boolean,
      required: true,
    },
    likingId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  methods: {
    async onlike() {
      if (this.value) {
        await deleteLikings(this.likingId);
      } else {
        await addLikings(this.likingId);
      }
      this.$emit("input", !this.value);
      this.$toast.success(!this.value ? "点赞成功" : "点赞失败");
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