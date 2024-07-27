import React, { useEffect, useState } from "react";
import { IoFilter } from "react-icons/io5";
import { FaRegStar } from "react-icons/fa";
import * as img from "./coins.js";

const Analysis = () => {
  const [activeTab, setActiveTab] = useState("derivatives");
  const [filterActive, setActiveFilter] = useState(false);
  const [favoriteActive, setFavoriteActive] = useState(false);
  const [derivativeData, setDerivativeData] = useState([]);
  const [derivateLoading, isDerivativeLoading] = useState(true);
  const [start, setStart] = useState(21);
  const [limit, setLimit] = useState(20);
  let derivativeIndex = 21;

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await fetch(`/api/external/cmp/index/${start}/${limit}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        let data = await response.json();
        setDerivativeData(data);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        isDerivativeLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="tz__crypto-analysis-container">
      <h2>Cryptocurrency Data Analysis</h2>

      <section className="tz__analysis-actions-container">
        <div className="tz__type-actions">
          <div className="tz__type-actions-buttons">
            <button
              type="button"
              className={`analysis-action-button derivate ${
                activeTab === "derivatives" ? "active" : ""
              }`}
              role="tab"
              onClick={() => setActiveTab("derivatives")}
            >
              Derivatives
            </button>
            &nbsp;
            <button
              type="button"
              className={`analysis-action-button spot ${
                activeTab === "spot" ? "active" : ""
              }`}
              role="tab"
              onClick={() => setActiveTab("spot")}
            >
              Spot
            </button>
          </div>
        </div>

        <div className="tz__view-actions">
          <div className="tz__view-actions-buttons flex flex-row">
            <button
              className={`${
                filterActive ? "active" : ""
              } flex flex-row items-center`}
              onClick={() => setActiveFilter(!filterActive)}
            >
              <IoFilter />
              &nbsp;Filter
            </button>
            &nbsp;
            <button
              className={`${
                favoriteActive ? "active" : ""
              } flex flex-row items-center`}
              onClick={() => setFavoriteActive(!favoriteActive)}
            >
              <FaRegStar />
              &nbsp;Favorites
            </button>
          </div>
        </div>
      </section>

      <section className="tz__analysis-tabs-content">
        {activeTab === "derivatives" && (
          <>
            <div className="tab-content derivative-tab-content">
              <table>
                <thead>
                  <tr>
                    <th className="fav-head sticky"></th>
                    <th className="sticky">#</th>
                    <th className="name sticky">Name</th>

                    <th>Price</th>
                    <th>1hr %</th>
                    <th>24hr %</th>
                    <th>7d %</th>
                    <th>Market Cap</th>
                    <th>Volume 24h</th>
                    <th>Circulation Supply</th>
                    <th className="text-left">Market Cap Dominance</th>
                  </tr>
                </thead>

                <tbody>
                  {derivativeData.map((coin) => {
                    let price = parseFloat(coin.quote.USD.price);
                    let change_in_24 = parseFloat(coin.quote.USD.volume_24h);
                    let converted = Math.round(
                      change_in_24 / price
                    ).toLocaleString("en-us");

                    let market_cap = parseFloat(
                      coin.quote.USD.market_cap.toFixed(0)
                    );
                    return (
                      <tr key={coin.id}>
                        <td className="sticky star">
                          <FaRegStar title="Add to favorite" />
                        </td>

                        <td className="sticky">{derivativeIndex++}</td>

                        <td className="sticky name">
                          <img
                            src={img[`${coin.symbol.toLowerCase()}_logo`]}
                            alt="Coin Logo"
                          />
                          <div>
                            {coin.name}
                            <br />
                            <small>{coin.symbol}</small>
                          </div>
                        </td>

                        <td className="text-center">
                          $
                          {parseFloat(
                            coin.quote.USD.price.toFixed(2)
                          ).toLocaleString("en-us", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </td>

                        <td
                          className={
                            coin.quote.USD.percent_change_1h > 0
                              ? "positive"
                              : "negative"
                          }
                        >
                          {coin.quote.USD.percent_change_1h.toFixed(2)}%
                        </td>

                        <td
                          className={
                            coin.quote.USD.percent_change_24h > 0
                              ? "positive"
                              : "negative"
                          }
                        >
                          {coin.quote.USD.percent_change_24h
                            .toFixed(2)
                            .toLocaleString("en-us")}
                          %
                        </td>

                        <td
                          className={
                            coin.quote.USD.percent_change_7d > 0
                              ? "positive"
                              : "negative"
                          }
                        >
                          {coin.quote.USD.percent_change_7d.toFixed(3)}%
                        </td>

                        <td className="text-center">
                          ${market_cap.toLocaleString("en-us")}
                        </td>

                        <td className="text-right">
                          $
                          {parseFloat(
                            coin.quote.USD.volume_24h.toFixed(0)
                          ).toLocaleString("en-us")}
                          <p className="text-xs text-right text-gray-500">
                            {converted} {coin.symbol}
                          </p>
                        </td>

                        <td className="text-center">
                          {Math.round(coin.circulating_supply).toLocaleString(
                            "en-us"
                          )}{" "}
                          {coin.symbol}
                        </td>

                        <td className="text-left">
                          $
                          {parseFloat(
                            coin.quote.USD.market_cap_dominance
                          ).toLocaleString("en-us", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 4,
                          })}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <nav className="mt-2">
              <ul className="flex items-center -space-x-px h-8 text-sm">
                <li>
                  <a className="flex cursor-pointer items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-transparent border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <span className="sr-only">Previous</span>
                    <span class="material-symbols-outlined text-xs">
                      arrow_back_ios
                    </span>
                  </a>
                </li>
                <li>
                  <a className="flex cursor-pointer items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-transparent border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    1
                  </a>
                </li>
                <li>
                  <a className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-transparent border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    2
                  </a>
                </li>
                <li>
                  <a className="flex cursor-pointer items-center justify-center px-3 h-8 leading-tight text-gray-500 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    3
                  </a>
                </li>
                <li>
                  <a className="flex cursor-pointer items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-transparent border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    4
                  </a>
                </li>
                <li>
                  <a className="flex cursor-pointer items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-transparent border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    5
                  </a>
                </li>
                <li>
                  <a className="flex cursor-pointer items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-transparent border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <span className="sr-only">Next</span>
                    <span className="material-symbols-outlined text-xs">
                      arrow_forward_ios
                    </span>
                  </a>
                </li>
              </ul>
            </nav>
          </>
        )}

        {activeTab === "spot" && (
          <div className="tab-content spot-tab-content">only spot</div>
        )}
      </section>
    </section>
  );
};

export default Analysis;
