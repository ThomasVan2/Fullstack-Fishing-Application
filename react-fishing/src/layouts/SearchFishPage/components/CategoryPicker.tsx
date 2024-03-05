interface CategoryPickerProps {
  categories: string[];
  onCategoryChange: (category: string) => void;
}

// Functional component to render a dropdown for category selection.
const CategoryPicker: React.FC<CategoryPickerProps> = ({
  categories,
  onCategoryChange,
}) => {
  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id="categoryDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Select Category
      </button>
      <ul className="dropdown-menu" aria-labelledby="categoryDropdown">
        {/* Maps over the categories array to create a list item for each category. */}
        {categories.map((category, index) => (
          <li key={index}>
            {/* Button within each list item. Clicking it triggers the onCategoryChange callback with the selected category. */}
            <button
              className="dropdown-item"
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryPicker;
