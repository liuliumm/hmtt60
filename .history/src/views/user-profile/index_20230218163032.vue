<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->
    <van-cell title="头像" is-link>
      <van-image
        class="avatar"
        fit="cover"
        round
        src="https://img.yzcdn.cn/vant/cat.jpeg"
      />
    </van-cell>
    <van-cell title="昵称" value="内容" is-link />
    <van-cell title="性别" value="内容" is-link />
    <van-cell title="生日" value="内容" is-link />
  </div>
</template>

<script>
import { getUserProfile } from "@/api/user";
export default {
  name: "UserProfile",
  props: {},
  data() {
    return {
      userProfile: {}, // 个人信息
    };
  },
  created () {
    this.loadgetUserProfile()
  },
  methods: {
    async loadgetUserProfile() {
        const {data} = await getUserProfile()
        console.log('Profile:', data);
        this.userProfile = data.data
        console.log('UserProfile:', userProfile);
    }
  },
};
</script>

<style scoped lang='less'>
.user-profile {
  //用户头像在编辑页面
  .avatar {
    width: 60px;
    height: 60px;
  }
}
</style>