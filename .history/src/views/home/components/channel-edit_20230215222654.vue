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
      <!-- b、模板绑定 -->
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in recommendChannels"
        :key="index"
        :text="channel.name"
        icon="plus"
      />
    </van-grid>
    <!-- /频道推荐 -->
  </div>
</template>

<script>
import { getAllChannels } from "@/api/channel.js";
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
    return {
      // 2,调用loadAllChannels()方法
      allChannels: [],
    };
  },
  created() {
    //3，并初始化channels
    this.loadAllChannels();
  },
  methods: {
    // 1,加载所有频道
    async loadAllChannels() {
      try {
        const { data } = await getAllChannels();
        this.allChannels = data.data.channels;
      } catch (err) {
        this.$toast("获取频道列表数据失败");
      }
    },
  },
  //  处理展示推荐频道
  // 思路：`所有频道 - 用户频道 = 推荐频道`
  // a.1、封装计算属性筛选数据，在computed中添加如下代码
  recommendChannels() {
    const channels = [];
    this.allChannels.forEach((channel) => {
      //遍历所有频道，如果不在我的频道中，就放入空数组channels
      // find 遍历数组，找到满足条件的元素项
      const ret = this.myChannels.find((myChannel) => {
        //在我的频道中查找是否有此频道
        return myChannel.id === channel.id;
      });

      // 如果不存在，放入空数组
      if (!ret) {
        channels.push(channel);
      }
    });

    // 把计算结果返回
    return channels;
  },
  // a.2、 简化版-计算属性筛选数据，使用filter
  // 简化计算属性recommendChannles的计算
//   recommendChannles() {
//     // 数组的 filter 方法：遍历数组，把符合条件的元素存储到新数组中并返回
//     return this.allChannels.filter((channel) => {
//       // const channels = []

//       // 数组的 find 方法：遍历数组，把符合条件的第1个元素返回
//       return !this.myChannels.find((myChannel) => {
//         return myChannel.id === channel.id;
//       })
//     })
//   },

//       // return channels
//     });
//   },
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
::v-deep.grid-item {
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
