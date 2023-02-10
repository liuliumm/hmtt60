<template>
  <div>
    <input type="text" v-model="user.name">
    <input type="text" v-model="user.age">
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        name: '',
        age: 0
      }
    }
  },
  watch: {
    user: {
      handler (newVal, oldVal) {
        // 这里打印的都是user里的对象，因为监听的是user对象
        console.log(newVal, oldVal)
      },
      deep: true,
      immediate: false
    }
  }
}
</script>
