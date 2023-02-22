<template>
  <div class="comment-reply">
    <!-- 导航栏 -->
    <van-nav-bar
      :title="
        comment.reply_count > 0 ? `${comment.reply_count}条回复` : '暂无回复'
      "
    >
      <!-- #控制弹出显示与否的属性是在父组件中 -->
      <van-icon slot="left" name="cross" @click="$emit('close')" />
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 当前评论项 -->
    <comment-item :comment="comment" />
    <!-- /当前评论项 -->
  </div>
</template>

<script>
import CommentItem from "./comment-item";
export default {
  name: "CommentReply",
  components: { CommentItem },
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  methods: {},
};
</script>

<style scoped></style>
