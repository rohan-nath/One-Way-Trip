import Header11 from "@/components/header/header-11";
import MainFilterSearchBox from "@/components/car-list/car-list-v3/MainFilterSearchBox";
import TopHeaderFilter from "@/components/car-list/car-list-v3/TopHeaderFilter";
import CarPropertes from "@/components/car-list/car-list-v3/CarPropertes";
import Pagination from "@/components/car-list/common/Pagination";
import DropdownSelelctBar from "@/components/car-list/common/DropdownSelelctBar";
import MapPropertyFinder from "@/components/car-list/common/MapPropertyFinder";

import { decryptData } from "@/utils/cryptoJs";
import { getFromLocalStorage } from "@/utils/storage";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const CarListPage3 = () => {
  const encryptedData = getFromLocalStorage("tripData");

  const navigate = useNavigate();

  // Decrypt the data
  const data = encryptedData ? decryptData(encryptedData) : null;
  console.log("Decrypted Data:", data);

  if (!data) {
    navigate("/trip_app");
  }

  const carTypes = [
    {
      id: 1,
      name: "HATCHBACK",
      price: "₹ 6418",
      cImg: "/img/activities/1.png",
    },
    { id: 2, name: "SEDAN", price: "₹ 6868", cImg: "/img/activities/2.png" },
    { id: 3, name: "SUV", price: "₹ 6868", cImg: "/img/activities/3.png" },
    { id: 4, name: "PREMIUM", price: "₹ 10838", cImg: "/img/activities/4.png" },
  ];

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


  const gotToHome =() =>{
    navigate("/trip_app")
  }
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
                  className={`col-3 text-center ${
                    selectedCar?.id === car.id ? "border p-1" : ""
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
                  <p className="fw-bold small">{car.price}</p>
                </div>
              ))}
            </div>

            <div className="card mb-3">
              <div className="card-body">
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

                <button className="btn btn-success w-100">Select Cab</button>
              </div>
            </div>

            {data &&
              (data.type == "OUTSTATION" ? (
                <div className="alert alert-info text-center small py-2">
                  {data.subType} Trip | From {data.from} To {data.to} | 400 Km |
                  On {data.sdate} at {data?.stime.split(" - ")[0]}
                  <button className="btn text-white btn-success px-2 py-1 ms-2" onClick={gotToHome}>modify</button>
                </div>
              ) : (
                <div className="alert alert-info text-center small py-2">
                  {data.type} Trip | From {data.aircity} To {data.airlocation} |
                  387 Km | On
                  {data.airdate} at {data?.airtime.split(" - ")[0]}
                  <button className="btn text-white btn-success px-2 py-1 ms-2" onClick={gotToHome}>modify</button>
                </div>
              ))
              }

              
          </div>
        </div>
      </div>
    </>
  );
};

export default CarListPage3;
