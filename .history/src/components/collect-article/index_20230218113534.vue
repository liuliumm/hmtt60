<template>
  <van-button
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
    collectId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    async onCollection() {
      if (this.value) {
        await deleteCollections(this.collectId);
      } else {
        await addCollections(this.collectId);
      }
      this.$emit("input", !this.value);
      this.$toast.success(!this.value ? '收藏成功' : '取消收藏')
    },
  },
};
</script>

<style>
.m {
  color: #fffffe6e;
}
</style>