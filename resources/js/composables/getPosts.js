import axios from "axios";
import { ref } from "vue";

const getPosts = () => {
    const posts = ref({});
    const errorMessage = ref(null);

    const fetchPost = async (
        page = 1,
        search_category = "",
        search_id = "",
        search_title = "",
        search_content = "",
        search_global = "",
        order_column = "created_at",
        order_direction = "desc"
    ) => {
        try {
            let response = await axios.get(
                "/api/posts?page=" +
                    page +
                    "&search_category=" +
                    search_category +
                    "&search_id=" +
                    search_id +
                    "&search_title=" +
                    search_title +
                    "&search_content=" +
                    search_content +
                    "&search_global=" +
                    search_global +
                    "&order_column=" +
                    order_column +
                    "&order_direction=" +
                    order_direction
            );
            if (!response) {
                throw new Error("Data response not found!");
            }

            posts.value = response.data;
        } catch (error) {
            errorMessage.value = error.message;
        }
    };

    return { posts, errorMessage, fetchPost };
};

export default getPosts;
