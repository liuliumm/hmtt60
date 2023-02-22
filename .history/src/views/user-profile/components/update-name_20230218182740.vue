<template>
  <div class="update-name">
    <!-- 导航栏 -->
    <van-nav-bar
      title="设置昵称"
      left-text="取消"
      right-text="确定"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
    <!-- /导航栏 -->
    <van-field
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="7"
      placeholder="请输入新昵称"
      show-word-limit
    />
  </div>
</template>

<script>
import { updateProfile } from '@/api/user'
export default {
  // 组件名称
  name: "UpdateName",
  // 组件参数 接收来自父组件的数据
  props: {},
  // 组件状态值
  data() {
    return { message: "" };
  },
  // 组件方法
  methods: {
    async onConfirm () {
        const localName = this.localName
        await updateProfile({
            name: localName
        })
        // 更新视图
        this.$emit('input', localName)
        this.$emit('close')
    }
  },
};
</script>

<style scoped lang="less">
.field-wrap {
  padding: 20px;
}
</style>