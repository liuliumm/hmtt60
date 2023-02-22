<template>
  <van-button
    v-if="value"
    type="primary"
    size="mini"
    icon="star-o"
    default=" "
    @click="onCollection"
  >
  </van-button>
  <van-button
    v-else
    type="primary"
    size="mini"
    icon="star-o"
    default=" "
    color="#c4bc55"
    @click="onCollection"
  >
  </van-button>
</template>

<script>
import { addCollections, deleteCollections } from "@/api/user";
export default {
  name: "CollectArticle",
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    CollectId: {
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
        await deleteCollections(this.CollectId);
      } else {
        await addCollections(this.CollectId);
      }
      this.$emit("input", !this.value);
    },
  },
};
</script>

<style>
.m {
  color: #c4bc55;
}
</style>