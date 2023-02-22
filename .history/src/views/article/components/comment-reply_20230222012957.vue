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

    <van-cell title="全部回复" />

    <!-- 评论的回复列表 -->
    <!-- #传递评论id -->
    <comment-list :source="comment.com_id" type="c" />
    <!-- /评论的回复列表 -->
  </div>
</template>

<script>
import CommentItem from "./comment-item";
import CommentList from "./comment-list";
export default {
  name: "CommentReply",
  components: { CommentItem, CommentList },
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
