<template>
  <div class="channel-edit">
    <!-- border是否显示内边框 -->
    <van-cell :border="false">
      <!-- 插槽title，自定义分组标题 -->
      <template #title>
        <div>我的频道</div>
      </template>
      <van-button size="mini" round type="danger" plain>编辑</van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item v-for="value in 8" :key="value" text="文字" />
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell :border="false">
      <template #title>
        <div>频道推荐</div>
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
}</style>
