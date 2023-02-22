<template>
  <van-button
    v-if="isFollowed"
    class="follow-btn"
    round
    size="small"
    @click="onFollow"
    :loading="loading"
  >
    已关注
  </van-button>
  <!-- 按钮添加 loading 的两个作用：
            - 交互反馈
            - 防止网络慢用户多次点击按钮导致重复触发点击事件 -->
  <van-button
    v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    @click="onFollow"
    :loading="loading"
  >
    关注
  </van-button>
</template>

<script>
//将article/index.vue中的此行剪切过来
import { addFollowings, deleteFollowings } from "@/api/user";
export default {
  name: "FollowUser",
  props: {
    userId: {
      type: [Number, String, Object],
      required: true
    },
    // articleId: {
    //   //进入此界面必须传递文章id
    //   type: [Number, String, Object],
    //   required: true,
    // },
    value: {
      type: Boolean,
      required: true,
    },
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async onFollow() {
      this.loading = true; // 展示关注按钮的 loading 状态
      try {
        if (this.value) {
          // 已关注，取消关注
          await deleteFollowings(this.userId);
          // this.article.is_followed = false
        //   console.log("res", res);
        } else {
          // 没有关注，添加关注
          await addFollowings(this.userId);
          // this.article.is_followed = true
        }

        // 更新视图状态
        // this.article.is_followed = !this.is_followed;
        // this.$emit('update-is_followed', !this.isFollowed)
        this.$emit('input', !this.value) 
      } catch (err) {
        console.log(err);
        let message = "操作失败，请重试！";
        if (err.response && err.response.status === 400) {
          //如果是400错误，则是关注自己的结果
          message = "你不能关注你自己！";
        }
        this.$toast(message);
      }
      this.loading = false; // 展示关注按钮的 loading 状态
    },
  },
};
</script>

<style>
</style>