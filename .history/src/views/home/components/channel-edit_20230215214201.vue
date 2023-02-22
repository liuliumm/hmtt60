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
      <!-- 根据active设置高亮类名 -->
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in myChannels"
        :key="index"
        icon="clear"
      >
        <!-- 如下2选1即可 -->
        <!-- 1. 样式绑定:class="{样式名1:true/false,样式名2:true/false}" -->
        <template #text>
          <span class="text" :class="{ active: index === active }">
            {{ channel.name }}
          </span>
        </template>
        <!-- 2. 样式绑定:class="[样式名1,样式名2]" -->
        <!-- <template #text>
          <span :class="{ active: index === active, text: true }">
            {{ channel.name }}
          </span>
        </template> -->
      </van-grid-item>
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
  props: {
    myChannels: {
      type: Array,
      required: true,
    },
    active: {
      type: Number,
      required: true,
    },
  },
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
      margin-top: 0; //
      .text {
        font-size: 12px;
        color: #222;
        margin-top: 0;
      }
      .active {
        color: red;
      }
    }
  }
}
/deep/ .recommend-grid {
  .grid-item {
    margin-top: 0;
    .van-grid-item__content {
      flex-direction: row;
      .van-icon-plus {
        font-size: 28px;
        margin-right: 6px;
      }
      /* 去除 这里设置的margin-top，设置到grid-item下，这样我的频道和推荐频道都有效*/
      //   .van-grid-item__text {
      //     margin-top: 0;
      //   }
    }
  }
}
/deep/ .my-grid {
  .grid-item {
    .van-icon-clear {
      position: absolute;
      right: -10px;
      top: -10px;
      font-size: 30px;
      color: #cacaca;
      z-index: 2;
    }
  }
}
</style>
