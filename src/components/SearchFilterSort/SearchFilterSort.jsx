import "./SearchFilterSort.css";

const SearchFilterSort = () => {
  return (
    <section className="search-filter-sort-container">
      <i className="bi bi-search"></i>
      <input className="search-input" placeholder="Search" />
      <button className="btn">
        <i className="bi bi-funnel"></i>
      </button>
    </section>
  );
};

export { SearchFilterSort };
