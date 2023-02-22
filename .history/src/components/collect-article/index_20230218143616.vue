<template>
  <!-- <van-button
    v-if="value"    
    icon="star"
    color="#ffa500"    
    @click="onCollection"
  >
  </van-button>
  <van-button
    v-else
    icon="star-o"   
    @click="onCollection"
  >
  </van-button> -->
  <!-- //根据收藏状态，显示不同的五角星  -->
  <van-button
    :icon="value ? 'star' : 'star-o'"
    :class="{  
        // 定义的原生属性名，大括号是变量。v-bind:属性名='vue变量'，还可以是自定义属性名
      collected: value, //根据收藏状态，应用.collected样式
    }"
    :loading="loading"
    @click="onCollect"
  />
</template>

<script>
import { addCollections, deleteCollections } from "@/api/user";
import { Toast } from "vant";
export default {
  name: "CollectArticle",
  components: {
    Toast,
  },
  data() {
    return {
      loading: false,
    };
  },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    //collectId: {
    //  type: [Number, String, Object],
    // required: true,
    //},
    articleId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  methods: {
    // async onCollection() {
    //   if (this.value) {
    //     await deleteCollections(this.collectId);
    //   } else {
    //     await addCollections(this.collectId);
    //   }
    //   this.$emit("input", !this.value);
    //   this.$toast.success(!this.value ? "收藏成功" : "取消收藏");
    // },
    async onCollect() {
      // 开始请求
      this.loading = true;
      try {
        // 是否收藏
        if (this.value) {
          // 父组件 传递articleId
          await deleteCollections(this.articleId);
        } else {
          await addCollections(this.articleId);
        }
        // 更新视图
        this.$emit("input", !this.value);
        // 自定义事件修改数据并不是立即的，所以这里也是!this.value
        this.$toast.success(!this.value ? "收藏成功" : "取消收藏");
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
.collected {
  .van-icon {
    color: #ffa500;
  }
}
</style>