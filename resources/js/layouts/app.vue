<template>
  <div>
    <h1 class="text-center text-secondary pt-5 fw-bold">
      CRUD Project With Vue3 And Laravel9
    </h1>
    <div class="container p-5">
      <div class="row">
        <div class="col-12">
          <div class="my-3 w-25">
            <select class="form-select" v-model="selectedCategory">
              <option selected>Filter By Category</option>
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
              >
                {{ category.name }}
              </option>
            </select>
          </div>
          <table class="table table-bordered shadow-sm">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Category</th>
                <th scope="col">Title</th>
                <th scope="col">Content</th>
                <th scope="col">Created At</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="post in posts.data" :key="post.id">
                <th scope="row">{{ post.id }}</th>
                <td>{{ post.category }}</td>
                <td>{{ post.title }}</td>
                <td>{{ post.content }}</td>
                <td>{{ post.created_at }}</td>
                <td>
                  <a href="" class="btn btn-warning me-1"> Edit </a>
                  <a href="" class="btn btn-danger ms-1"> Delete </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="d-flex align-items-center justify-content-center">
      <Bootstrap5Pagination
        :data="posts"
        @pagination-change-page="(page) => fetchPost(page, selectedCategory)"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "@vue/runtime-core";
import getPosts from "../composables/getPosts";
import getCategories from "../composables/getCategories";
import { Bootstrap5Pagination } from "laravel-vue-pagination";

let selectedCategory = ref("");
const { posts, fetchPost } = getPosts();
const { categories, fetchCategory } = getCategories();

onMounted(() => {
  fetchPost();
  fetchCategory();
});

watch(selectedCategory, (current, previous) => {
  fetchPost(1, current);
});
</script>

<style>
</style>
