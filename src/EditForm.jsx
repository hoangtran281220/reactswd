import React from 'react';

function EditProductForm({ product, setProduct, onEdit }) {
    const handleChange = (event) => {
        const { name, value } = event.target;
        setProduct((prev) => ({
            ...prev,
            [name]: value,
            productId: prev.productId || "" // Giữ nguyên product_id
        }));

    };


    const handleSubmit = (event) => {
        event.preventDefault();
        onEdit(product); // Giữ nguyên vì onEdit đã được truyền từ container
    };

    return (
        <div style={{ margin: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h3>Edit Product</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input
                    type="text"
                    name="name"
                    value={product.name || ''}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                />
                <textarea
                    name="description"
                    value={product.description || ''}
                    onChange={handleChange}
                    placeholder="Description"
                />
                <input
                    type="number"
                    name="price"
                    value={product.price || ''}
                    onChange={handleChange}
                    placeholder="Price"
                    required
                />
                <input
                    type="number"
                    name="stockQuantity"
                    value={product.stockQuantity || ''}
                    onChange={handleChange}
                    placeholder="Quantity"
                    required
                />
                <input
                    type="number"
                    name="category_id"
                    value={product.category_id || 1}
                    onChange={handleChange}
                    placeholder="Category ID"
                />
                <input
                    type="number"
                    name="brand_id"
                    value={product.brand_id || 1}
                    onChange={handleChange}
                    placeholder="Brand ID"
                />
                <button type="submit">Update Product</button>
            </form>
        </div>
    );
}

export default EditProductForm;
