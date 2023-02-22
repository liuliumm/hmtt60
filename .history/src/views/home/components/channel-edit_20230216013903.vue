<template>
  <div class="channel-edit">
    <!-- border是否显示内边框 -->
    <van-cell :border="false">
      <!-- 插槽title，自定义分组标题 -->
      <template #title>
        <div class="title-text">我的频道</div>
      </template>
      <van-button
        class="edit-btn"
        size="mini"
        round
        type="danger"
        plain
        @click="isEdit = !isEdit"
      >
        {{ isEdit ? "完成" : "编辑" }}
      </van-button>
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <!-- 根据active设置高亮类名 -->
      <!-- 删除van-grid-item中的icon属性，变为icon插槽 -->
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in myChannels"
        :key="channel.id"
        :icon="isEdit && !fiexdChannels.includes(channel.id) ? 'clear' : ''"
        @click="onMyChannelClick(channel, index)"
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
        @click="onAddChannel(channel)"
      />
    </van-grid>
    <!-- /频道推荐 -->
  </div>
</template>

<script>
import {
  getAllChannels,
  addUserChannel,
  deleteUserChannel,
} from "@/api/channel.js";
import { mapState } from "vuex";
import { setItem } from "@/utils/storage.js";
//A 导入vuex中的mapState、storage中的方法，并且通过mapState映射user
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
      //   添加数据用来控制编辑状态的显示
      isEdit: false,
      fiexdChannels: [0, 10],
    };
  },
  computed: {
    //B 获取user
    ...mapState(["user"]),
    //  处理展示推荐频道
    // 思路：`所有频道 - 用户频道 = 推荐频道`
    // 然后你会神奇的发现点击的那个推荐频道跑到我的频道中了，
    // 我们并没有去手动的删除点击的这个推荐频道，但是它没了！
    // 推荐频道是通过一个计算属性获取的，计算属性中使用了 channels（我的频道）数据，
    // 所以只要我的频道中的数据发生变化，那么计算属性就会重新运算获取最新的数据。
    // - 推荐频道是在计算属性中，通过全部频道-我的频道计算出来的
    // - 我们的频道数据变化之后，计算属性会重新自动执行
    // - 所以推荐频道也会随之变化
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
        console.log('item: ', ret, ret?.id, ret?.name)
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
  },
  created() {
    //3，并初始化channels
    this.loadAllChannels();
  },
  methods: {
    // 点击我的频道
    onMyChannelClick(channel, index) {
      if (!this.isEdit) {
        // 非编辑状态下：执行切换频道,点击[myChannel] 切换频道
        // 错误示例: this.active = index
        this.$emit("update-active", index);
      } else {
        // 编辑状态下：点击[myChannel] 删除频道
        // if (this.fixedChannels.includes(channel.id)) return;
        if (this.fixedChannels.includes(channel.id)) return
        // 1. 删除频道项
        /* eslint-disable-next-line */
        this.myChannels.splice(index, 1);
        // 2. 如果删除的激活频道之前的频道，则更新激活的频道项
        // 参数1：要删除的元素的开始索引（包括）
        // 参数2：删除的个数，如果不指定，则从参数1开始一直删除到最后
        if (index < this.active) {
          // 让激活频道的索引 - 1
          this.$emit("update-active", this.active - 1, true); //当前频道被删除之后，上一个频道高亮，并且不关闭弹出层
        }

        // 专门处理数据持久化
        this.deleteChannel(channel);
      }
    },
    // 1,加载所有频道
    async loadAllChannels() {
      try {
        const { data } = await getAllChannels();
        this.allChannels = data.data.channels;
      } catch (err) {
        this.$toast("获取频道列表数据失败");
      }
    },
    //C 点击添加频道
    async onAddChannel(channel) {
      this.myChannels.push(channel); //获取点击的频道项,将频道项添加到我的频道中
      if (this.user) {
        try {
          // 已登录，数据存储到线上
          await addUserChannel({
            id: channel.id, // 频道 id
            seq: this.myChannels.length, // 频道的 序号
          });
          this.$toast("添加成功");
        } catch (err) {
          this.$toast("保存失败");
        }
      } else {
        // 未登陆
        setItem("TOUTIAO_CHANNELS", this.myChannels);
      }
    },
    // 根据用户是否登录来决定是否将数据存储在本地
    async deleteChannel(channel) {
      try {
        if (this.user) {
          // 已登录，将数据存储到线上
          await deleteUserChannel(channel.id);
        } else {
          // 未登录，将数据存储到本地
          setItem("TOUTIAO_CHANNELS", this.myChannels);
        }
      } catch (err) {
        console.log(err);
        this.$toast("删除频道失败，请稍后重试");
      }
    },
  },
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
.grid-item {
  width: 160px;
  height: 86px;
  .van-grid-item__content {
    white-space: nowrap;
    background-color: #f4f5f6;
    .van-grid-item__text,
    .text {
      font-size: 12px;
      color: #222;
      margin-top: 0;
    }
    .active {
      color: red;
    }
    .van-grid-item__icon-wrapper {
      position: unset;
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
