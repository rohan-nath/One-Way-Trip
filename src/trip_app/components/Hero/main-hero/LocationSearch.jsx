import { openFullScreen } from "@/features/input-box/inputBoxSlice";
import { useDispatch } from "react-redux";

const SearchBar = ({ cName,valueKey, placeholder, value = "" }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    const data = {
      valueKey,
      isFullScreen: true,
      value

    };
    dispatch(openFullScreen(data));
  };

  return (
    <div className="searchMenu-loc px-30 lg:py-20 lg:px-0 js-form-dd js-liverSearch">
      <h4 className="text-15 fw-500 ls-2 lh-16">{cName}</h4>
      <div className="text-15 text-light-1 ls-2 lh-16">
        <input
          autoComplete="off"
          type="search"
          placeholder={placeholder}
          className="js-search js-dd-focus"
          value={value}
          onChange={(e) => e.preventDefault()}
          onClick={(e) => {
            e.currentTarget.blur();
            handleClick();
          }}
        />
      </div>
    </div>
  );
};

export default SearchBar;
