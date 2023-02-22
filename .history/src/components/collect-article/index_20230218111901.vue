<template>
  <van-button
    v-if="value"
    type="primary"
    size="mini"
    icon="star-o"
    
    
    @click="onCollection"
  >
  </van-button>
  <van-button
    v-else
    type="primary"
    size="mini"
    icon="star-o"
    
    @click="onCollection"
  >
  </van-button>
</template>

<script>
import { addCollections, deleteCollections } from "@/api/user";
import { Toast } from "vant";
export default {
  name: "CollectArticle",
  components: {
    Toast
  },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    // CollectId: {
    //   type: [Number, String, Object],
    //   required: true,
    // },
  },
  data() {
    return {};
  },
  methods: {
    async onCollection() {
      if (this.value) {
        await deleteCollections(this.articleId);
      } else {
        await addCollections(this.articleId);
      }
      this.$emit("input", !this.value);
      this.$toast.success(!this.value ? '收藏成功' : '取消收藏')
    },
  },
};
</script>

<style>
.m {
  color: #c4bc55;
}
</style>