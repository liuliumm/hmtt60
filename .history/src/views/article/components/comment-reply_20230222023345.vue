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
      <!-- 将事件处理函数拿到的数据传递给对应的渲染组件 -->
      <comment-list :source="comment.com_id" type="c" :list="commentList" />
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
        :articleId="articleId"
        :target="comment.com_id"
        @post-success="onPostSuccess"
      >
      </comment-post>
    </van-popup>
  </div>
</template>
因为评论列表组件是复用，当评论项组件调用评论列表时，只会加载一次，就造成回复的评论只显示第一次加载的数据，点击后面回复的评论时，数据不更新，想要数据更新，就需要将评论列表组件再次调用。
有两个方法：
1、将整个评论项组件关闭，每当点击回复的评论时，就通过一次新的父子传值，将整个组件调用渲染一次。
但是这种方法比较浪费性能，我们只需要更新回复评论列表组件数据，而不需要将整个组件销毁再调用。这时我们想到了watch侦听属性。它可以监听数据的变化。
所以我们可以数据写在watch里面，同时利用ref获取组件的方法。
因为先是声明弹层打开语句=> 弹层打开 => 内部元素/组件一个一个渲染，如果我们在这里使用watch的完整写法，并使用immediate: true，$nextTick()获取列表数据，会导致还没渲染，就侦听到了变化，组件来不及渲染，就会出错，所以这里使用简略写法，弹层再次打开时(第一次打开时不需要执行，因为再created里面调用了onload()方法)：同时先把以前的list数据清空（因为onload()里面数据是累加的，防止数据重复），再重新执行onLoad去拿数据。并且因为offset在data中声明了，会导致后面二次加载时累加的数据会包含在偏移量里面，导致此次数据显示不全，所以要清空offset。（不要忘记offset不是只想之前的onload，而是指向$refs获取的列表数据）。
这样可以组件复用，数据多次获取。减少数据重排，页面重绘。可以提高响应速度，提高性能。
<script>
import CommentItem from "./comment-item";
import CommentList from "./comment-list";
import CommentPost from "./comment-post";
export default {
  name: "CommentReply",
  components: { CommentItem, CommentList, CommentPost },
  data() {
    return {
      list: [], // 标记 回复列表
      isPostShow: false, // 控制 发布回复弹层 是否显示
    };
  },
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
  watch: {
    // 第一次赋值就要监听，加immediate
    // isReplyShow: {
    //   // isReplyShow: true => 弹层打开 => 内部元素/组件一个一个渲染
    //   handler(val) {
    //     console.log('---收到 isReplyShow 的新值: ', val)
    //     // 在这里 去让comment-list 执行 onLoad
    //     this.$nextTick(() => {
    //       this.$refs['comment-list'].onLoad()
    //     })
    //   },
    //   immediate: true
    // },
    isReplyShow(val) {
      // [后续]弹层再次打开时(第一次打开时不需要执行)：先把以前的list数据清空，再重新执行onLoad去拿数据
      if (val) {
        this.$nextTick(() => {
          this.list = []
          this.$refs['comment-list'].offset = null
          this.$refs['comment-list'].onLoad()
        })
      }
    }
  },
  methods: {
    onPostSuccess(data) {
      console.log(123, data);

      // 更新回复的数量
      this.comment.reply_count++;

      // 关闭弹层
      this.isPostShow = false;

      // 将最新回复的内容展示到列表的顶部
      this.commentList.unshift(data.new_obj);
    },
  },
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
