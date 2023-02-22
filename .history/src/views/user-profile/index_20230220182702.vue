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
      <van-image class="avatar" fit="cover" round :src="userProfile.photo" />
    </van-cell>
    <van-cell
      title="昵称"
      @click="isProfileShow = true"
      :value="userProfile.name"
      is-link
    >
    </van-cell>
    <!-- 这里性别转换判断两个等号是防止以后后端传来的数据类型由number转变为String -->
    <van-cell title="性别" @click="isUpdateGenderShow = true" :value="userProfile.gender == 0 ? '男' : '女'" is-link />
    <van-cell title="生日" :value="userProfile.birthday" is-link />
    <!-- 昵称弹层/ -->
    <van-popup
      v-model="isProfileShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <update-name
        @close="isProfileShow = false"
        :name="userProfile.name"
        @update-name="updateName"
      />
      <!-- 监听处理切换频道事件 -->
      <!-- <channel-edit
        :active="active"
        :my-channels="channels"
        @update-active="onUpdateActive"
      /> -->
    </van-popup>
    <!-- 昵称弹层/ -->
    <!-- 性别弹层/ -->
    <van-popup
      v-model="isUpdateGenderShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <update-gender      
        v-model="userProfile.gender"
      />
    </van-popup>
    <!-- 性别弹层/ -->
    <!-- 生日弹层/ -->
    <van-popup
      v-model="isUpdateBirthdayShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <update-birthday      
        v-model="userProfile.birthday"
      />
    </van-popup>
    <!-- 生日弹层/ -->
  </div>
</template>

<script>
import { getUserProfile } from "@/api/user";

import UpdateName from "./components/update-name.vue";
import UpdateGender from "./components/update-gender.vue";
import UpdateBirthday from "./components/update-birthday.vue";
export default {
  name: "UserProfile",
  props: {},
  data() {
    return {
      userProfile: {}, // 个人信息
      isProfileShow: false, // 昵称弹层
      isUpdateGenderShow: false, // 性别弹层
      isUpdateBirthdayShow: false, //生日弹层
      //   localName: this.value  //同步localName数据
    };
  },
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday
  },
  created() {
    this.loadgetUserProfile();
  },
  methods: {
    async loadgetUserProfile() {
      try {
        const { data } = await getUserProfile();
        console.log("Profile:", data);
        this.userProfile = data.data;
        console.log("UserProfile:", this.userProfile);
      } catch (err) {
        console.log(err);
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
  .van-popup {
    background: #f5f7f9;
  }
}
</style>