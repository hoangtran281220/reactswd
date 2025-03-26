import 'react';

// eslint-disable-next-line react/prop-types
function ProductList({ products, onEdit, onDelete }) {
    return (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <caption style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px' }}>
                List Product
            </caption>
            <thead>
            <tr style={{ backgroundColor: '#f2f2f2', borderBottom: '1px solid #ddd' }}>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Price</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Category</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Brand</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Quantity</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Description</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actions</th>
            </tr>
            </thead>
            <tbody>
            {/* eslint-disable-next-line react/prop-types */}
            {products.map(product => (
                <tr key={product.productId} style={{ borderBottom: '1px solid #ddd' }}>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.name}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>${product.price.toFixed(2)}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.categoryName}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.brandName}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.stockQuantity}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.description}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                        <button onClick={() => onEdit(product)}>Edit</button>
                        <button onClick={() => onDelete(product.productId)}>Delete</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default ProductList;
