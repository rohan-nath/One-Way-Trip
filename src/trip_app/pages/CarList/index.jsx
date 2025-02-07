import Header11 from "@/components/header/header-11";
import { decryptData, encryptData } from "@/utils/cryptoJs";
import { getFromLocalStorage, saveToLocalStorage } from "@/utils/storage";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import FareSummary from "./FareSummary";
import { carTypes } from "@/trip_app/data";
import { extractStartTime } from "@/utils/otherFunctions";

const CarListPage3 = () => {
  const encryptedData = getFromLocalStorage("tripData");

  const navigate = useNavigate();

  // Decrypt the data
  const data = encryptedData ? decryptData(encryptedData) : null;

  if (!data) {
    navigate("/trip_app");
  }

  const [selectedCar, setSelectedCar] = useState(null);
  const handleCarSelection = (id) => {
    const car = carTypes.find((car) => car.id === id);
    if (car) {
      setSelectedCar(car);
    }
  };

  useEffect(() => {
    if (!selectedCar) {
      setSelectedCar(carTypes[0]);
    }
  }, [carTypes, selectedCar]);

  const gotToPath = (path) => {
    navigate(path);
  };

  const handleSubmit = () => {
    const data2 = {
      ...data,
      selectedCar,
    };

    const encrypted = encryptData(data2);

    saveToLocalStorage("tripData", encrypted);
    gotToPath("/trip_app/booking-details");
  };
  return (
    <>
      <div className="header-margin"></div>
      {/* header top margin */}

      <Header11 />
      {/* End Header 1 */}
      <div className="container" style={{ maxWidth: "400px" }}>
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 h5">
              Book Comfortable Rides And Select Your Comfort
            </h2>

            <div className="row mb-3">
              {carTypes.map((car, index) => (
                <div
                  key={index}
                  // className={`col-3 text-center ${
                  //   selectedCar?.id === car.id ? "border p-1" : ""
                  // }`}
                  className={`col-3 text-center cursor-pointer ${
                    selectedCar?.id === car.id
                      ? "border border-primary rounded p-1"
                      : "opacity-75"
                  }`}
                  onClick={() => handleCarSelection(car.id)}
                >
                  <img
                    src={car.cImg}
                    alt={car.name}
                    className="img-fluid mb-2"
                  />
                  <p className="mb-0" style={{ fontSize: "0.6rem" }}>
                    {car.name}
                  </p>
                  <p className="fw-bold small">₹ {car.price}</p>
                </div>
              ))}
            </div>

            <div className="card mb-3">
              {/* <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <img
                    src={selectedCar?.cImg}
                    alt="Innova"
                    className="me-3"
                    style={{ maxWidth: "150px" }}
                  />
                  <div>
                    <h5 className="card-title fs-6">{selectedCar?.name}</h5>
                    <div className="text-muted small">
                      <span className="me-2">7</span>
                      <i className="bi bi-star-fill me-2"></i>
                      <span className="me-2">5</span>
                      <i className="bi bi-person me-2"></i>
                      <span>AC</span>
                    </div>
                    <span className="badge bg-danger">25% OFF</span>
                  </div>
                  <div className="ms-auto text-end">
                    <p className="text-decoration-line-through text-muted small mb-0">
                      ₹ 12461
                    </p>
                    <p className="text-primary fw-bold">{selectedCar?.price}</p>
                  </div>
                </div>

                
              </div> */}
              {selectedCar && (
                <FareSummary
                  selectedCar={selectedCar}
                  originalPrice={selectedCar.price}
                  discountPercentage={25}
                />
              )}
            </div>
            <button
              className="btn btn-success w-100 mb-3"
              onClick={handleSubmit}
            >
              Select Cab
            </button>

            {data &&
              (data.type == "OUTSTATION" ? (
                <div className="alert alert-info text-center small py-2">
                  {data.subType} Trip | From {data.from} To {data.to} | 400 Km |
                  On {data.sdate} at {extractStartTime(data.stime)}
                  <button
                    className="btn text-white btn-success px-2 py-1 ms-2"
                    onClick={() => gotToPath("/trip_app")}
                  >
                    modify
                  </button>
                </div>
              ) : (
                <div className="alert alert-info text-center small py-2">
                  {data.type} Trip | From {data.aircity} To {data.airlocation} |
                  387 Km | On {data.airdate} at {data?.airtime.split(" - ")[0]}
                  <button
                    className="btn text-white btn-success px-2 py-1 ms-2"
                    onClick={() => gotToPath("/trip_app")}
                  >
                    modify
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CarListPage3;
