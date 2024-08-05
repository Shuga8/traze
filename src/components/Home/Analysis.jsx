import React, { useEffect, useState } from "react";
import { IoFilter } from "react-icons/io5";
import { FaRegStar } from "react-icons/fa";
import * as img from "./coins.js";
import Derivatives from "./Derivatives.jsx";

const Analysis = () => {
  const [activeTab, setActiveTab] = useState("derivatives");
  const [filterActive, setActiveFilter] = useState(false);
  const [favoriteActive, setFavoriteActive] = useState(false);

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
        {activeTab === "derivatives" && <Derivatives />}
        {activeTab === "spot" && (
          <div className="tab-content spot-tab-content">only spot</div>
        )}
      </section>
    </section>
  );
};

export default Analysis;
