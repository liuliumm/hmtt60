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
      minDate: new Date(1900, 0, 1),//可选的最小时间
        maxDate: new Date(),//可选的最大时间----new Date()当前时间
        currentDate: new Date(this.value),//默认选择的时间
    };
  },
  methods: {
    // minDate: Date(1970, 1, 1),
    // maxDate: Date(),
    // currentDate: Data(this.value),
    async onConfirm() {
      const currentDate = dayjs(this.currentDate).format("YYYY-MM-DD");
      console.log("birthday:", currentDate);
      await updateProfile({ birthday: currentDate });
      //   const ref = await updateProfile({ birthday: currentDate });
      //   console.log("birthday:", ref);

      this.$emit("input", this.currentDate);
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