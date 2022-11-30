<template>
  <div>
    <h1 class="text-center text-secondary pt-5 fw-bold">Edit Posts Here</h1>
    <div class="container p-5">
      <div class="row">
        <div class="col-2"></div>
        <div class="col-8">
          <div class="card p-3 shadow-sm">
            <form>
              <div class="mb-3">
                <label for="" class="mb-1">Category</label>
                <select class="form-select" aria-label="Default select example">
                  <option selected>Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="" class="mb-1">Title</label>
                <input type="text" class="form-control" />
              </div>
              <div class="mb-3">
                <label for="" class="mb-1">Content</label>
                <textarea
                  name=""
                  cols="30"
                  rows="6"
                  class="form-control"
                ></textarea>
              </div>
              <div class="mb-3 d-grid">
                <button class="btn btn-secondary">Update</button>
              </div>
            </form>
          </div>
        </div>
        <div class="col-2"></div>
      </div>
    </div>
  </div>
</template>

