import { decryptData } from "@/utils/cryptoJs";
import { extractStartTime } from "@/utils/otherFunctions";
import { getFromLocalStorage } from "@/utils/storage";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header11 from "@/components/header/header-11";

const index = () => {
  const data1 = getFromLocalStorage("tripData");
  const data2 = getFromLocalStorage("userData");

  const navigate = useNavigate();

  // Decrypt the data
  const tripData = data1 ? decryptData(data1) : null;
  const userData = data2 ? decryptData(data2) : null;

  if (!tripData || !userData) {
    navigate("/trip_app");
  }

  useEffect(() => {
    // console.log("Data:", userData);
    console.log("tripData:", tripData);
  }, [userData]);

  const [selectedPayment, setSelectedPayment] = useState("0");
  const [isAgreed, setIsAgreed] = useState(false);

  const paymentOptions = [
    {
      id: "0",
      amount: 0,
      percent: "₹ 0",
      label: "Payment",
      sublabel: "Pay Cash to driver",
    },
    {
      id: "20",
      amount: 1167,
      percent: "20%",
      label: " Advance",
      sublabel: "Pay Adv ₹ 1167",
    },
    {
      id: "100",
      amount: 5835,
      percent: "100%",
      label: "Advance",
      sublabel: "Pay Adv ₹ 5835",
    },
  ];

  const travelerInfo = {
    name: "test",
    email: "test@gmail.com",
    mobile: "7845145214",
    route: "Udaipur >> Jaipur",
    km: "397 Km",
    date: "07-02-25",
    time: "11:30 PM",
    car: "Etios or Similar",
    pickup: "udaipur",
    drop: "udaipur",
  };

  return (
    <>
      <div className="header-margin"></div>
      {/* header top margin */}

      <Header11 />
      <div className="container py-4">
        <h4 className="text-center text-info mb-4">
          Get Your Booking Confirmation Id
        </h4>
        <div className="card">
          <div className="card-body">
            <h5 className="text-center mb-4">Select Payment</h5>

            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center">
                <span className="fw-bold">Total Fare:</span>
                <span className="text-success fw-bold">₹ 5835</span>
              </div>
              <div className="text-success small">(Coupon Code Applied :)</div>
            </div>

            <div className="row mb-4">
              {paymentOptions.map((option) => (
                <div className="col-4 p-1" key={option.id}>
                  <div
                    className={`card h-100 cursor-pointer ${
                      selectedPayment === option.id ? "border-dark" : ""
                    }`}
                    onClick={() => setSelectedPayment(option.id)}
                  >
                    <div className="card-body text-center d-flex flex-column justify-content-center p-2">
                      <div className="radio-wrapper mb-2">
                        <input
                          type="radio"
                          className=""
                          checked={selectedPayment === option.id}
                          onChange={() => setSelectedPayment(option.id)}
                        />
                        <label className="d-block mb-0">
                          <div className="fw-bold mb-1">{option.percent}</div>
                          <div className="mb-1">{option.label}</div>
                          <small className="text-muted d-block">
                            {option.sublabel}
                          </small>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="form-check mb-4 d-flex align-items-start gap-2">
              <input
                type="checkbox"
                className="form-check-input mt-2"
                id="terms"
                checked={isAgreed}
                onChange={(e) => setIsAgreed(e.target.checked)}
                style={{
                  width: "16px",
                  height: "16px",
                  border: "1px solid #ced4da",
                  borderRadius: "3px",
                  cursor: "pointer",
                }}
              />
              <label
                className="form-check-label"
                htmlFor="terms"
                style={{ cursor: "pointer" }}
              >
                I Agree all{" "}
                <a href="#" className="text-primary text-decoration-none">
                  Terms & Conditions
                </a>{" "}
                and{" "}
                <a href="#" className="text-primary text-decoration-none">
                  Refund Policy
                </a>
                .
              </label>
            </div>

            <button
              className="btn btn-info text-white w-100 mb-4"
              disabled={!isAgreed}
            >
              Proceed To Payment ₹
              {paymentOptions.find((opt) => opt.id === selectedPayment)?.amount}
            </button>
          </div>
        </div>

        <div className="card mt-4">
          <div className="card-body">
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0">Traveller Information</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-12">
                    {userData && (
                      <table className="table table-borderless">
                        <tbody>
                          <tr>
                            <td className="fw-bold">Name:</td>
                            <td>{userData.name}</td>
                          </tr>
                          <tr>
                            <td className="fw-bold">Email:</td>
                            <td>{userData.email}</td>
                          </tr>
                          <tr>
                            <td className="fw-bold">Mobile:</td>
                            <td>{userData.mobile}</td>
                          </tr>
                          {/* {JSON.stringify(tripData)} */}
                          {tripData?.type == "OUTSTATION" ? (
                            <>
                              <tr>
                                <td className="fw-bold">Route:</td>
                                <td>
                                  {" "}
                                  {tripData.from} → {tripData.to}
                                </td>
                              </tr>
                              <tr>
                                <td className="fw-bold">Km:</td>
                                <td>250 KM </td>
                              </tr>
                              <tr>
                                <td className="fw-bold">Date:</td>
                                <td>{tripData.sdate}</td>
                              </tr>
                              <tr>
                                <td className="fw-bold">Time:</td>
                                <td> {extractStartTime(tripData.stime)}</td>
                              </tr>
                            </>
                          ) : (
                            <>
                              <tr>
                                <td className="fw-bold">Route:</td>
                                <td>
                                  {tripData.aircity} → {tripData.airlocation}
                                </td>
                              </tr>
                              <tr>
                                <td className="fw-bold">Km:</td>
                                <td>250 KM </td>
                              </tr>
                              <tr>
                                <td className="fw-bold">Date:</td>
                                <td>{tripData.airdate}</td>
                              </tr>
                              <tr>
                                <td className="fw-bold">Time:</td>
                                <td>{extractStartTime(tripData.airtime)}</td>
                              </tr>
                            </>
                          )}
                          <tr>
                            <td className="fw-bold">Car:</td>
                            <td>{tripData?.selectedCar?.name}</td>
                          </tr>
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 

            <div className="row">
              <div className="col-6">
                <button className="btn btn-info text-white w-100">
                  Request Call
                </button>
              </div>
              <div className="col-6">
                <button className="btn btn-info text-white w-100">
                  Chat Now
                </button>
              </div>
            </div> */}
      </div>
    </>
  );
};

export default index;
