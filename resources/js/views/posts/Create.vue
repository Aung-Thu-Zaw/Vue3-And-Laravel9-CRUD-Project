<template>
  <div>
    <div class="container p-5">
      <div class="row">
        <div class="col-2"></div>
        <div class="col-8">
          <div class="card p-3 shadow-sm">
            <form @submit.prevent="addPost(post)" enctype="multipart/form-data">
              <div class="mb-3">
                <label for="" class="mb-1">Title</label>
                <input type="text" class="form-control" v-model="post.title" />
                <div class="text-danger text-center">
                  <div
                    v-for="message in validationError?.title"
                    :key="message.title"
                  >
                    {{ message }}
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <label for="" class="mb-1">Content</label>
                <textarea
                  cols="30"
                  rows="6"
                  class="form-control"
                  v-model="post.content"
                ></textarea>
                <div class="text-danger text-center">
                  <div
                    v-for="message in validationError?.content"
                    :key="message.content"
                  >
                    {{ message }}
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <label for="" class="mb-1">Category</label>
                <select
                  class="form-select"
                  v-model="post.category_id"
                  aria-label="Default select example"
                >
                  <option selected value="">Select Category</option>
                  <option
                    v-for="category in categories"
                    :key="category.id"
                    :value="category.id"
                  >
                    {{ category.name }}
                  </option>
                </select>

                <div class="text-danger text-center">
                  <div
                    v-for="message in validationError?.category_id"
                    :key="message.category_id"
                  >
                    {{ message }}
                  </div>
                </div>
              </div>
              <div class="mb-3 d-grid">
                <button
                  :disabled="isLoading"
                  class="btn btn-secondary"
                  type="submit"
                >
                  <span v-if="isLoading">
                    <span
                      class="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Processing...
                  </span>
                  <span v-else>Save</span>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div class="col-2"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from "@vue/runtime-core";
import getCategories from "../../composables/getCategories";
import storePost from "../../composables/storePost";
export default {
  setup() {
    const post = reactive({
      category_id: "",
      title: "",
      content: "",
    });

    const { categories, fetchCategory } = getCategories();
    const { addPost, validationError, isLoading } = storePost();

    onMounted(() => {
      fetchCategory();
    });

    return {
      post,
      categories,
      addPost,
      validationError,
      isLoading,
    };
  },
};
</script>
