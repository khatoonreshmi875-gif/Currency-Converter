import React, { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import { FaExchangeAlt } from "react-icons/fa";
import countryList from "./code";

// Make sure the file is named 'Dropdown.jsx' (or .js) and is located in 'src/Component'

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setconvertedAmount] = useState(null);
  const [converting, setconverting] = useState(false);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || ["INR", "EUR"]
  );
  function handleFavorites(currency) {}
  function swapCurrencies() {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }
  function handleFavorites(currency) {
    let updatedFavorites = [...favorites];
    if (favorites.includes(currency)) {
      updatedFavorites = updatedFavorites.filter((fav) => fav !== currency);
    } else {
      updatedFavorites.push(currency);
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  }
  const fetchCurrencies = async () => {
    setCurrencies(Object.keys(countryList));
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);
  async function handleConvertCurrency() {
    if (!amount || isNaN(amount)) return;
    setconverting(true);
    try {
      const res = await fetch(
        `https://2024-03-06.currency-api.pages.dev/v1/currencies/${fromCurrency.toLowerCase()}.json`
      );
      const data = await res.json();
      const rate = data[fromCurrency.toLowerCase()][toCurrency.toLowerCase()];
      const result = (amount * rate).toFixed(2);
      setconvertedAmount(`${result} ${toCurrency}`);
    } catch (error) {
      console.log("Error fetching", error);
    } finally {
      setconverting(false);
    }
  }
  <Dropdown />;
  return (
    <div className="max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md">
      <h2 className="mb-5 text-2xl font-semibold text-gray-500">
        currency converter
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <Dropdown
          currencies={currencies}
          title="From"
          currency={fromCurrency}
          setCurrency={setFromCurrency}
          handleFavorites={handleFavorites}
          favorites={favorites}
        />

        <div className="flex justify-center mb-2 sm:mb-0 ">
          <button
            className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300  "
            onClick={swapCurrencies}
          >
            <FaExchangeAlt className="text-xl text-gray-700" />
          </button>
        </div>
        <Dropdown
          currencies={currencies}
          title="To"
          currency={toCurrency}
          setCurrency={setToCurrency}
          handleFavorites={handleFavorites}
          favorites={favorites}
        />
      </div>
      <div className="mt-4">
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-500"
        >
          Amount:
        </label>
        <input
          onChange={(e) => {
            setAmount(e.target.value);
          }}
          value={amount}
          type="Number"
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1"
        />
      </div>
      <div className="flex justify-end mt-6">
        <button
          className={`px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
            converting ? "animate-pulse" : ""
          }`}
          onClick={handleConvertCurrency}
        >
          Convert
        </button>
      </div>
      <div className="mt-4 text-lg font-medium text-right text-green-800">
        Converted Amount:{convertedAmount}
      </div>
    </div>
  );
};

export default CurrencyConverter;
