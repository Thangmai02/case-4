import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CategoryPage.css'; // Import CSS file

const CategoryPage = () => {
    const [categories, setCategories] = useState([]);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [editingCategory, setEditingCategory] = useState(null);
    const [updatedCategoryName, setUpdatedCategoryName] = useState('');

    useEffect(() => {
        // Fetch all categories
        axios.get('http://localhost:8080/categories')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    const handleAddCategory = () => {
        axios.post('http://localhost:8080/categories', { name: newCategoryName })
            .then(response => {
                setCategories([...categories, response.data]);
                setNewCategoryName('');
            })
            .catch(error => {
                console.error('Error adding category:', error);
            });
    };

    const handleUpdateCategory = (id) => {
        axios.put(`http://localhost:8080/categories/${id}`, { name: updatedCategoryName })
            .then(response => {
                setCategories(categories.map(category =>
                    category.id === id ? response.data : category
                ));
                setEditingCategory(null);
                setUpdatedCategoryName('');
            })
            .catch(error => {
                console.error('Error updating category:', error);
            });
    };

    const handleDeleteCategory = (id) => {
        axios.delete(`http://localhost:8080/categories/${id}`)
            .then(() => {
                setCategories(categories.filter(category => category.id !== id));
            })
            .catch(error => {
                console.error('Error deleting category:', error);
            });
    };

    return (
        <div className="category-page">
            <h1>Danh sách danh mục</h1>
            <div className="add-category">
                <input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="Tên danh mục mới"
                />
                <button onClick={handleAddCategory}>Thêm danh mục</button>
            </div>
            <table className="category-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Tên danh mục</th>
                    <th>Hành động</th>
                </tr>
                </thead>
                <tbody>
                {categories.map(category => (
                    <tr key={category.id}>
                        <td>{category.id}</td>
                        <td>
                            {editingCategory === category.id ? (
                                <input
                                    type="text"
                                    value={updatedCategoryName}
                                    onChange={(e) => setUpdatedCategoryName(e.target.value)}
                                />
                            ) : (
                                category.name
                            )}
                        </td>
                        <td>
                            {editingCategory === category.id ? (
                                <button onClick={() => handleUpdateCategory(category.id)}>Cập nhật</button>
                            ) : (
                                <button onClick={() => {
                                    setEditingCategory(category.id);
                                    setUpdatedCategoryName(category.name);
                                }}>Sửa</button>
                            )}
                            <button onClick={() => handleDeleteCategory(category.id)}>Xóa</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CategoryPage;
