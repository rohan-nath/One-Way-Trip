import { useDispatch, useSelector } from "react-redux";
import MainFilterSearchBox from "./MainFilterSearchBox";
import { useEffect } from "react";
import { closeFullScreen } from "@/features/input-box/inputBoxSlice";
import LocationSearch from "./LocationSearchActive";

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
                  {inputBoxState.isAirport ? (
                    <>
                    <LocationSearch
                      cName="AIRPORT"
                      placeholder="Select Airport"
                      valueKey="aircity"
                    />

                    <LocationSearch
                      cName="ADDRESS"
                      placeholder="Select Your Location"
                      valueKey="airlocation"
                    />
                  </>
                  ) : (
                    <>
                      <LocationSearch
                        cName="FROM"
                        placeholder="Select City"
                        valueKey="from"
                      />

                      <LocationSearch
                        cName="TO"
                        placeholder="Select City"
                        valueKey="to"
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default index;
