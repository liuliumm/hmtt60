<template>
  <div>
    <van-datetime-picker
      
      show-toolbar
      @cancel="onCancel"
      @confirm="onConfirm"
      
      title="选择生日"
      
    />
  </div>
</template>

<script>
import { updateProfile } from "@/api/user";
// import { ref } from "vue";
import dayjs from "dayjs";
export default {
  name: "UpdateBirthday",
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Data(this.value),
    };
  },
  methods: {
    async onConfirm() {
      const currentDate = dayjs(this.currentDate).format("YYYY-MM-DD");
      console.log("birthday:", currentDate);
      await updateProfile({ birthday: currentDate });
      const ref = await updateProfile({ birthday: currentDate });
      console.log("birthday:", ref);

      this.$emit("input", currentDate);
      this.$emit("close");
    },
    onCancel() {
      this.$parent.$parent.isUpdateBirthdayShow = false;
    },
  },
};
</script>

<style>
</style>