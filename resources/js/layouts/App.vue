<template>
  <div>
    <h1 class="text-center text-secondary pt-5 fw-bold text-capitalize">
      {{ currentPageTitle }}
    </h1>
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
export default {
  components: {
    Navbar,
  },
  computed: {
    currentPageTitle() {
      return this.$route.meta.title;
    },
  },
};
</script>

<style scoped>

</style>
