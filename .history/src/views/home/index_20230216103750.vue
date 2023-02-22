<template>
  <div class="home-container">
    <!-- 导航栏 原本只能通过title属性设置一个导航栏的标题，现在添加一个搜索按钮，需要插槽-->
    <!-- 这样的效果就是将原本标题的位置，换成一个按钮进行显示 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <!-- 在按钮中增加一个名字为title的插槽 -->
      <!-- 导航组件之导航栏的插槽的名称之一是title -->
      <!-- 按钮的参数的类型为primary info warning danger，选择了info  参数round规定为圆形按钮 -->
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
      >
        搜索
      </van-button>
    </van-nav-bar>
    <!-- /导航栏 -->
    <!-- /频道标签 -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab
        :title="channel.name"
        v-for="channel in channels"
        :key="channel.id"
      >
        <!-- 使用列表组件 -->
        <ArticleList :channel="channel"> </ArticleList>
        <!-- /使用列表组件 -->
        <!-- {{ channel.name }} 的内容 -->
      </van-tab>
      <!-- <template #nav-right> -->
      <!-- placeholder	固定在顶部时，是否在标签位置生成一个等高的占位元素  	boolean类型，	默认值false -->
      <div slot="nav-right" class="placeholder"></div>
      <!-- 汉堡按钮，插槽，点击按钮弹出弹出层 -->
      <div
        slot="nav-right"
        class="hamburger-btn"
        @click="isChannelEditShow = true"
      >
        <i class="toutiao toutiao-gengduo"></i>
      </div>
      <!-- </template> -->
    </van-tabs>
    <!-- /频道标签 -->
    <!-- 弹层 -->t
    <van-popup
      v-model="isChannelEditShow"
      position="bottom"
      closeable
      close-icon-position="top-left"
      :style="{ height: '100%' }"
    >
      <!-- 监听处理切换频道事件 -->
      <channel-edit
        :active="active"
        :my-channels="channels"
        @update-active="onUpdateActive"
      />
    </van-popup>
  </div>
</template>

<!--
6个假值：'' 0 NaN Undefined false null ; 除了这些全是真值
历史记录是默认情况下展示  ==>false
联想词出现的条件：有关键字 =>searchText非空
搜索结果出现的条件 => 用户敲击回车键搜索 => 执行search事件的函数onSearch函数，我们在这个函数里面定义一个标记变量来标识要展示搜索结果了 => isResultShow:true
用户查看 搜索结果时 可能发现这个结果并不符合需要会重新回到输入框输入关键词，此时[不应该] 继续显示搜索结果，所以监听输入框的focus事件，把isResultshow 改为 false
-->
<script>
import { getUserChannels } from "@/api/user";
import { Toast } from "vant";
import ArticleList from "./components/article-list.vue"; //模块引用不需要大括号
import ChannelEdit from "./components/channel-edit"; // 加载注册弹出层频道编辑页面
import { mapState } from "vuex";
import { getItem } from "@/utils/storage";
export default {
  // 组件名称
  name: "HomeIndex",
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: {
    ArticleList,
    ChannelEdit,
  },
  // 组件状态值
  data() {
    return {
      active: 0, //定义active： // 借助这个变量 来 标识当前所选中的频道
      channels: [],
      isChannelEditShow: false, // 这里我们先设置为 true 就能看到弹窗的页面了
    };
  },
  // 计算属性
  computed: {
    ...mapState(["user"]), // 获取user
  },
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    // 1. 登陆后的我的频道
    // 2. 未登陆的默认的我的频道
    //   这两种情况使用的是一个接口，此接口是根据接口中的token来判断是否登陆
    async loadChannels() {
      try {
        let channels = [];
        if (this.user) {
          // 已登录，请求获取线上的频道数据
          const { data } = await getUserChannels(); //这时获取到的是“登录用户的频道列表”
          channels = data.data.channels;
        } else {
          // 未登录
          const localChannels = getItem("TOUTIAO_CHANNELS");
          if (localChannels) {
            // 有本地频道数据，则使用
            channels = localChannels;
          } else {
            // 没有本地频道数据，则请求获取默认推荐的频道列表
            const { data } = await getUserChannels(); //这时获取到的是“默认的频道列表”
            channels = data.data.channels;
          }
        }
        // 将数据更新到组件中
        this.channels = channels;
      } catch (err) {
        console.log(err);
        this.$toast("数据获取失败");
      }
    },
    // 优化loadChannels
    async loadChannels() {
      try {
        let channels = [];
        const localChannels = getItem("TOUTIAO_CHANNELS");
        if (this.user || !localChannels) {
          // 登录 或者 未登录本地没有存储 获取后端数据
          const { data } = await getUserChannels();
          channels = data.data.channels;
        } else {
          // 未登录并且本地有数据
          channels = localChannels;
        }
        this.channels = channels;
      } catch (err) {
        this.$toast("获取频道列表数据失败");
      }
    },
    // 切换频道
    onUpdateActive(index) {
      // 更新激活的频道项
      this.active = index;
      // 关闭编辑频道弹层
      this.isChannelEditShow = false;
    },
  },
  // 以下是生命周期钩子   注：没用到的钩子请自行删除
  /**
   * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
   */
  created() {
    this.loadChannels();
  },
  /**
   * el 被新创建的 vm.$ el 替换，并挂载到实例上去之后调用该钩子。
   * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$ el 也在文档内。
   */
  mounted() {},
};
</script> 

