import axios from "axios";

const API_URL = 'http://localhost:8080/api/products';

const fetchProducts = () => axios.get(API_URL);
const createProduct = (product) => axios.post(API_URL, product);
const updateProduct = (product) => axios.put(`${API_URL}/${product.product_id}`, product);
const deleteProduct = (id) => axios.delete(`${API_URL}/${id}`);

export default {
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
};