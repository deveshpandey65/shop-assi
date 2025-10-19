import api from "./api";

 const getProducts = async () => {
    try {
        const response = await api.get("/items");
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};


const getProductById = async (id) => {
    try {
        const response = await api.get(`/items/search?id=${id}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error("Error fetching product:", error);
        throw error;
    }
};


 const addProduct = async (productData) => {
    try {
        const response = await api.post("/items", productData);
        return response.data;
    } catch (error) {
        console.error("Error adding product:", error);
        throw error;
    }
};





export default { getProducts, getProductById, addProduct };