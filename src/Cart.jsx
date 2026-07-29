import React, { useState, useEffect } from "react";

const Cart = () => {

    const limit = 12;

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedcategory] = useState(null);
    const [pageNo, setPageNo] = useState(1);
    const [totalProductsCount, setTotalProductsCount] = useState(0);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    const fetchProducts = async () => {
        try {

            const skip = 0;

            let url = "https://dummyjson.com/products";

            if (selectedCategory) {
                url = `https://dummyjson.com/products/category/${selectedCategory.slug}`;
            }


            url += `?limit=${limit}&skip=${ (pageNo - 1) * limit}`;

            const response = await fetch(url)
            const data = await response.json()
            setProducts(data.products);
            setTotalProductsCount(data.total);

        } catch (error) {
            console.log('Error fetching data')
        }
    }

    async function fetchCategories() {
        const response = await fetch("https://dummyjson.com/products/categories")
        const data = await response.json()
        console.log(data)
        setCategories(data)
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [selectedCategory, pageNo]);

    return (
        <div className="products-container">
            {/* Sidebar */}
            <div className="sidebar">
                <div className="sidebar-section">
                    <h3>Search</h3>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search products..."
                    />
                </div>

                <div className="sidebar-section">
                    <h3>Categories</h3>
                    <ul className="category-list">
                        <li className={`category-item ${selectedCategory === null ? "active" : ""}`} onClick={() => setSelectedcategory(null)} >All Categories
                        </li>
                        {categories.map((category, index) => {
                            return (
                                <li key={index} className={`category-item ${selectedCategory === category ? "active" : ""}`}
                                    onClick={() => {
                                        setPageNo(1);
                                        setSelectedcategory(category);

                                    }} >{category.name}</li>
                            );
                        })}
                    </ul>
                </div>
            </div>

            {/* Main Content */}
            <div className="products-main">
                <div className="products-header">
                    <div>
                        <h1>Our Products</h1>
                        <p>Showing 8 products</p>
                    </div>
                    <button className="cart-button" onClick={toggleModal}>
                        <span className="cart-icon">🛒</span>
                        <span className="cart-text">Cart</span>
                        <span className="cart-count">0</span>
                    </button>
                </div>

                <div className="products-grid">
                    {/* Product Card 1 */}
                    {products.map((itm) => {
                        return (
                            <div className="product-card " key={itm.id}>

                                <div className="product-image">
                                    <img src={itm.thumbnail} alt={itm.title} />
                                </div>
                                <div className="product-details">
                                    <p className="product-category">{itm.category}</p>
                                    <h3 className="product-name">{itm.title}</h3>
                                    <div className="product-tags">
                                        {itm.tags.map((tag, index) => {
                                            return (

                                                <span key={index} className="tag">{tag}</span>
                                            )
                                        })}
                                    </div>
                                    <p className="product-description">{itm.description}</p>
                                    <div className="product-footer">
                                        <span className="product-price">${itm.price}</span>
                                        <button className="btn-add-to-cart">Add to Cart</button>
                                    </div>
                                </div>

                            </div>
                        )
                    })}


                </div>  

                {totalProductsCount > limit && (

                <div className="products-pagination" aria-label="Products pagination">
                    <button type="button" className="pagination-btn" disabled>
                        Previous
                    </button>

                    <div className="pagination-pages">

                        {Array.from({ length: Math.ceil(totalProductsCount / limit) }, (_, index) => {
                            const page = index + 1;
                            return (
                                <button
                                    key={page}
                                    type="button"
                                    className={`pagination-btn ${page === pageNo ? "active" : ""}`}
                                    onClick={() => setPageNo(page)}
                                >
                                    {page}
                                </button>
                            );
                        })}
                    </div>

                    <button type="button" className="pagination-btn">
                        Next
                    </button>
                </div>)}
            </div>

            <div className="modal" tabIndex="-1" role="dialog" style={{ display: isModalOpen ? 'block' : 'none' }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => {
                                toggleModal()
                            }}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Modal body text goes here.</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;

