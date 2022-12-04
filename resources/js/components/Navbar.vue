<template>
  <nav class="mt-5 d-flex align-items-center justify-content-center">
    <router-link to="/" class="mx-2">Home</router-link> |
    <router-link :to="{ name: 'posts.create' }" class="mx-2"
      >Create</router-link
    >
  </nav>
</template>
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
