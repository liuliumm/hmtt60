<template>
  <div>
    <van-picker
      title="标题"
      :columns="columns"
      @confirm="onConfirm"
      @cancel="onCancel"
      @change="onChange"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
  </div>
</template>

<script>
import { Toast } from 'vant';

export default {
    data () {
        return {
            columns,
      onChange,
      onCancel,
      onConfirm,
        }
    },
  methods: {
    async loadupdateGender(){
        const columns = ['男', '女'];

    const onConfirm = (value, index) => {
      Toast(`当前值: ${value}, 当前索引: ${index}`);
    };
    const onChange = (value, index) => {
      Toast(`当前值: ${value}, 当前索引: ${index}`);
    };
    const onCancel = () => Toast('取消');
    } 
  },
};
</script>

<style>
</style>