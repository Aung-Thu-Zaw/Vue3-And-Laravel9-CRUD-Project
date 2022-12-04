<template>
  <div>
    <div class="container p-5">
      <div class="row">
        <div class="col-12">
          <div>
            <input
              type="text"
              class="form-control"
              v-model="search_global"
              placeholder="Search..."
            />
          </div>
          <div class="d-flex align-items-center justify-content-between">
            <div class="my-3 w-20">
              <select class="form-select" v-model="search_category">
                <option selected value="">Filter By Category</option>
                <option
                  v-for="category in categories"
                  :key="category.id"
                  :value="category.id"
                >
                  {{ category.name }}
                </option>
              </select>
            </div>
            <div class="my-3 w-20">
              <input
                type="text"
                class="form-control"
                v-model="search_id"
                placeholder="Search By Id"
              />
            </div>
            <div class="my-3 w-20">
              <input
                type="text"
                class="form-control"
                v-model="search_title"
                placeholder="Search By Title"
              />
            </div>
            <div class="my-3 w-20">
              <input
                type="text"
                class="form-control"
                v-model="search_content"
                placeholder="Search By Content"
              />
            </div>
          </div>

          <table class="table table-bordered shadow-sm">
            <thead>
              <tr>
                <th scope="col" @click="updateOrdering('id')">
                  Id
                  <i
                    class="fa-sharp fa-solid fa-arrow-up"
                    :class="{
                      'text-primary':
                        orderDirection === 'asc' && orderColumn === 'id',
                      'visually-hidden':
                        orderDirection !== '' &&
                        orderDirection !== 'asc' &&
                        orderColumn === 'id',
                    }"
                  ></i>
                  <i
                    class="fa-sharp fa-solid fa-arrow-down"
                    :class="{
                      'text-primary':
                        orderDirection === 'desc' && orderColumn === 'id',
                      'visually-hidden':
                        orderDirection !== '' &&
                        orderDirection !== 'desc' &&
                        orderColumn === 'id',
                    }"
                  ></i>
                </th>
                <th scope="col">Category</th>
                <th scope="col" @click="updateOrdering('title')">
                  Title
                  <i
                    class="fa-sharp fa-solid fa-arrow-up"
                    :class="{
                      'text-primary':
                        orderDirection === 'asc' && orderColumn === 'title',
                      'visually-hidden':
                        orderDirection !== '' &&
                        orderDirection !== 'asc' &&
                        orderColumn === 'title',
                    }"
                  ></i>
                  <i
                    class="fa-sharp fa-solid fa-arrow-down"
                    :class="{
                      'text-primary':
                        orderDirection === 'desc' && orderColumn === 'title',
                      'visually-hidden':
                        orderDirection !== '' &&
                        orderDirection !== 'desc' &&
                        orderColumn === 'title',
                    }"
                  ></i>
                </th>
                <th scope="col">Photo</th>
                <th scope="col">Content</th>
                <th scope="col" @click="updateOrdering('created_at')">
                  Created At
                  <i
                    class="fa-sharp fa-solid fa-arrow-up"
                    :class="{
                      'text-primary':
                        orderDirection === 'asc' &&
                        orderColumn === 'created_at',
                      'visually-hidden':
                        orderDirection !== '' &&
                        orderDirection !== 'asc' &&
                        orderColumn === 'created_at',
                    }"
                  ></i>
                  <i
                    class="fa-sharp fa-solid fa-arrow-down"
                    :class="{
                      'text-primary':
                        orderDirection === 'desc' &&
                        orderColumn === 'created_at',
                      'visually-hidden':
                        orderDirection !== '' &&
                        orderDirection !== 'desc' &&
                        orderColumn === 'created_at',
                    }"
                  ></i>
                </th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="post in posts.data" :key="post.id">
                <th scope="row">{{ post.id }}</th>
                <td>{{ post.category }}</td>
                <td>{{ post.title }}</td>
                <td v-if="!post.photo">
                  <img
                    src="https://www.contentviewspro.com/wp-content/uploads/2017/07/default_image.png"
                    alt=""
                    style="width: 100px"
                  />
                </td>
                <td v-else>
                  <img :src="post.photo" alt="" style="width: 100px" />
                </td>
                <td>{{ post.content }}</td>
                <td>{{ post.created_at }}</td>
                <td>
                  <router-link
                    :to="{ name: 'posts.edit', params: { id: post.id } }"
                    class="btn btn-warning me-1"
                  >
                    Edit
                  </router-link>
                  <a
                    href="#"
                    class="btn btn-danger ms-1"
                    @click="destroyPost(post.id)"
                  >
                    Delete
                  </a>
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
import { inject, onMounted, ref, watch } from "@vue/runtime-core";
import getPosts from "../../composables/getPosts";
import getCategories from "../../composables/getCategories";
import { Bootstrap5Pagination } from "laravel-vue-pagination";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const swal = inject("$swal");
let search_category = ref("");
let search_id = ref("");
let search_title = ref("");
let search_content = ref("");
let search_global = ref("");
let orderColumn = ref("created_at");
let orderDirection = ref("desc");

const { posts, fetchPost } = getPosts();
const { categories, fetchCategory } = getCategories();

onMounted(() => {
  fetchPost();
  fetchCategory();
});

const updateOrdering = (column) => {
  orderColumn.value = column;
  orderDirection.value = orderDirection.value === "asc" ? "desc" : "asc";
  fetchPost(
    1,
    search_category.value,
    search_id.value,
    search_title.value,
    search_content.value,
    search_global.value,
    orderColumn.value,
    orderDirection.value
  );
};

watch(search_id, (current, previous) => {
  fetchPost(
    1,
    search_category.value,
    current,
    search_title.value,
    search_content.value,
    search_global.value
  );
});
watch(search_category, (current, previous) => {
  fetchPost(
    1,
    current,
    search_id.value,
    search_title.value,
    search_content.value,
    search_global.value
  );
});
watch(search_title, (current, previous) => {
  fetchPost(
    1,
    search_category.value,
    search_id.value,
    current,
    search_content.value,
    search_global.value
  );
});
watch(search_content, (current, previous) => {
  fetchPost(
    1,
    search_category.value,
    search_id.value,
    search_title.value,
    current,
    search_global.value
  );
});
watch(search_global, (current, previous) => {
  fetchPost(
    1,
    search_category.value,
    search_id.value,
    search_title.value,
    search_content.value,
    current
  );
});

const destroyPost = async (id) => {
  swal({
    title: "Are you sure want to delete?",
    icon: "warning",
    text: "You will not be able to revert this action!",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    confirmButtonColor: "#ef4444",
    timer: 20000,
    timerProgressBar: true,
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .delete("/api/posts/" + id)
        .then((response) => {
          fetchPost();
          router.push("/");
          swal({
            icon: "success",
            title: "Post deleted successfully",
          });
        })
        .catch((err) => {
          swal({
            icon: "error",
            title: "Something went wrong!",
          });
        });
    }
  });
};
</script>

  <style scoped>
.fa-solid {
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
}
</style>

