const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div>
      <div className="bg-white/5 mt-[30px] backdrop-blur-md p-4 rounded-2xl border border-white/20 flex items-center gap-2 w-[640px] h-[68px] m-auto mb-[10px]">
        <img src="search.png" alt="Search Icon" />
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)} // Update search term on input change
          className="placeholder:text-white text-white w-[530px] h-[40px] rounded-2xl outline-none focus:ring-0 border-none"
        />
      </div>
      <h1 className="text-white text-center mt-[10px] text-[50px]"> {searchTerm}</h1>
    </div>
  );
};

export default Search;
