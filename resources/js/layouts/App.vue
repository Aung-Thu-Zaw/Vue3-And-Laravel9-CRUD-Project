<template>
  <div>
    <h1 class="text-center text-secondary pt-5 fw-bold text-capitalize">
      <!-- CRUD Project With Vue3 And Laravel9 -->
      <!-- Create Post Here -->
      {{ currentPageTitle }}
    </h1>

    <nav class="mt-5 d-flex align-items-center justify-content-center">
      <router-link to="/" class="mx-2">Home</router-link> |
      <router-link :to="{ name: 'post.create' }" class="mx-2"
        >Create</router-link
      >
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  computed: {
    currentPageTitle() {
      return this.$route.meta.title;
    },
  },
};
</script>

<style scoped>
a {
  font-size: 1.2rem;
  font-weight: 400;
  text-decoration: none;
  color: #6c757d;
}
a.router-link-active {
  color: rgb(0, 130, 205);
  text-decoration: underline;
}
</style>
