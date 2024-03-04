export const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  paginate: (pageNumber: number) => void;
}> = ({ currentPage, totalPages, paginate }) => {
  const pageNumber = [];

  // Logic to determine which page numbers to display based on the current page
  if (currentPage > 1) {
    if (currentPage >= 3) {
      pageNumber.push(currentPage - 2, currentPage - 1);
    } else {
      pageNumber.push(currentPage - 1);
    }
  }

  pageNumber.push(currentPage);

  if (totalPages >= currentPage + 1) {
    pageNumber.push(currentPage + 1);
  }
  if (totalPages >= currentPage + 2) {
    pageNumber.push(currentPage + 2);
  }

  return (
    <nav aria-label="Pagination">
      <ul className="pagination">
        <li
          className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
          onClick={() => paginate(1)}
        >
          <button className="page-link">First Page</button>
        </li>
        {pageNumber.map((number) => (
          <li
            key={number}
            onClick={() => paginate(number)}
            className={`page-item ${currentPage === number ? " active" : ""}`}
          >
            <button className="page-link">{number}</button>
          </li>
        ))}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
          onClick={() => paginate(totalPages)}
        >
          <button className="page-link">Last Page</button>
        </li>
      </ul>
    </nav>
  );
};
