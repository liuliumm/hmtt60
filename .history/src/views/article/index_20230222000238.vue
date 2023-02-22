<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="onClickLeft"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="isloading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="article.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">
            <!-- 全局过滤器：处理相对时间 {{time | relativeTime}} -->
            {{ article.pubdate | relativeTime }}
          </div>
          <!-- <van-button
            v-if="article.is_followed"
            class="follow-btn"
            round
            size="small"
            @click="onFollow"
            :loading="followLoading"
          >
            已关注
          </van-button> -->
          <!-- 按钮添加 loading 的两个作用：
            - 交互反馈
            - 防止网络慢用户多次点击按钮导致重复触发点击事件 -->
          <!-- <van-button
            v-else
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            @click="onFollow"
            :loading="followLoading"
          >
            关注
          </van-button> -->

          <!-- <follow-user
            class="follow-btn"
            :is-followed="article.is_followed"
            :user-id="article.aut_id"
            @update-is_followed="article.is_followed = $event"
          /> -->
          <!--
模板中的 $event 是事件参数
当我们传递给子组件的数据既要使用还要修改。
传递：props
	:is-followed="article.is_followed"
修改：自定义事件
	@update-is_followed="article.is_followed = $event"
简写方式：在组件上使用 v-model（以下俩句代码是v-model的原理）
	value="article.is_followed"
	@input="article.is_followed = $event"
-->
          <follow-user
            class="follow-btn"
            v-model="article.is_followed"
            :user-id="article.aut_id"
          />

          <!-- /* v-model 相当于以下操作 */ -->

          <!-- <follow-user
            class="follow-btn"
            :value.sync="article.is_followed"
            @input="article.is_followed = $event"
            :user-id="article.aut_id"
          ></follow-user> -->

          <!-- // update:value -->

          <!-- <van-button
            class="follow-btn"
            round
            size="small"
          >已关注</van-button> -->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          ref="imgAll"
          v-html="article.content"
        ></div>
        <van-divider>正文结束</van-divider>
        <!-- 底部区域 -->
        <!-- 文章评论  这里的$event就是子组件传递过来的参数data.data-->
        <CommentList
          :source="article.art_id"
          @onload-success="totalCommentCount = $event.total_count"
          :article-id="article.art_id"
          ref="CommentIcon"
        />
        <!-- 写评论 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="isPostShow = true"
            >写评论</van-button
          >

          <!-- 写评论 -->
          <!-- 不设置高度的时候，内容会自动撑开弹层高度 -->
          <van-popup v-model="isPostShow" position="bottom"> 123 </van-popup>
          <!-- 评论图标 -->
          <van-icon
            name="comment-o"
            :badge="totalCommentCount"
            color="#777"
            @click="
              $refs.CommentIcon.$refs['comment-list'].scrollIntoView({
                behavior: 'smooth',
              })
            "
          />
          <!-- 文章评论  这里的$event就是上方传递过来的参数data.data-->
          <!-- <article-comment
            @onload-success="totalCommentCount = $event"
            :article-id="article.art_id"
          /> -->
          <!-- 评论的回复 -->

          <!-- 评论的回复 -->
          <!-- /文章评论 -->
          <!-- <CollectArticle
            v-model="article.is_collected"
            :collect-id="article.aut_id"
          /> -->
          <!-- 收藏 -->
          <collect-article
            class="btn-item"
            v-model="article.is_collected"
            :article-id="article.art_id"
          />
          <!-- <van-icon color="#777" name="star-o" /> -->
          <!-- 点赞 -->
          <liking-article
            class="btn-item"
            v-model="article.attitude"
            :article-id="article.art_id"
          >
            <!-- @update-is_liked="article.is_liked = $event"
                  value="article.is_liked"
	                @input="article.is_likwed = $event" 
                  v-model="article.is_liked"        -->
          </liking-article>
          <!-- <van-icon color="#777" name="good-job-o" /> -->
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errStatus === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div v-else class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArticle">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
  </div>
</template>

<script>
import { getArticleById } from "@/api/article.js";
import { ImagePreview } from "vant";
// import { addFollowings, deleteFollowings } from "@/api/user";
import FollowUser from "@/components/follow-user";
import CollectArticle from "@/components/collect-article";
import LikingArticle from "@/components/like-article";
import CommentList from "./components/comment-list";
import json_parse from "json-bigint/lib/parse";
// ImagePreview({
// images: [//图片预览的数组，这里有几张图片，就可以在图片预览这几张图片
"https://img.yzcdn.cn/vant/apple-1.jpg",
  "https://img.yzcdn.cn/vant/apple-2.jpg";
// ],
// 预览图片的起始位置
// startPosition: 1,
// 点击关闭
// onClose () {
// do something
// }
// })
export default {
  name: "ArticleIndex",
  components: {
    FollowUser,
    CollectArticle,
    LikingArticle,
    CommentList,
  },
  props: {
    articleId: {
      //进入此界面必须传递文章id
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      article: {}, // 文章详情
      isloading: false, // 文章加载状态
      errStatus: "", // 请求异常状态
      followLoading: false, //加载
      totalCommentCount: 0, // 标记 评论总数量
      isPostShow: false, // 评论弹层
    };
  },
  //   created () {
  //       this.$route.params.articleId
  //       this.$route
  //   }
  created() {
    this.loadArticle();
  },
  setup() {
    const onClickLeft = () => history.back();
    return {
      onClickLeft,
    };
  },
  methods: {
    // async onFollow() {
    //   this.followLoading = true; // 展示关注按钮的 loading 状态
    //   try {
    //     if (this.article.is_followed) {
    //       // 已关注，取消关注
    //       const res = await deleteFollowings(this.article.aut_id);
    //       // this.article.is_followed = false
    //       console.log("res", res);
    //     } else {
    //       // 没有关注，添加关注
    //       await addFollowings(this.article.aut_id);
    //       // this.article.is_followed = true
    //     }

    //     // 更新视图状态
    //     this.article.is_followed = !this.article.is_followed;
    //   } catch (err) {
    //     console.log(err);
    //     let message = "操作失败，请重试！";
    //     if (err.response && err.response.status === 400) {
    //       //如果是400错误，则是关注自己的结果
    //       message = "你不能关注你自己！";
    //     }
    //     this.$toast(message);
    //   }
    //   this.followLoading = false; // 展示关注按钮的 loading 状态
    // },
    async loadArticle() {
      try {
        // 随机错误
        if (Math.random() > 0.5) {
          return json_parse("error");
        }
        const { data } = await getArticleById(this.articleId);
        this.article = data.data;
        // console.log(this.article);
        // setTimeout(() => {
        //   this.previewImg();
        // });
      } catch (error) {
        // 加载失败 404
        // if (err.response && err.response.status === 404) {
        //   this.errStatus = 404;
        if (error?.response?.status === 404) {
          this.error = 404;
        }
        this.$toast("获取失败");
        console.log("抱歉请求出错", error);
      }
      // 加载完成
      this.isLoading = false;
    },
    previewImg() {
      const allImg = this.$refs["imgAll"].querySelectorAll("img");
      //   console.log("allImg:", allImg);
      const imgList = [];
      allImg.forEach((img, index) => {
        // console.log("img:", img.src);
        imgList.push(img.src);
        // console.log( imgList);
      });
      //   img.onclick = function () {
      ImagePreview({
        images: imgList,
        startPosition: 0,
        // 点击关闭
        onClose() {
          // do something
        },
      });
      //   };
    },
  },
};
</script>
<style scoped lang="less">
@import "./github-markdown.css";
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    /deep/ .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>