<template>
  <div class="article-container">文章详情</div>
</template>

<script>
export default {
    name: "ArticleIndex",
    props: {
        articleId: {//进入此界面必须传递文章id
            type: [Number, String],
            required: true
        }
    },
    created () {
        this.$route.params.articleId
        this.$route
    }
}
</script>

<style>

</style>