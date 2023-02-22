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
    <!-- // #给这几个布局添加可以滚动的容器 -->
    <div class="scroll-wrap">
      <comment-item :comment="comment" />
      <!-- /当前评论项 -->

      <van-cell title="全部回复" />

      <!-- 评论的回复列表 -->
      <!-- #传递评论id -->
      <comment-list :source="comment.com_id" type="c" />
    </div>
    <!-- /评论的回复列表 -->
    <!-- 发布评论 -->
    <div class="post-wrap">
      <van-button class="post-btn" size="small" round @click="isPostShow = true"
        >写评论</van-button
      >
    </div>
    <!-- /发布评论 -->
    <!-- 发布评论的弹层，视频里面没有提到，自行补充 -->
    <van-popup v-model="isPostShow" position="bottom">
      <comment-post
        is-reply
        :art_id="articleId"
        :target="comment.com_id"
        @post-success="onPostReply"
      >
      </comment-post>
    </van-popup>
  </div>
</template>

<script>
import CommentItem from "./comment-item";
import CommentList from "./comment-list";
import CommentPost from "../comment-post";
export default {
  name: "CommentReply",
  components: { CommentItem, CommentList, CommentPost },
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  // 子组件接受父组件提供的属性，这种接收不论父子组件嵌套层级多深，都可以拿到数据。
  // 比起属性绑定一层一层往下传看起来更具有灵活性。
  // 但是该技巧不要滥用，它会使重构变得更加困难，同时所提供的 property 是非响应式的。
  // inject: ['articleId'],
  inject: {
    // #这个是选项，与data，props同级
    articleId: {
      type: [Number, String, Object],
      default: null,
    },
  },
  methods: {},
};
</script>

<style scoped lang="less">
.post-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .post-btn {
    width: 60%;
  }
}
.scroll-wrap {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
  //   #可以滚动;
}
</style>
