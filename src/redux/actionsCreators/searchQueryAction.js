import axiosCustomer from "../../utils/axiosCustomer";
import { GET_ROUTES } from '../../constant';
import { setSearchResults, setLoading, setError } from '../slices/searchQuery';


export const fetchSearchResults = (searchQuery) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await axiosCustomer.post(GET_ROUTES.SEARCH_PRODUCTS, {
                searchItem: searchQuery
            });
            if (response.data.success) {
                dispatch(setSearchResults(response.data.products));
            } else {
                dispatch(setError("No products found"));
            }
        } catch (error) {
            dispatch(setError(error.response?.data?.error || "Failed to fetch search results"));
        } finally {
            dispatch(setLoading(false));
        }
    };
}