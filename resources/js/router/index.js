import { createRouter, createWebHistory } from "vue-router";
// import Authenticated from "../layouts/Authenticated.vue";
// import Guest from "../layouts/Guest.vue";
import Index from "../views/posts/Index.vue";
import Create from "../views/posts/Create.vue";
import Edit from "../views/posts/Edit.vue";
// import Login from "../components/Login.vue";

const routes = [
    {
        path: "/",
        name: "posts.index",
        component: Index,
        meta: { title: "crud project with vue3 and laravel9" },
    },
    {
        path: "/posts/create",
        name: "posts.create",
        component: Create,
        meta: { title: "create posts here" },
    },
    {
        path: "/posts/edit/:id",
        name: "posts.edit",
        component: Edit,
        props: true,
        meta: { title: "edit posts here" },
    },
    // {
    //     path: "/",
    //     name: "posts.index",
    //     component: Guest,
    //     meta: { title: "crud project with vue3 and laravel9" },
    // },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
