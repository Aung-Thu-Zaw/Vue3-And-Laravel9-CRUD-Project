import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

const storePost = () => {
    const validationError = ref(null);
    const router = useRouter();
    const isLoading = ref(false);
    const addPost = async (post) => {
        if (isLoading.value) return;
        isLoading.value = true;
        validationError.value = {};

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
        } finally {
            isLoading.value = false;
        }
    };

    return { validationError, addPost, isLoading };
};

export default storePost;
