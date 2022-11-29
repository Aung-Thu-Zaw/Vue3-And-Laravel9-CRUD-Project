<template>
  <div>
    {{ errorMessage }}
    <div v-for="post in posts" :key="post.id">
      {{ post.title }}
    </div>
  </div>
</template>

<script>
import { onMounted } from "@vue/runtime-core";
import getPosts from "../composables/getPosts";
export default {
  setup() {
    const { posts, errorMessage, fetchPost } = getPosts();

    onMounted(() => {
      fetchPost();
    });

    return { posts, errorMessage };
  },
};
</script>

<style>
</style>
