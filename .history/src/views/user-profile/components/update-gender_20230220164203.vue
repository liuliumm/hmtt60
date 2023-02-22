<template>
  <div class="update-gender">
    <van-picker
      title="性别"
      show-toolbar
      :columns="columns"
      :default-index="value"
      @cancel="onCancel"
      @change="$emit('closeg')"
      @confirm="onConfirm"
      
    />
  </div>
</template>

<script>
import { updateProfile } from "@/api/user";
import { Toast } from "vant";

export default {
  name: "UpdateGender",
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      columns: ["男", "女"],
      onCancel,
      localGender: this.value,
    };
  },
  created() {
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