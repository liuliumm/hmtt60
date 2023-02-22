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
      <van-image class="avatar" fit="cover" round :src="userProfile.photo" @click="$refs.file.click()" />
      <!-- 第一种，利用css样式实现input的点击事件，让输入框隐藏并于头像所在行完全重合 -->
      <!-- 第二种，通过ref来获取所在dom节点，通过change监听改变 -->
      <input type="file" ref="file" hidden @change="onChange" />
      <!-- change用在此处的bug，当第一次和第二次选中同一文件时，因为浏览器认为没有改变，两次都是同一文件，就不会触发change事件 -->
      <!-- 解决办法：当选中图片并使用后，将该文件清除，这样当第二次选中同一文件时，依然会触发change事件。 -->
      <!-- 隐藏域在页面中对于用户是不可见的，在表单插入中隐藏域的目的在于收集和发送信息，以利于被处理表单的程序所使用
                注：隐藏只是在网页页面上不显示输入框，但是虽然隐藏了，还是具有form传值功能。一般用来传值，而不必让用户看到。 -->
    </van-cell>
    <van-cell
      title="昵称"
      @click="isProfileShow = true"
      :value="userProfile.name"
      is-link
    >
    </van-cell>
    <!-- 这里性别转换判断两个等号是防止以后后端传来的数据类型由number转变为String -->
    <van-cell
      title="性别"
      @click="isUpdateGenderShow = true"
      :value="userProfile.gender == 0 ? '男' : '女'"
      is-link
    />
    <van-cell
      title="生日"
      @click="isUpdateBirthdayShow = true"
      :value="userProfile.birthday"
      is-link
    />
    <!-- 昵称弹层/ -->
    <van-popup
      v-model="isProfileShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <!-- value传递给子组件的props，而子组件又通过$emit传递回来。 -->
      <update-name
        @close="isProfileShow = false"
        :value="userProfile.name"
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
      <update-gender v-model="userProfile.gender" />
    </van-popup>
    <!-- 性别弹层/ -->
    <!-- 生日弹层/ -->
    <van-popup
      v-model="isUpdateBirthdayShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <update-birthday
        v-if="isUpdateBirthdayShow"
        @close="isUpdateBirthdayShow = false"
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
      isUpdatePhotoShow: false, //预览图片
      //   localName: this.value  //同步localName数据
    };
  },
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
  },
  created() {
    this.loadgetUserProfile();
  },
  methods: {
    onChange() {
      //打印所有
      // console.log(...svg);
      // 获取到选中的图片
      // event.target this.$refs.file
      // 获取文件对象
      const file = this.$refs.file.files[0];

      // 基于文章对象获取 blob 数据
      const data = window.URL.createObjectURL(file);

      // 展示预览图片弹出层
      this.isUpdatePhotoShow = true;

      // file-input 如果选了同一个文件不会触发 change 事件
      // 解决办法就是每次使用完毕，把它的 value 清空
      this.$refs.file.value = "";
    },
    updateName(val) {
      this.userProfile.name = val;
      this.isProfileShow = false;
    },
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