import React, { useState, useEffect } from "react";
import axios from "axios";

function AddProductForm({ onSave, onClose }) {
    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        stockQuantity: "",
        category_id: "",
        brand_id: ""
    });

    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);

    // 📌 Gọi API lấy danh sách brands & categories
    useEffect(() => {
        axios.get("http://localhost:8080/api/brands")
            .then(response => setBrands(response.data))
            .catch(error => console.error("Error fetching brands:", error));

        axios.get("http://localhost:8080/api/categories")
            .then(response => setCategories(response.data))
            .catch(error => console.error("Error fetching categories:", error));
    }, []);

    // 📌 Xử lý thay đổi input
    const handleChange = (event) => {
        const { name, value } = event.target;

        setProduct(prev => ({
            ...prev,
            [name]: (name === "category_id" || name === "brand_id") ? (value ? parseInt(value) : "") : value
        }));
    };

    // 📌 Xử lý submit
    const handleSubmit = (event) => {
        event.preventDefault();

        // ✅ Định dạng dữ liệu đúng API yêu cầu
        const formattedProduct = {
            ...product,
            categoryId: product.category_id,
            brandId: product.brand_id
        };

        console.log("Submitting product:", formattedProduct); // 🛠 Debug
        onSave(formattedProduct);

        // 📌 Reset form sau khi submit
        setProduct({
            name: "",
            description: "",
            price: "",
            stockQuantity: "",
            category_id: "",
            brand_id: ""
        });
    };

    return (
        <div style={styles.container}>
            <h3 style={styles.title}>Add New Product</h3>
            <form onSubmit={handleSubmit} style={styles.form}>

                {/* Input Name, Description, Price, Quantity */}
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

                {/* Select Category */}
                <label style={styles.label}>
                    Category:
                    <select
                        name="category_id"
                        value={product.category_id || ""}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    >
                        <option value="">Select a category</option> {/* ✅ Giá trị mặc định */}
                        {categories.map(category => (
                            <option key={category.categoryId} value={category.categoryId}>
                                {category.categoryName}
                            </option>
                        ))}
                    </select>
                </label>

                {/* Select Brand */}
                <label style={styles.label}>
                    Brand:
                    <select
                        name="brand_id"
                        value={product.brand_id || ""}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    >
                        <option value="">Select a brand</option> {/* ✅ Giá trị mặc định */}
                        {brands.map(brand => (
                            <option key={brand.brandId} value={brand.brandId}>
                                {brand.brandName}
                            </option>
                        ))}
                    </select>
                </label>

                {/* Nút hành động */}
                <div style={styles.buttonContainer}>
                    <button
                        type="submit"
                        style={styles.button}
                        onMouseOver={(e) => e.target.style.backgroundColor = "#218838"}
                        onMouseOut={(e) => e.target.style.backgroundColor = "#28a745"}
                    >
                        Add Product
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        style={styles.closeButton}
                        onMouseOver={(e) => e.target.style.backgroundColor = "#c82333"}
                        onMouseOut={(e) => e.target.style.backgroundColor = "#dc3545"}
                    >
                        Close
                    </button>
                </div>
            </form>
        </div>
    );
}

// 💡 Styles (CSS)
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
    buttonContainer: {
        display: "flex",
        justifyContent: "space-between",
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
    closeButton: {
        padding: "10px",
        backgroundColor: "#dc3545",
        color: "white",
        border: "none",
        borderRadius: "5px",
        fontSize: "16px",
        cursor: "pointer",
        transition: "background 0.3s",
    },
};

export default AddProductForm;
