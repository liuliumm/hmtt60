<template>
  <div>
    <van-picker
      title="性别"
      :columns="columns"
      @cancel="onCancel"
      @click-left="$emit('close')"
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
      columns,

      onCancel,
    };
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