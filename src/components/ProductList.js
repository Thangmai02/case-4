import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../pages/css/ProductList.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8080/api/product')
            .then(response => {
                const menProducts = response.data.filter(product => product.category && product.category.id === 1);
                setProducts(menProducts);
            })
            .catch(error => {
                setError('Không thể tải sản phẩm. Vui lòng kiểm tra kết nối.');
                console.error('Có lỗi xảy ra:', error);
            });
    }, []);

    const handleAddToCart = (productId) => {
        console.log(`Thêm sản phẩm ${productId} vào giỏ hàng`);
    };

    const handleBuyNow = (productId) => {
        console.log(`Mua ngay sản phẩm ${productId}`);
    };

    const handleViewDetails = (productId) => {
        navigate(`/product/${productId}`); // Điều hướng đến trang chi tiết sản phẩm
    };

    if (error) {
        return <div className="container">{error}</div>;
    }

    return (
        <div className="bodyProduct">
                <div className="bannercate">
                    <img src={'https://www.converse.vn/media/catalog/category/Men_s_Shoes_1.jpg'} alt="Banner"/>
                </div>
                <div className="container">
                    <div className="listProduct">
                        {products.length === 0 ? (
                            <p className="no-products">Không có sản phẩm nào để hiển thị.</p>
                        ) : (
                            <div className="products-grid">
                                {products.map(product => (
                                    <div
                                        key={product.id}
                                        className="product-item"
                                        onClick={() => handleViewDetails(product.id)}
                                        style={{cursor: 'pointer'}}
                                    >
                                        <div>
                                            {product.images && product.images.length > 0 ? (
                                                <img src={product.images[0]} alt={product.name}/>
                                            ) : (
                                                <p>Không có hình ảnh</p>
                                            )}
                                            <h2>{product.name}</h2>
                                            <p>{product.description}</p>
                                            <p>Giá: {product.price} VNĐ</p>
                                            <p>Danh
                                                mục: {product.category ? product.category.name : 'Không có danh mục'}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

    );
};

export default ProductList;
