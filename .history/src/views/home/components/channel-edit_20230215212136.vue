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
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="value in 8"
        :key="value"
        text="文字"
      />
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell :border="false">
      <template #title>
        <div class="title-text">频道推荐</div>
      </template>
    </van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="value in 8"
        :key="value"
        icon="plus"
        text="文字"
      />
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
/deep/ .grid-item {
  width: 160px;
  height: 86px;
  .van-grid-item__content {
    white-space: nowrap;
    background-color: #f4f5f6;
    .van-grid-item__text {
      font-size: 28px;
      color: #222;
    }
  }
}

/deep/ .recommend-grid {
  .grid-item {
    .van-grid-item__content {
      flex-direction: row;
      .van-icon-plus {
        font-size: 28px;
        margin-right: 6px;
      }
      .van-grid-item__text {
        margin-top: 0;
      }
    }
  }
}
</style>
