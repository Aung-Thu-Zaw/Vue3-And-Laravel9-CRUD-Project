import axios from "axios";
import { ref } from "vue";

const getPosts = () => {
    const posts = ref([]);
    const errorMessage = ref(null);

    const fetchPost = async () => {
        try {
            let response = await axios.get("/api/posts");
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
