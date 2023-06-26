import axios from "axios";
import {
  fetchDataStart,
  fetchDataSuccess,
  fetchDataFailure,
  setSetting,
  showData,
} from "./ProtocolSlice";

import {
  getUniqueChains,
  getUniqueCategories,
  filterProtocols,
  sortProtocols,
  paginateProtocols,
} from "../utils";
import config from "../config/config";

const fetchData = () => {
  const API_URL = config.apiUrl;
  return axios
    .get(`${API_URL}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const fetchProtocol = (setting) => async (dispatch) => {
  dispatch(fetchDataStart());
  try {
    const data = await fetchData();
    const chains = getUniqueChains(data);
    const categories = getUniqueCategories(data);
    dispatch(fetchDataSuccess(data));
    dispatch(
      setSetting({
        ...setting,
        totalPage: data.length,
        filterData: {
          ...setting.filterData,
          chains: chains,
          categories: categories,
        },
      })
    );
  } catch (error) {
    dispatch(fetchDataFailure(error.message));
  }
};

export const setSettinig = (setting) => (dispatch) => {
  dispatch(setSetting(setting));
};

export const showProtocol = (setting) => async (dispatch) => {
  try {
    const data = await fetchData();
    const filteredData = filterProtocols(data, setting);
    const sortedData = sortProtocols(filteredData, setting);
    const paginatedData = paginateProtocols(sortedData, setting);

    dispatch(showData(paginatedData));
    dispatch(
      setSetting({
        ...setting,
        totalPage: sortedData.length,
      })
    );
  } catch (error) {
    dispatch(fetchDataFailure(error.message));
  }
};
