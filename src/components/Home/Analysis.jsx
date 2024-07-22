import React, { useEffect, useState } from "react";
import { IoFilter } from "react-icons/io5";
import { FaRegStar } from "react-icons/fa";
import * as img from "./coins.js";

import axios from "axios";

const Analysis = () => {
  const [activeTab, setActiveTab] = useState("derivatives");
  const [filterActive, setActiveFilter] = useState(false);
  const [favoriteActive, setFavoriteActive] = useState(false);
  const [derivativeData, setDerivativeData] = useState([]);
  const [derivateLoading, isDerivativeLoading] = useState(true);
  let derivativeIndex = 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await fetch(`/api/external/cmp/index/1/20`);
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
    <section className="vnode__crypto-analysis-container">
      <h2>Cryptocurrency Data Analysis</h2>

      <section className="vnode__analysis-actions-container">
        <div className="vnode__type-actions">
          <div className="vnode__type-actions-buttons">
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

        <div className="vnode__view-actions">
          <div className="vnode__view-actions-buttons flex flex-row">
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

      <section className="vnode__analysis-tabs-content">
        {activeTab === "derivatives" && (
          <div className="tab-content derivative-tab-content">
            <table>
              <thead>
                <tr>
                  <th className="fav-head sticky"></th>
                  <th className="sticky">#</th>
                  <th className="sticky">Name</th>

                  <th>Price</th>
                  <th>1hr %</th>
                  <th>24hr %</th>
                  <th>7d %</th>
                  <th>Market Cap</th>
                  <th>Volume 24h</th>
                  <th>Circulation Supply</th>
                  <th>Last 7 Days</th>
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
                  return (
                    <tr key={coin.id}>
                      <td className="sticky star">
                        <FaRegStar />
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
                        ${coin.quote.USD.price.toFixed(2)}
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
                        {coin.quote.USD.percent_change_24h.toFixed(2)}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "spot" && (
          <div className="tab-content spot-tab-content">only spot</div>
        )}
      </section>
    </section>
  );
};

export default Analysis;
