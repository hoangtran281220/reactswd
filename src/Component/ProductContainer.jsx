import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddProductForm from './AddForm.jsx';
import EditProductForm from './EditForm.jsx';
import ProductList from './ProductList.jsx';

function ProductContainer() {
    const [products, setProducts] = useState([]);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchProducts(); //
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const handleAddProduct = async (product) => {
        try {
            await axios.post("http://localhost:8080/api/products", product);
            fetchProducts();
            setCurrentProduct(null);
        } catch (error) {
            console.error("Error adding product:", error.response ? error.response.data : error.message);
        }
    };

    const handleEditProduct = async (product) => {
        if (!product.productId) {
            console.error("Error: Product ID is missing for update!");
            return;
        }
        try {
            await axios.put(`http://localhost:8080/api/products/${product.productId}`, product);
            fetchProducts();
            setCurrentProduct(null);
            setIsEditing(false);
        } catch (error) {
            console.error("Error editing product:", error.response ? error.response.data : error.message);
        }
    };

    const handleAddClick = () => {
        setCurrentProduct({ productId: "", name: "", description: "", price: "", stockQuantity: "", category_id: "", brand_id: "" });
        setIsEditing(false);
    };

    const handleEditClick = (product) => {
        setCurrentProduct(product);
        setIsEditing(true);
    };

    const handleDeleteProduct = async (id) => {
        if (!id) {
            console.error("Error: product_id is undefined!");
            return;
        }
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if (!confirmDelete) return;
        try {
            await axios.delete(`http://localhost:8080/api/products/${id}`);
            fetchProducts();
        } catch (error) {
            console.error("Error deleting product:", error.response ? error.response.data : error.message);
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                <button style={{ padding: '8px 12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={handleAddClick}>
                    Add New Product
                </button>
            </div>

            {currentProduct && (isEditing ?
                    <EditProductForm product={currentProduct} setProduct={setCurrentProduct} onEdit={handleEditProduct} />
                    :
                    <AddProductForm product={currentProduct} setProduct={setCurrentProduct} onSave={handleAddProduct} onClose={() => setCurrentProduct(null)} />
            )}

            <ProductList products={products} onEdit={handleEditClick} onDelete={handleDeleteProduct} />
        </div>
    );

}

export default ProductContainer;