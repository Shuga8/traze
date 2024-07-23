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
  const [start, setStart] = useState(1);
  const [limit, setLimit] = useState(20);
  let derivativeIndex = 1;

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
                  {/* <tr>
                  <td className="sticky star">
                    <FaRegStar />
                  </td>
                  <td className="sticky">1</td>

                  <td className="sticky name">
                    <img src={img.btc_logo} alt="Coin Logo" />
                    <div>
                      Bitcoin
                      <br />
                      <small>BTC</small>
                    </div>
                  </td>

                  <td>$66,831.21</td>

                  <td className="negative">-0.25%</td>
                  <td className="negative">-0.54%</td>
                  <td className="negative">-6.12%</td>

                  <td>$1.32T</td>
                  <td>
                    $25,809,551,098 <br /> <span>394,647 BTC</span>
                  </td>
                  <td>19,712,137 BTC</td>
                </tr> */}

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
            <nav aria-label="Page navigation example" className="mt-2">
              <ul className="flex items-center -space-x-px h-8 text-sm">
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <span className="sr-only">Previous</span>
                    <span></span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    1
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    2
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    aria-current="page"
                    className="z-10 flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                  >
                    3
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    4
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    5
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <span className="sr-only">Next</span>
                    <svg
                      className="w-2.5 h-2.5 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
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
