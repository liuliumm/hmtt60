<template>
  <div class="channel-edit">
    <!-- border是否显示内边框 -->
    <van-cell :border="false">
      <!-- 插槽title，自定义分组标题 -->
      <template #title>
        <div class="title-text">我的频道</div>
      </template>
      <van-button class="edit-btn" size="mini" round type="danger" plain
        >编辑</van-button
      >
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item v-for="value in 8" :key="value" text="文字" />
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell :border="false">
      <template #title>
        <div class="title-text">频道推荐</div>
      </template>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item v-for="value in 8" :key="value" text="文字" />
    </van-grid>
    <!-- /频道推荐 -->
  </div>
</template>

<script>
export default {
  name: "ChannelEdit",
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="less">
.channel-edit {
  padding: 85px 0;
}
.title-text {
  font-size: 32px;
  color: #333333;
}

.edit-btn {
  width: 104px;
  height: 48px;
  font-size: 26px;
  color: #f85959;
  border: 1px solid #f85959;
}
</style>
