import React, { useEffect, useState } from "react";
import { FaRegStar } from "react-icons/fa";
import * as img from "./coins.js";
import SkeletonElement from "../../skeletons/SkeletonElement.jsx";

const Derivatives = () => {
  const [derivativeData, setDerivativeData] = useState([]);
  const [derivateLoading, setDerivativeLoading] = useState(true);
  const [start, setStart] = useState(1);
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);
  let derivativeArray = Array.from({ length: limit }, (_, i) => i + 1);
  let derivativeIndex = 1;

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
      fetchData();
    } finally {
      setDerivativeLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [start, limit]);

  const prev = () => {
    if (page === 1) {
      return;
    }

    setPage((prevPage) => prevPage - 1);
    setStart((prevStart) => prevStart - limit);
    setDerivativeLoading(true);
  };

  const next = () => {
    if (page === 5) {
      return;
    }
    setPage((prevPage) => prevPage + 1);
    setStart((prevStart) => prevStart + limit);
    setDerivativeLoading(true);
  };

  return (
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
            {derivateLoading &&
              derivativeArray.map((index) => (
                <tr key={index}>
                  <td className="sticky star">
                    <SkeletonElement type="small-icon" />
                  </td>

                  <td className="sticky">
                    <SkeletonElement type="small-text" />
                  </td>

                  <td className="sticky name">
                    <SkeletonElement type="avatar" />
                    <div>
                      <SkeletonElement type="title" />
                      <small>
                        <SkeletonElement type="title" />
                      </small>
                    </div>
                  </td>

                  <td className="text-center">
                    <SkeletonElement type="text" />
                  </td>

                  <td className="text-center">
                    <SkeletonElement type="text" />
                  </td>

                  <td className="text-center">
                    <SkeletonElement type="text" />
                  </td>

                  <td className="text-center">
                    <SkeletonElement type="text" />
                  </td>

                  <td className="text-center">
                    <SkeletonElement type="text" />
                  </td>

                  <td className="text-center">
                    <SkeletonElement type="text" />
                  </td>

                  <td className="text-center">
                    <SkeletonElement type="text" />
                  </td>

                  <td className="text-center">
                    <SkeletonElement type="text" />
                  </td>
                </tr>
              ))}

            {!derivateLoading &&
              derivativeData.map((coin) => {
                let price = parseFloat(coin.quote.USD.price);
                let change_in_24 = parseFloat(coin.quote.USD.volume_24h);
                let converted = Math.round(change_in_24 / price).toLocaleString(
                  "en-us"
                );

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

                    <td className="text-center">
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
      <nav className="mt-2 flex flex-row justify-between place-items-center">
        <p className="text-white text-xs">Showing page {page} of 5</p>
        <ul className="flex items-center -space-x-px h-8 text-sm">
          <li>
            <a
              className="flex cursor-pointer items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-transparent border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={prev}
            >
              <span className="sr-only">Previous</span>
              <span className="material-symbols-outlined text-xs">
                arrow_back_ios
              </span>
            </a>
          </li>
          <li>
            <a
              className="flex cursor-pointer items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-transparent border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => {
                setPage(1);
                setStart(1);
                setDerivativeLoading(true);
              }}
            >
              1
            </a>
          </li>
          <li>
            <a
              className="flex cursor-pointer items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-transparent border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => {
                setPage(2);
                setStart(21);
                setDerivativeLoading(true);
              }}
            >
              2
            </a>
          </li>
          <li>
            <a
              className="flex cursor-pointer items-center justify-center px-3 h-8 leading-tight text-gray-500 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => {
                setPage(3);
                setStart(41);
                setDerivativeLoading(true);
              }}
            >
              3
            </a>
          </li>
          <li>
            <a
              className="flex cursor-pointer items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-transparent border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => {
                setPage(4);
                setStart(61);
                setDerivativeLoading(true);
              }}
            >
              4
            </a>
          </li>
          <li>
            <a
              className="flex cursor-pointer items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-transparent border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => {
                setPage(5);
                setStart(81);
                setDerivativeLoading(true);
              }}
            >
              5
            </a>
          </li>
          <li>
            <a
              className="flex cursor-pointer items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-transparent border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={next}
            >
              <span className="sr-only">Next</span>
              <span className="material-symbols-outlined text-xs">
                arrow_forward_ios
              </span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Derivatives;
