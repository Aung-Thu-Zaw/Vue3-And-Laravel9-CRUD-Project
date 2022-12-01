import axios from "axios";
import { ref, inject } from "vue";
import { useRouter } from "vue-router";

const editPost = () => {
    const validationError = ref(null);
    const router = useRouter();
    const isLoading = ref(false);
    const swal = inject("$swal");
    const updatePost = async (post) => {
        if (isLoading.value) return;
        isLoading.value = true;
        validationError.value = {};
        try {
            let response = await axios.put("/api/posts/" + post.id, post);
            if (!response) {
                throw new Error("Data response not found!");
            }
            router.push("/");
            swal({
                icon: "success",
                title: "Post updated successfully",
            });
        } catch (error) {
            if (error.response?.data) {
                validationError.value = error.response.data.errors;
            }
        } finally {
            isLoading.value = false;
        }
    };
    return { validationError, updatePost, isLoading };
};

export default editPost;
