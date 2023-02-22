<template>
  <div class="update-gender">
    <van-picker
      title="性别"
      show-toolbar
      :columns="columns"
      :default-index="value"
      @cancel="onCancel"
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
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      columns: ["男", "女"],
    };
  },
  created() {
    console.log(this);
  },
  methods: {
    async onConfirm(value, index) {
      try {
        // 1. 校验表单项是否合法
        // 2. 提交数据给后台存储
        await updateProfile({ gender: index });

        // 3. 提示用户操作成功/失败
        this.$toast.success("修改性别成功");
        // 4. 同步更新主页面
        this.$emit("input", index);
        // 5. 如果是弹层形式的 关闭弹层
        this.$parent.$parent.isUpdateGenderShow = false;
      } catch (error) {
        console.log("error: ", error);
        this.$toast.success("修改性别失败");
      }
    },
    onCancel() {
      this.$parent.$parent.isUpdateGenderShow = false;
    },
  },
};
</script>

<style scoped lang="less">
</style>