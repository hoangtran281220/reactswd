import React, { useState, useEffect } from "react";
import axios from "axios";

function EditProductForm({ product, setProduct, onEdit }) {
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);

    // Gọi API để lấy danh sách brands & categories
    useEffect(() => {
        axios.get("http://localhost:8080/api/brands")
            .then(response => setBrands(response.data))
            .catch(error => console.error("Error fetching brands:", error));

        axios.get("http://localhost:8080/api/categories")
            .then(response => setCategories(response.data))
            .catch(error => console.error("Error fetching categories:", error));
    }, []);

    // Cập nhật categoryName & brandName khi có category_id hoặc brand_id
    useEffect(() => {
        const selectedCategory = categories.find(cat => cat.categoryId == product.category_id);
        if (selectedCategory) {
            setProduct(prev => ({ ...prev, categoryName: selectedCategory.categoryName }));
        }

        const selectedBrand = brands.find(brand => brand.brandId == product.brand_id);
        if (selectedBrand) {
            setProduct(prev => ({ ...prev, brandName: selectedBrand.brandName }));
        }
    }, [product.category_id, product.brand_id, categories, brands]);

    // Xử lý khi thay đổi input
    const handleChange = (event) => {
        const { name, value } = event.target;
        setProduct(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    // Xử lý submit form
    const handleSubmit = (event) => {
        event.preventDefault();
        onEdit(product);
    };

    return (
        <div style={styles.container}>
            <h3 style={styles.title}>Edit Product</h3>
            <form onSubmit={handleSubmit} style={styles.form}>
                {/* Các input Name, Description, Price, Quantity */}
                {[
                    { label: "Name", name: "name", type: "text" },
                    { label: "Description", name: "description", type: "textarea" },
                    { label: "Price", name: "price", type: "number" },
                    { label: "Quantity", name: "stockQuantity", type: "number" }
                ].map(({ label, name, type }) => (
                    <label key={name} style={styles.label}>
                        {label}:
                        {type === "textarea" ? (
                            <textarea
                                name={name}
                                value={product[name] || ""}
                                onChange={handleChange}
                                style={styles.input}
                            />
                        ) : (
                            <input
                                type={type}
                                name={name}
                                value={product[name] || ""}
                                onChange={handleChange}
                                required={name !== "description"}
                                style={styles.input}
                            />
                        )}
                    </label>
                ))}

                {/* Chọn Category */}
                <label style={styles.label}>
                    Category:
                    <select
                        name="category_id"
                        value={product.category_id || ""}
                        onChange={handleChange}
                        style={styles.input}
                    >
                        <option value="">{product.categoryName}</option>
                        {categories.map(category => (
                            <option key={category.categoryId} value={category.categoryId}>
                                {category.categoryName}
                            </option>
                        ))}
                    </select>
                </label>
                {/* Chọn Brand */}
                <label style={styles.label}>
                    Brand:
                    <select
                        name="brand_id"
                        value={product.brand_id || ""}
                        onChange={handleChange}
                        style={styles.input}
                    >
                        <option value="">{product.brandName}</option>
                        {brands.map(brand => (
                            <option key={brand.brandId} value={brand.brandId}>
                                {brand.brandName}
                            </option>
                        ))}
                    </select>
                </label>
                {/* Nút Submit */}
                <button type="submit" style={styles.button}
                        onMouseOver={(e) => e.target.style.backgroundColor = "#218838"}
                        onMouseOut={(e) => e.target.style.backgroundColor = "#28a745"}
                >
                    Update Product
                </button>
            </form>
        </div>
    );
}

// 💡 Styles
const styles = {
    container: {
        margin: "20px auto",
        padding: "20px",
        maxWidth: "400px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    title: {
        textAlign: "center",
        color: "#333",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
    },
    label: {
        fontWeight: "bold",
        display: "flex",
        flexDirection: "column",
        gap: "5px",
    },
    input: {
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        fontSize: "14px",
    },
    button: {
        padding: "10px",
        backgroundColor: "#28a745",
        color: "white",
        border: "none",
        borderRadius: "5px",
        fontSize: "16px",
        cursor: "pointer",
        transition: "background 0.3s",
    },
};

export default EditProductForm;
