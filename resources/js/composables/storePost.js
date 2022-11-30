import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

const storePost = () => {
    const posts = ref({});
    const validationError = ref(null);
    const router = useRouter();
    const addPost = async (post) => {
        try {
            let response = await axios.post("/api/posts", post);
            if (!response) {
                throw new Error("Data response not found!");
            }

            router.push("/");
        } catch (error) {
            if (error.response?.data) {
                validationError.value = error.response.data.errors;
            }
        }
    };

    return { validationError, addPost };
};

export default storePost;
