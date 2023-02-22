<template>
  <div>
    <van-datetime-picker
      v-model="this.currentDate"
      show-toolbar
      @cancel="onCancel"
      @confirm="onConfirm"
      type="date"
      title="选择生日"
      :min-date="this.minDate"
      :max-date="this.maxDate"
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
      minDate: new Date(1970,1,1),
      maxDate: new Date(),
      currentDate: new Data(this.value),
    };
  },
  methods: {
    async onConfirm() {
      const currentDate = dayjs(this.currentDate).format("YYYY-MM-DD");
      console.log("birthday:", currentDate);
      await updateProfile({ birthday: this.currentDate });
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