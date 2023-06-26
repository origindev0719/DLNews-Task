import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortUp,
  faSortDown,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";

import {
  fetchProtocol,
  setSettinig,
  showProtocol,
} from "../features/ProtocolActions";
import Header from "../components/Header";
import Spinner from "../components/common/Spinner";
import Paginations from "../components/Pagination";
import { rowCounts } from "../config/showRows";
import { tableHeaders } from "../config/theadConstant";

const AllProtocolsPage: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoading, setting, showData } = useSelector(
    (state: any) => state.protocol
  );
  const [protocolSetting, setProtocolSetting] = useState(setting);
  const [filterFlag, setFilterFlag] = useState(false);
  const [selectCategory, setSelectCategory] = useState(null);
  const [selectChain, setSelectChain] = useState(null);

  const handleSort = async (field) => {
    const settings = {
      ...setting,
      sortKeyword: field,
      sortDir: setting.sortDir === "asc" ? "desc" : "asc",
    };

    setProtocolSetting(settings);
    setSettinig(settings)(dispatch);
    await showProtocol(settings)(dispatch);
  };

  const handlePagination = async (e, page) => {
    const settings = {
      ...setting,
      currentPage: page,
    };

    setProtocolSetting(settings);
    await showProtocol(settings)(dispatch);
  };

  const handleChangePageRow = async (e) => {
    const { value } = e.target;
    const settings = {
      ...setting,
      pagePer: Number(value),
    };

    setProtocolSetting(settings);
    setSettinig(settings)(dispatch);
    await showProtocol(settings)(dispatch);
  };

  const handleCategoryChange = (selected) => {
    setSelectCategory(selected);
    const settings = {
      ...setting,
      filterItems: {
        ...setting.filterItems,
        category: selected && selected.label,
      },
    };

    setProtocolSetting(settings);
    setSettinig(settings)(dispatch);
    showProtocol(settings)(dispatch);
  };

  const handleChainChange = (selected) => {
    setSelectChain(selected);
    const settings = {
      ...setting,
      filterItems: {
        ...setting.filterItems,
        chain: selected && selected.label,
      },
    };

    setProtocolSetting(settings);
    setSettinig(settings)(dispatch);
    showProtocol(settings)(dispatch);
  };

  const handleClearFilter = () => {
    setSelectCategory(null);
    setSelectChain(null);
    const settings = {
      ...setting,
      filterItems: { ...setting.filterItems, chain: null, category: null },
    };
    setProtocolSetting(settings);
    setSettinig(settings)(dispatch);
    showProtocol(settings)(dispatch);
  };

  const handleFilter = () => {
    if (!filterFlag) {
      setFilterFlag(true);
    } else {
      setFilterFlag(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchProtocol(setting)(dispatch);
      } catch (error) {
        alert("Server Error");
      }
    };
    showProtocol(setting)(dispatch);
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    setProtocolSetting({ ...setting, totalPage: setting.totalPage });
  }, [setting]);

  return (
    <div className="w-full min-h-screen bg-slate-100">
      <Header />
      <div className="p-6 mt-12">
        <div className="flex justify-end">
          <div className="flex items-center w-3/5 sm:w-2/5 md:w-1/5">
            <p className="px-2 text-gray-600">Show rows</p>
            <select
              onChange={handleChangePageRow}
              id="countries"
              className="bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-6/12 p-2.5 dark:bg-gray-300 dark:border-gray-200 dark:placeholder-gray-400 dark:text-gray-700 dark:font-bold dark:focus:ring-blue-500 dark:focus:border-blue-200"
            >
              {rowCounts.map((value) => (
                <option value={value.key} key={value.key}>
                  {value.key}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center">
            <button
              className=" border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-12/12 py-2.5 px-5 dark:bg-gradient-to-r from-gray-300 to-slate-300 dark:border-gray-200 dark:placeholder-gray-400 dark:text-gray-700 dark:font-bold dark:focus:ring-blue-500 dark:focus:border-blue-200"
              onClick={handleFilter}
            >
              <FontAwesomeIcon icon={faFilter} className="px-3 align-center" />
              Filter
            </button>
          </div>
        </div>
        {filterFlag && (
          <div className="flex justify-between bg-white mt-5 p-3 rounded-md">
            <div className="flex">
              <Select
                value={selectCategory}
                onChange={handleCategoryChange}
                options={setting.filterData.categories}
                isClearable
                placeholder="Category"
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: state.isFocused ? "grey" : "gray",
                    marginRight: "1rem",
                  }),
                }}
              />

              <Select
                value={selectChain}
                onChange={handleChainChange}
                options={setting.filterData.chains}
                isClearable
                placeholder="Chains"
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: state.isFocused ? "grey" : "gray",
                  }),
                }}
              />
            </div>
            <div>
              <button
                className="px-4 py-2 text-sm bg-gray-400 text-gray-100 rounded-full"
                onClick={handleClearFilter}
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
        <div className="overflow-auto">
          <table className="mt-5 w-full bg-white min-w-max table-auto shadow-lg shadow-indigo-500/50 text-center rounded-md">
            <thead>
              <tr>
                {tableHeaders.map((value, index) => (
                  <th
                    key={index}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-6 text-left text-lg"
                    onClick={() => handleSort(value.key)}
                  >
                    {value.label}
                    {setting.sortKeyword === value.key && (
                      <FontAwesomeIcon
                        icon={setting.sortDir === "asc" ? faSortUp : faSortDown}
                        className="px-3 align-center"
                      />
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {!isLoading ? (
                showData &&
                showData.map((ele) => (
                  <tr key={ele.id} className="text-left">
                    <td className=" text-left p-6">{ele.id}</td>
                    <td className="flex p-6 justify-left items-center text-center">
                      <img
                        alt="logo"
                        className=" w-10 h-10 rounded-full"
                        src={ele.logo}
                      />
                      <span className="ml-2">{ele.name}</span>
                      {ele.symbol !== "-" && (
                        <span className="ml-2 text-sm px-3 bg-gradient-to-r from-purple-500 to-pink-500 text-gray-100 rounded-full">
                          {ele.symbol}
                        </span>
                      )}
                    </td>
                    <td className="p-6">{ele.tvl}</td>
                    <td className="p-6">{ele.change_1h}</td>
                    <td className="p-6">{ele.change_1d}</td>
                    <td className="p-6">{ele.change_7d}</td>
                  </tr>
                ))
              ) : (
                <Spinner />
              )}
            </tbody>
          </table>
        </div>
        <Paginations
          setting={protocolSetting}
          handlePagination={handlePagination}
        />
      </div>
    </div>
  );
};

export default AllProtocolsPage;
