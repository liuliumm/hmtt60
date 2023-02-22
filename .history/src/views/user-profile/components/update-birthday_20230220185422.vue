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
import { ref } from "vue";
export default {
  name: "UpdateBirthday",
  data() {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Data(this.value)
    };
  },
  props: {
    value: {
      type: String,
      required: true,
    },
  },

  methods: {
    async onConfirm(type, val) {
      const currentDate = ref(new Date(2021, 0, 17));
      await updateProfile({ birthday: val });
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