<style scoped lang="less">
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  /* 视频问题 */
  /* #这里需要添加deep，这个标签样式并不是我们自己添加的标签所带的样式，
          所以需要添加/deep/或者全局控制，只有是自己添加的标签才可以直接在scoped中控制样式 */
  //样式只能作用于根组件，我们想给子组件设置样式，就需要使用深度操作符：/deep/，或者添加全局样式
  // 每当出现样式显示不全，但是样式却又生效了，同时style样式还使用了scoped，都可以尝试此方法来解决。
  //什么情况下要添加/deep/，就去看渲染的时候，这个标签有没有data-v-5954443c这个标记，没有就需要添加/deep/
  /deep/ .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
  /deep/ .channel-tabs {
    .van-tabs__wrap {
      //这里只需要给父节点channel-tabs添加/deep/,这样下边的子节点都会生效
      position: fixed;
      top: 92px;
      height: 82px;
      z-index: 1;
      left: 0;
      right: 0;
    }

    .van-tab {
      //这个比较特殊，我们在结构中写有van-tab标签，但是在渲染的时候没有data标记，所以也需要deep
      border-right: 1px solid #edeff3;
      min-width: 200px;
      font-size: 30px;
      color: #777777;
    }

    .van-tab--active {
      //这里只需要给父节点channel-tabs添加/deep/,这样下边的子节点都会生效
      color: #333333;
    }

    .van-tabs__nav {
      //这里只需要给父节点channel-tabs添加/deep/,这样下边的子节点都会生效
      padding-bottom: 0;
    }

    .van-tabs__line {
      //这里只需要给父节点channel-tabs添加/deep/,这样下边的子节点都会生效
      bottom: 8px;
      width: 31px !important;
      height: 6px;
      background-color: #3296fa;
    }
    .placeholder {
      //占位元素为了解决最后一个tab标签被汉堡盖住问题（看下边的图）
      flex-shrink: 0; //此元素不参与flex的
      width: 66px;
      height: 82px;
    }

    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.902;
      i.toutiao {
        font-size: 33px;
      }
      &:before {
        //找到父节点，添加伪元素（这个是汉堡按钮与tab之间的一个竖线）
        content: "";
        position: absolute;
        left: 0;
        width: 1px; //在模拟器上看不到（手机上没问题），如果想看到改为2px
        height: 100%;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
}
</style>