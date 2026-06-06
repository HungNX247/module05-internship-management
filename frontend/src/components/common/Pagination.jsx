import "../../styles/common-components.css";

function Pagination({ page = 1, totalPages = 1, onPageChange }) {
  return (
    <div className="pagination">
      <button
        className="pagination-button"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        Trước
      </button>

      <span className="pagination-info">
        Trang {page} / {totalPages}
      </span>

      <button
        className="pagination-button"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Sau
      </button>
    </div>
  );
}

export default Pagination;
