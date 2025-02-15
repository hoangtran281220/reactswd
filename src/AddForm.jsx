import React, { useState } from 'react';

function AddProductForm({ onSave, onClose  }) {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        stockQuantity: '',
        category_id: '',
        brand_id: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProduct(prevProduct => ({ ...prevProduct, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSave(product);
        setProduct({
            name: '',
            description: '',
            price: '',
            stockQuantity: '',
            category_id: '',
            brand_id: ''
        });
    };

    return (
        <div style={{ margin: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h2>Add New Product</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input
                    type="text"
                    name="name"
                    value={product.name || ""}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                />
                <textarea
                    name="description"
                    value={product.description || ""}
                    onChange={handleChange}
                    placeholder="Description"
                />
                <input
                    type="number"
                    name="price"
                    value={product.price || 0}
                    onChange={handleChange}
                    placeholder="Price"
                    required
                />
                <input
                    type="number"
                    name="stockQuantity"
                    value={product.stockQuantity || 0}
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
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button type="submit" style={{ padding: '8px 12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                        Add Product
                    </button>
                    <button type="button" onClick={onClose} style={{ padding: '8px 12px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                        Close
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddProductForm;
