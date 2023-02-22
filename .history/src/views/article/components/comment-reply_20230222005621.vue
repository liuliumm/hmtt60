<template>
  <div class="comment-reply">评论回复</div>
</template>

<script>
export default {
  name: "CommentReply",

  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  methods: {},
};
</script>

<style scoped></style>
