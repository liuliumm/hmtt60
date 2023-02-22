<template>
  <div class="update-gender">
    <van-picker
      title="性别"
      show-toolbar
      :columns="columns"
      @cancel="onCancel"
      @click-left="$emit('closeg')"
      @click-right="onConfirm"
    />
  </div>
</template>

<script>
import { Toast } from "vant";

export default {
  name: "UpdateGender",
  data() {
    return {
      columns: ["男", "女"],
      onCancel,
    };
  },
  created () {
    console.log(this);
  },
  methods: {
    async loadupdateGender() {
      const columns = ["男", "女"];

      const onConfirm = (value, index) => {
        Toast(`当前值: ${value}, 当前索引: ${index}`);
      };
      
      const onCancel = () => Toast("取消");
    },
  },
};
</script>

<style>
</style>