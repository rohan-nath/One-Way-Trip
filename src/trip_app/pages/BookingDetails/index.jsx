import Header11 from "@/components/header/header-11";
import { decryptData, encryptData } from "@/utils/cryptoJs";
import {
  extractStartTime,
  firstLetterCapitalize,
} from "@/utils/otherFunctions";
import { getFromLocalStorage, saveToLocalStorage } from "@/utils/storage";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const index = () => {
  const encryptedData = getFromLocalStorage("tripData");

  const navigate = useNavigate();

  // Decrypt the data
  const data = encryptedData ? decryptData(encryptedData) : null;

  if (!data) {
    navigate("/trip_app");
  }

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    pickup: "",
    drop: "",
    remark: "",
  });

  const [couponCode, setCouponCode] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    const encrypted = encryptData(formData);

    saveToLocalStorage("userData", encrypted);

    navigate("/trip_app/cab-booking");
  };

  return (
    <>
      <div className="header-margin"></div>
      {/* header top margin */}

      <Header11 />

      <div className="container pt-3">
        <div className="card">
          <div className="card-header bg-primary text-white">
            {firstLetterCapitalize(
              data?.type == "AIRPORT" ? data.type : data?.subType
            )}{" "}
            Booking Details
          </div>
          <div className="card-body">
            {data &&
              (data?.type == "OUTSTATION" ? (
                <div className="row mb-3">
                  <div className="col">
                    <p>
                      <strong>Route:</strong> {data.from} → {data.to}
                    </p>
                    <p>
                      <strong>Pickup:</strong> {data.sdate}{" "}
                      {data.rdate ? ` To ${data.rdate} ` : ""}
                      at {extractStartTime(data.stime)}
                    </p>
                    <p>
                      <strong>Car Type:</strong> {data?.selectedCar?.name}
                    </p>
                    <p>
                      <strong>Distance:</strong> 397 km
                    </p>
                    <p className="text-danger">
                      <strong>Estimated Amount:</strong> ₹{" "}
                      {data?.selectedCar?.price}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="row mb-3">
                  <div className="col">
                    <p>
                      <strong>Route:</strong> {data.aircity} →{" "}
                      {data.airlocation}
                    </p>
                    <p>
                      <strong>Pickup:</strong> {data.airdate} at{" "}
                      {extractStartTime(data.airtime)}
                    </p>
                    <p>
                      <strong>Car Type:</strong> {data?.selectedCar?.name}
                    </p>
                    <p>
                      <strong>Distance:</strong> 397 km
                    </p>
                    <p className="text-danger">
                      <strong>Estimated Amount:</strong> ₹{" "}
                      {data?.selectedCar?.price}
                    </p>
                  </div>
                </div>
              ))}

            <div className="mb-4">
              <div className="input-group">
                <input
                  type="text"
                  name="couponCode"
                  className="form-control border p-2"
                  placeholder="Coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button className="btn btn-info text-white" type="button">
                  Apply
                </button>
              </div>
              <div className="mt-2">
                <a href="#" className="text-primary text-decoration-none">
                  View Available Coupons
                </a>
              </div>
            </div>

            <h5 className="pb-2 border-bottom border-dark">
              Traveller Information
            </h5>

            <form onSubmit={onSubmit}>
              <div className="mb-2 searchMenu-loc px-30 lg:py-15 lg:px-0 js-form-dd js-liverSearch border-bottom border-dark">
                <div className="text-15 text-light-1 ls-2 lh-16">
                  <input
                    className="js-search js-dd-focus"
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="mb-2 searchMenu-loc px-30 lg:py-15 lg:px-0 js-form-dd js-liverSearch border-bottom border-dark">
                <div className="input-group ">
                  <span className="input-group-text">+91</span>
                  <input
                    type="tel"
                    name="mobile"
                    className="form-control"
                    placeholder="Enter number"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="mb-2 searchMenu-loc px-30 lg:py-15 lg:px-0 js-form-dd js-liverSearch border-bottom border-dark">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-2 searchMenu-loc px-30 lg:py-15 lg:px-0 js-form-dd js-liverSearch border-bottom border-dark">
                <input
                  type="text"
                  name="pickup"
                  className="form-control"
                  placeholder="Pickup Address"
                  value={formData.pickup}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-2 searchMenu-loc px-30 lg:py-15 lg:px-0 js-form-dd js-liverSearch border-bottom border-dark">
                <input
                  type="text"
                  name="drop"
                  className="form-control"
                  placeholder="Drop Address"
                  value={formData.drop}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-2 searchMenu-loc px-30 lg:px-0 js-form-dd js-liverSearch border-bottom border-dark">
                <div className="text-15 text-light-1 ls-2 lh-16">
                  <textarea
                    name="remark"
                    className="js-search js-dd-focus"
                    placeholder="Remark for the Driver"
                    value={formData.remark}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>

              <div className="row">
                <div className="">
                  <button type="submit" className="btn btn-primary w-100">
                    PROCEED
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
