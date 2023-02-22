<template>
  <div class="update-photo">
    <img class="img" ref="img" :src="src" alt="" />
    <div class="toolbar">
      <div class="cancel">取消</div>
      <div class="confirm" @click="onConfirm">完成</div>
    </div>
  </div>
</template>

<script>
import { updateUserPhoto } from '@/api/user'
import 'cropperjs/dist/cropper.min.css'
import Cropper from 'cropperjs'

export default {
  name: 'UpdatePhoto',
  props: {
    src: {
      type: String,
      required: true
    }
  },
  mounted () {
    this.cropper = new Cropper(this.$refs.img, {
      viewMode: 1, // 只能在裁剪的图片范围内移动
      dragMode: 'move', // 画布可以移动
      aspectRatio: 1, // 裁剪区默认正方形
      autoCropArea: 1, // 自动调整裁剪图片
      cropBoxMovable: false, // 禁止裁剪区移动
      cropBoxResizable: false, // 禁止裁剪区缩放
      background: false // 关闭默认背景
    })
  },
  methods: {
    onConfirm () {
      // 在确定时，通过this.cropper实例，去获取当前裁剪的结果数据
      this.cropper.getCroppedCanvas().toBlob(async blob => {
        // blob对象 就是 裁剪后的 图片对象
        // 把这个图像传递给后台
        try {
          // JSON: javascript object nation
          // post/patch/put 提交数据 4种格式
          // 1. json
          // 2. application/x-www-form-urlencoded ?a=1&b=2
          // 3. application/xml
          // 4. multipart/form-data
          const formData = new FormData()
          formData.append('photo', blob)

          const ret = await updateUserPhoto(formData)
          this.$toast.success('修改头像成功')
          console.log('ret: ', ret)
          this.$emit('input', ret.data.data.photo)
          this.$emit('close')
        } catch (error) {
          console.log('error: ', error)
          this.$toast.fail('修改头像失败')
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.update-photo {
  background-color: #000;
  height: 100%;
  .toolbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    .cancel,
    .confirm {
      width: 90px;
      height: 90px;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
  }
}

.img {
  display: block;
  max-width: 100%;
}
</style>
