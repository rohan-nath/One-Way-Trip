import DateSearch from "../DateSearch";
import LocationSearch from "./LocationSearch";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TimeSearch from "../TimeSearch";

const MainFilterSearchBox = () => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState("OUTSTATION");
  const tabs = [
    { id: 1, name: "OUTSTATION" },
    { id: 2, name: "AIRPORT" },
  ];

  const handleCurrentTab = (tabName) => {
    setCurrentTab(tabName);
    setAirportCurrentTab("PICKUP");
    setOutStationCurrentTab("ONEWAY");
  };

  const [outStationCurrentTab, setOutStationCurrentTab] = useState("ONEWAY");

  const outStationSubtabs = [
    { id: 1, name: "ONEWAY" },
    { id: 2, name: "ROUNDWAY" },
  ];

  const [airportCurrentTab, setAirportCurrentTab] = useState("PICKUP");

  const airportSubtabs = [
    { id: 1, name: "PICKUP" },
    { id: 2, name: "DROP" },
  ];

  const handleSubtype = (type, subtype) => {
    if (type == "OUTSTATION") {
      setOutStationCurrentTab(subtype);
    } else {
      setAirportCurrentTab(subtype);
    }
  };
  return (
    <>
      <div className="tabs -bookmark js-tabs">
        <div className="tabs__controls d-flex items-center js-tabs-controls">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              className={`tabs__button px-30 py-20 rounded-4 fw-600 text-white js-tabs-button ${
                tab?.name === currentTab ? "is-tab-el-active" : ""
              }`}
              onClick={() => handleCurrentTab(tab?.name)}
            >
              {tab?.name}
            </button>
          ))}
        </div>
      </div>

      <div className="tabs__content js-tabs-content">
        <div className="mainSearch bg-white pr-20 py-20 lg:px-20 lg:pt-5 lg:pb-20 rounded-4">
          <div className="button-grid items-center">
            {currentTab == "OUTSTATION" ? (
              <>
                <div className="tabs -bookmark js-tabs">
                  <div className="tabs__controls d-flex items-center js-tabs-controls">
                    {outStationSubtabs.map((tab) => (
                      <button
                        key={tab.id}
                        className={`tabs__button px-30 py-20 rounded-4 fw-600 text-black js-tabs-button ${
                          tab?.name === outStationCurrentTab
                            ? "border border-1 border-black text-black"
                            : ""
                        }
                          `}
                        onClick={() => handleSubtype(currentTab, tab.name)}
                      >
                        {tab.name}
                      </button>
                    ))}
                  </div>
                </div>
                <LocationSearch cName="FROM" placeholder="Select City" />

                <LocationSearch cName="TO" placeholder="Select City" />

                <div className="searchMenu-date px-30 lg:py-20 lg:px-0 js-form-dd js-calendar">
                  <div>
                    <h4 className="text-15 fw-500 ls-2 lh-16">Date</h4>
                    <DateSearch />
                  </div>
                </div>

                <div className="searchMenu-date px-30 lg:py-20 lg:px-0 js-form-dd js-calendar">
                  <div>
                    <h4 className="text-15 fw-500 ls-2 lh-16">Pick Up Time </h4>
                    <TimeSearch />
                  </div>
                </div>

                {outStationCurrentTab == "ROUNDWAY" && (
                  <div className="searchMenu-date px-30 lg:py-20 lg:px-0 js-form-dd js-calendar">
                    <div>
                      <h4 className="text-15 fw-500 ls-2 lh-16">Return Date</h4>
                      <DateSearch />
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="tabs -bookmark js-tabs">
                  <div className="tabs__controls d-flex items-center js-tabs-controls">
                    {airportSubtabs.map((tab) => (
                      <button
                        key={tab.id}
                        className={`tabs__button px-30 py-20 rounded-4 fw-600 text-black js-tabs-button ${
                          tab?.name === airportCurrentTab
                            ? "border border-1 border-black text-black"
                            : ""
                        }`}
                        onClick={() => handleSubtype(currentTab, tab.name)}
                      >
                        {tab.name}
                      </button>
                    ))}
                  </div>
                </div>
                <LocationSearch cName="AIRPORT" placeholder="Select City" />

                <LocationSearch
                  cName={`${airportCurrentTab == "PICKUP" ? "DROP" : "PICKUP"} ADDRESS`}
                  placeholder="Select Your Location"
                />

                <div className="searchMenu-date px-30 lg:py-20 lg:px-0 js-form-dd js-calendar">
                  <div>
                    <h4 className="text-15 fw-500 ls-2 lh-16">Date</h4>
                    <DateSearch />
                  </div>
                </div>

                <div className="searchMenu-date px-30 lg:py-20 lg:px-0 js-form-dd js-calendar">
                  <div>
                    <h4 className="text-15 fw-500 ls-2 lh-16"> Time </h4>
                    <TimeSearch />
                  </div>
                </div>
              </>
            )}

            <div className="button-item">
              <button
                className="mainSearch__submit button -dark-1 py-15 px-35 h-60 col-12 rounded-4 bg-blue-1 text-white"
                onClick={() => navigate("/hotel-list-v3")}
              >
                <i className="icon-search text-20 mr-10" />
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainFilterSearchBox;
