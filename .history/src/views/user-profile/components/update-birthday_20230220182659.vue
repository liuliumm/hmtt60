<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      show-toolbar
      cancel-button-text
      confirm-button-text
      type="date"
      title="选择生日"
      :min-date="minDate"
      :max-date="maxDate"
    />
  </div>
</template>

<script>
export default {
    name: "UpdateBirthday",
    props: {
    value: {
      type: String,
      required: true,
    },
  },
    methods: {},
};

</script>

<style>
</style>