import React from "react";
import "./Search.css";
import { useState } from "react";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import ItemGallery from "../../components/ItemGallery/ItemGallery";
import FilterWithSearch from "../../components/FilterWithSearch/FilterWithSearch";
import { useSelector, useDispatch } from "react-redux";
import { searchSlice } from "../../store/slices";
import {} from "../../store/slices";
const Search = () => {
  const [isInputSelected, setIsInputSelected] = useState(true);

  const { text } = useSelector((state) => state.language);
  const {
    textSearch,
    categorySearchInput,
    categorySearchApplied,
    locationSearchInput,
    locationSearchApplied,
    priceSearchInput,
    priceSearchApplied,
    conditionSearchInput,
    conditionSearchApplied,

    categories,
    conditions,
    locations,
  } = useSelector((state) => state.search);

  const {
    setCategorySearchInput,
    setCategorySearchApplied,
    setLocationSearchInput,
    setLocationSearchApplied,
    setPriceSearchInput,
    setPriceSearchApplied,
    setConditionSearchInput,
    setConditionSearchApplied,
  } = searchSlice.actions;

  const dispatch = useDispatch();

  const handleSearchSubmit = () => {
    console.log("im in handleSearchSubmit");
  };

  return (
    <div className="search" data-testid="search">
      <div className="nothing"></div>

      <div className="search_input_wrapper">
        {isInputSelected ? (
          <Input
            value={textSearch}
            onChange={(e) =>
              dispatch(searchSlice.actions.setTextSearch(e.target.value))
            }
          />
        ) : (
          <div className="search_input_wrapper_display">{textSearch}</div>
        )}
      </div>

      <ItemGallery>
        <FilterWithSearch
          nameOfFilter={"category"}
          searchInput={categorySearchInput}
          searchApplied={categorySearchApplied}
          searchOptions={categories}
          setSearchInput={setCategorySearchInput}
          setSearchApplied={setCategorySearchApplied}
        />
        <FilterWithSearch
          nameOfFilter={"location"}
          searchInput={locationSearchInput}
          searchApplied={locationSearchApplied}
          searchOptions={locations}
          setSearchInput={setLocationSearchInput}
          setSearchApplied={setLocationSearchApplied}
        />
        <FilterWithSearch
          nameOfFilter={"condition"}
          searchInput={conditionSearchInput}
          searchApplied={conditionSearchApplied}
          searchOptions={conditions}
          setSearchInput={setConditionSearchInput}
          setSearchApplied={setConditionSearchApplied}
        />
        <FilterWithSearch
          nameOfFilter={"price"}
          searchInput={categorySearchInput}
          searchApplied={categorySearchApplied}
          searchOptions={categories}
          setSearchInput={setPriceSearchInput}
          setSearchApplied={setPriceSearchApplied}
        />
      </ItemGallery>

      <Button
        className={"search_submit_btn"}
        value={text.default.search.submit}
        onClick={() => handleSearchSubmit()}
      />
    </div>
  );
};

export default Search;
