import DateSearch from "../DateSearch";
import LocationSearch from "./LocationSearch";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import TimeSearch from "../TimeSearch";
import { useDispatch, useSelector } from "react-redux";
import { setInputSelectedValue } from "@/features/input-box/inputBoxSlice";
import { encryptData } from "@/utils/cryptoJs";
import { saveToLocalStorage } from "@/utils/storage";

const MainFilterSearchBox = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState("OUTSTATION");
  const tabs = [
    { id: 1, name: "OUTSTATION" },
    { id: 2, name: "AIRPORT" },
  ];

  const handleCurrentTab = (tabName) => {
    setCurrentTab(tabName);
    setAirportCurrentTab("PICKUP");
    setOutStationCurrentTab("ONEWAY");
    dispatch(setInputSelectedValue({ isAirport: tabName == "AIRPORT" }));
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

  const inputBoxState = useSelector((state) => state.inputBox);

  const initialValues = {
    aircity: "",
    airdate: "",
    airlocation: "",
    airtime: "",
    from: "",
    to: "",
    sdate: "",
    stime: "",
    rdate: "",
  };
  const [values, setValues] = useState(initialValues);
  useEffect(() => {
    if (inputBoxState) {
      if (inputBoxState.value) {
        setValues((prev) => ({
          ...prev,
          [inputBoxState?.valueKey]: inputBoxState?.value,
        }));
      }
    }
  }, [inputBoxState]);

  const onSubmit = () => {
    let data = {};

    if (currentTab == "OUTSTATION") {
      data = {
        from: values.from,
        to: values.to,
        sdate: values.sdate,
        stime: values.stime,
        subType: outStationCurrentTab,
      };
      if (outStationCurrentTab == "ROUNDWAY") {
        data.rdate = values.rdate;
      }
    } else {
      data = {
        aircity: values.aircity,
        airdate: values.airdate,
        airlocation: values.airlocation,
        airtime: values.airtime,
        subType: airportCurrentTab,
      };
    }

    data["type"] = currentTab;

    const encrypted = encryptData(data);

    saveToLocalStorage("tripData", encrypted);
    navigate("/trip_app/car-list-v3");

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
                <LocationSearch
                  cName="FROM"
                  valueKey="from"
                  placeholder="Select City"
                  value={values.from}
                />

                <LocationSearch
                  cName="TO"
                  valueKey="to"
                  placeholder="Select City"
                  value={values.to}
                />

                {/* <LocationSearch
                  cName="DATE"
                  placeholder="Select Date"
                  valueKey="sdate"
                  value={values.sdate}
                /> */}
                <div className="searchMenu-date px-30 lg:py-20 lg:px-0 js-form-dd js-calendar">
                  <div>
                    <h4 className="text-15 fw-500 ls-2 lh-16">Date</h4>
                    <DateSearch valueKey="sdate" value={values.sdate} />
                  </div>
                </div>

                {/* <LocationSearch
                  cName="PICK UP TIME"
                  placeholder="Select Time"
                  valueKey="stime"
                  value={values.stime}
                /> */}

                <TimeSearch cName="PICK UP TIME" valueKey="stime" />

                {outStationCurrentTab == "ROUNDWAY" && (
                  // <LocationSearch
                  //   cName="RETURN DATE"
                  //   placeholder="Select Date"
                  //   valueKey="rdate"
                  //   value={values.rdate}
                  // />
                  <div className="searchMenu-date px-30 lg:py-20 lg:px-0 js-form-dd js-calendar">
                    <div>
                      <h4 className="text-15 fw-500 ls-2 lh-16">Return Date</h4>
                      <DateSearch valueKey="rdate" value={values.rdate} />
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
                <LocationSearch
                  cName="AIRPORT"
                  placeholder="Select Airport"
                  valueKey="aircity"
                  value={values.aircity}
                />

                <LocationSearch
                  cName={`${
                    airportCurrentTab == "PICKUP" ? "DROP" : "PICKUP"
                  } ADDRESS`}
                  placeholder="Select Your Location"
                  valueKey="airlocation"
                  value={values.airlocation}
                />

                <div className="searchMenu-date px-30 lg:py-20 lg:px-0 js-form-dd js-calendar">
                  <div>
                    <h4 className="text-15 fw-500 ls-2 lh-16">Date</h4>
                    <DateSearch valueKey="airdate" value={values.airdate} />
                  </div>
                </div>

                {/* <LocationSearch
                  cName="DATE"
                  placeholder="Select Date"
                  valueKey="airdate"
                  value={values.airdate}
                /> */}
                <div className="searchMenu-date px-30 lg:py-20 lg:px-0 js-form-dd js-calendar">
                  <div>
                    {/* <h4 className="text-15 fw-500 ls-2 lh-16"> Time </h4> */}
                    <TimeSearch cName="Time" valueKey="airtime" />
                  </div>
                </div>
                {/* <LocationSearch
                  cName="Time"
                  placeholder="Select Time"
                  valueKey="airtime"
                  value={values.airtime}
                /> */}
              </>
            )}

            <div className="button-item">
              <button
                className="mainSearch__submit button -dark-1 py-15 px-35 h-60 col-12 rounded-4 bg-blue-1 text-white"
                onClick={onSubmit}
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
