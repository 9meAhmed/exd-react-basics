const Sidebar = ({ categories, selectedCategory, onCategoryChange, searchQuery, onSearchChange }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-section">
        <h3>Search</h3>
        <input
          type="text"
          className="search-input"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="sidebar-section">
        <h3>Categories</h3>
        <ul className="category-list">
          <li
            className={selectedCategory === 'all' ? 'active' : ''}
            onClick={() => onCategoryChange('all')}
          >
            All Products
          </li>
          {categories.map((category) => (
            <li
              key={category}
              className={selectedCategory === category ? 'active' : ''}
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
