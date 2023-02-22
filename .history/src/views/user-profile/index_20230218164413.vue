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
        :src="userProfile.photo"
      />
    </van-cell>
    <van-cell title="昵称" :value="userProfile.name" is-link />
    <van-cell title="性别" :value="userProfile.gender" is-link />
    <van-cell title="生日" :value="userProfile.birthday" is-link />
  </div>
</template>

<script>
import { getUserProfile } from "@/api/user";
export default {
  name: "UserProfile",
  props: {},
  data() {
    return {
      user: {}, // 个人信息
    };
  },
  created() {
    this.loadgetUserProfile();
  },
  methods: {
    async loadgetUserProfile() {
      try {
        const { data } = await getUserProfile();
        // console.log('Profile:', data);
        this.user = data.data;
        console.log("UserProfile:", user);
      } catch (err) {
        console.log(err)
        this.$toast("获取数据失败");
      }
    },
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