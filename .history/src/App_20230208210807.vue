<template>
  <div id="app">
    <van-button type="danger">危险按钮</van-button>
    <h1>黑马头条</h1>
    <div>
      <i class="toutiao toutiao-shipin"></i>
    </div>
    <p>5555555</p>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
</style>