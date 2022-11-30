import axios from "axios";
import { ref } from "vue";

const getCategories = () => {
    const categories = ref({});

    const errorMessage = ref(null);

    const fetchCategory = async () => {
        try {
            let response = await axios.get("/api/categories");

            if (!response) {
                throw new Error("Data response not found!");
            }
            categories.value = response.data.data;
        } catch (error) {
            errorMessage.value = error.message;
        }

    };

    return { categories, errorMessage, fetchCategory };
};

export default getCategories;
