import { GrSearch } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { fetchSearchResults } from "../../../redux/actionsCreators/searchQueryAction";
import { useRef, useEffect } from "react";
import { clearSearch, setSearchQuery } from "../../../redux/slices/searchQuery";
import { useSearchQuery } from "../../../hooks/useAppSelectors";

const SearchBar = () => {
    const dispatch = useDispatch();
    const debounceTimeout = useRef(null);
    const { searchQuery } = useSearchQuery();

    const handleSearchChange = async (e) => {
        const value = e.target.value;
        dispatch(setSearchQuery(value));

        if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

        if (value.length >= 3) {
            debounceTimeout.current = setTimeout(() => {
                dispatch(fetchSearchResults(value));
            }, 500);
        };

    };

    useEffect(() => {
        if (searchQuery.length < 1) {
            dispatch(clearSearch());
        }
    }, [dispatch, searchQuery]);

    return (
        <div className="relative w-full max-w-lg px-3 pt-3">
            <div className="absolute inset-y-0 left-5 flex items-center pt-3">
                <GrSearch className="w-6 h-6 text-neutral" />
            </div>
            <input
                type="search"
                name="search"
                value={searchQuery}
                onChange={handleSearchChange}
                id="search-navbar"
                className="block w-full pl-12 p-2 text-sm border border-gray-300 rounded-lg bg-tertiary text-neutral placeholder-neutral"
                placeholder="Search..."
            />
        </div>
    );
}

export default SearchBar;
