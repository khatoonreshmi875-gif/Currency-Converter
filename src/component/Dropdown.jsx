import React from "react";
import { BsFillStarFill, BsStar } from "react-icons/bs";
import countryList from "./code";
const Dropdown = ({
  currencies,
  currency,
  setCurrency,
  favorites,
  handleFavorites,
  title = "",
}) => {
  const isFavorites = (curr) => favorites.includes(curr);

  let countryCode = countryList[currency];

  return (
    <div>
      <label
        htmlFor={title}
        className="block text-sm font-medium text-gray-700"
      >
        {title}
      </label>
      <div className="flex ">
        <div className="w-full relative p-2 border border-gray-400  rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 flex ">
          <img
            src={`https://flagsapi.com/${countryCode}/flat/64.png`}
            alt="flag"
            className=" h-[2rem]"
          />

          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="p-1 w-full focus:outline-none"
          >
            {favorites.map((currency) => {
              return (
                <option className="bg-gray-200" value={currency} key={currency}>
                  {currency}
                </option>
              );
            })}
            <hr />
            {currencies
              .filter((c) => !favorites.includes(c))
              .map((currency) => {
                return (
                  <option value={currency} key={currency}>
                    {currency}
                  </option>
                );
              })}
          </select>
        </div>
        <button
          className="relative right-10 "
          onClick={() => {
            handleFavorites(currency);
          }}
        >
          {isFavorites(currency) ? <BsFillStarFill /> : <BsStar />}
        </button>
      </div>
    </div>
  );
};

export default Dropdown;
