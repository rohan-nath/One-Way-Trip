import React from "react";
import { Sidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import LocationSearch from "./Hero/main-hero/LocationSearchActive";

function InputOffcanvas({ cName, placeholder, isOpen, setIsOpen }) {
  return (
    <>
      {/* <div
        className={`offcanvas offcanvas-end mobile_menu-contnet ${isOpen ? "show" : ""}`}
        tabIndex="-1"
        id="input-offcanvas"
        aria-labelledby="offcanvasMenuLabel"
        data-bs-scroll="true"
      > */}
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasExampleLabel">
          {cName}
        </h5>
        <button
          type="button"
          class="btn-close"
          onClick={() => setIsOpen(false)}
          aria-label="Close"
        ></button>
      </div>

      <div className="offcanvas-body">
        {/* <p>Here goes the menu content...</p> */}
        {/* <LocationSearch cName={''} placeholder={placeholder} /> */}
      </div>
      {/* </div> */}
    </>
  );
}

export default InputOffcanvas;
