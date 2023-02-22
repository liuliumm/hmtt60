<template>
  <div class="search-container">
    <van-search
      v-model="value"
      show-action
      placeholder="请输入搜索关键词"
      input-align="center"
      
      @search="onSearch"
      @cancel="onCancel"
    />
  </div>
</template>

<script>
import { ref } from "vue";
import { Toast } from "vant";
export default {
  setup() {
    const value = ref("");
    const onSearch = (val) => Toast(val);
    const onCancel = () => Toast("取消");
    return {
      value,
      onSearch,
      onCancel,
    };
  },
};
</script>

<style scoped lang="less">
</style>