import { useDispatch, useSelector } from "react-redux";
import MainFilterSearchBox from "./MainFilterSearchBox";
import { useEffect } from "react";
import { closeFullScreen } from "@/features/input-box/inputBoxSlice";
import LocationSearch from "./LocationSearchActive";
import DateSearch from "../DateSearch";
import TimeSearch from "../TimeSearch";

const index = () => {
  const dispatch = useDispatch();

  const inputBoxState = useSelector((state) => state.inputBox);

  useEffect(() => {
    console.log("inputBoxState", inputBoxState);
  }, [inputBoxState]);
  const handleClick = () => {
    dispatch(closeFullScreen());
  };

  return (
    <>
      <section className="masthead -type-8">
        <div className="masthead__bg">
          <img
            src="/img/masthead/8/bg.png"
            alt="image"
            className="col-12 h-full object-cover"
          />
        </div>

        <div className="container">
          <div className="row justify-center">
            <div className="col-xl-10">
              <div className="text-center">
                <h1
                  className="text-60 lg:text-40 md:text-30 text-dark-1"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  Search for the Best Car Hire Deals
                </h1>
                <p
                  className="text-dark-1 mt-5"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  Book better cars from local hosts across the US and around the
                  world.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* End .container */}

        <div className="masthead__tabs" data-aos="fade-up" data-aos-delay="200">
          <MainFilterSearchBox />
        </div>
        {/* End masthead bottom slider */}
      </section>

      {/* {isFullScreen || 'sffd'} */}
      {inputBoxState?.isFullScreen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-white"
          style={{ zIndex: 1050 }}
        >
          <div className="d-flex justify-content-end my-3 mx-3">
            <button
              type="button"
              className="btn-close"
              onClick={handleClick}
            ></button>
          </div>

          <div
            className="masthead__tabs"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="tabs__content js-tabs-content">
              <div className="mainSearch bg-white pr-20 py-20 lg:px-20 lg:pt-5 lg:pb-20 rounded-4">
                <div className="button-grid items-center">
                  {["to", "from", "aircity", "airlocation"].includes(
                    inputBoxState?.valueKey
                  ) ? (
                    <LocationSearch
                      cName={inputBoxState.cName}
                      placeholder={inputBoxState.placeholder}
                      valueKey={inputBoxState.valueKey}
                    />
                  ) : ["sdate", "rdate", "airdate"].includes(
                      inputBoxState?.valueKey
                    ) ? (
                    <div className="searchMenu-date px-30 lg:py-20 lg:px-0 js-form-dd js-calendar">
                      <div>
                        <h4 className="text-15 fw-500 ls-2 lh-16">
                          {inputBoxState.cName}
                        </h4>
                        <DateSearch />
                      </div>
                    </div>
                  ) : ["stime", "airtime"].includes(inputBoxState?.valueKey) ? (
                    <div className="searchMenu-date px-30 lg:py-20 lg:px-0 js-form-dd js-calendar">
                      <div>
                        <h4 className="text-15 fw-500 ls-2 lh-16">
                         {inputBoxState.cName}
                        </h4>
                        <TimeSearch />
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* <div className="tabs__content js-tabs-content">
            <div className=":pt-5 lg:pb-20 roundemainSearch bg-white pr-20 py-20 lg:px-20 lgd-4">
              <div className="button-grid items-center">
                <LocationSearch
                  cName={inputBoxState.cName}
                  placeholder={inputBoxState.placeholder}
                />
              </div>
            </div>
          </div> */}
        </div>
      )}
    </>
  );
};

export default index;
