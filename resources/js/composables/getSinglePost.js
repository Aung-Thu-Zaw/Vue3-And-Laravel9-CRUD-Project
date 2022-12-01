import axios from "axios";
import { ref } from "vue";

const getSinglePost = () => {
    const post = ref(null);
    const errorMessage = ref(null);

    const fetchSinglePost = async (id) => {
        try {
            let response = await axios.get("/api/posts/" + id);

            if (!response) throw new Error("Post Not Found!");
            post.value = response.data.data;
        } catch (error) {
            errorMessage.value = error.message;
        }
    };

    return { fetchSinglePost, errorMessage, post };
};

export default getSinglePost;
