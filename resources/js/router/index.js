import { createRouter, createWebHistory } from "vue-router";
import Index from "../views/posts/Index.vue";
import Create from "../views/posts/Create.vue";
// import Edit from "../views/posts/Edit.vue";

const routes = [
    {
        path: "/",
        name: "post.index",
        component: Index,
        meta: { title: "crud project with vue3 and laravel9" },
    },
    {
        path: "/posts/create",
        name: "post.create",
        component: Create,
        meta: { title: "create posts here" },
    },
    // {
    //     path: "/post/:id/edit",
    //     name: "post.edit",
    //     component: Edit,
    // },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
