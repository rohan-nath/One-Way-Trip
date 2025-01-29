import MainFilterSearchBox from "./MainFilterSearchBox";

const index = () => {
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
      {/* End section */}
    </>
  );
};

export default index;
