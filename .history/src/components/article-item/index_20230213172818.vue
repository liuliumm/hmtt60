<template>
  <van-cell class="article-item">
    <template #title
      ><!-- /*自定义左侧 title 的内容*/ -->
      <div class="title van-multi-ellipsis--l2">{{ article.title }}</div>
    </template>
    <template #label>
      <!-- 自定义标题下方 label 的内容 -->
      <div v-if="article.cover.type === 3" class="cover-wrap">
        <div
          class="cover-item"
          v-for="(img, index) in article.cover.images"
          :key="index"
        >
          <van-image class="cover-item-img" fit="cover" :src="img" />
        </div>
      </div>
      <div class="label-info-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate }}</span>
      </div>
    </template>
    <template>
      <van-image
        v-if="article.cover.type === 1"
        class="right-cover"
        fit="cover"
        :src="article.cover.images[0]"
      />
    </template>
  </van-cell>
</template>

<script>
export default {
  name: "ArticleItem",
  props: {
    article: {
      type: "Object",
      required: true,
    },
  },
};
</script>

<style>
</style>