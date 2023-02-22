<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      show-toolbar
      @cancel="onCancel"
      @confirm="onConfirm"
      type="date"
      title="选择生日"
      :min-date="minDate"
      :max-date="maxDate"
    />
  </div>
</template>

<script>
import { updateProfile } from "@/api/user";
export default {
  name: "UpdateBirthday",
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  methods: {
    async onConfirm() {
        await updateProfile({ birthday:this.currentDate });
        this.$emit("input", this.currentDate);
    },
    onCancel() {
      this.$parent.$parent.isUpdateBirthdayShow = false;
    },
  },
};
</script>

<style>
</style>