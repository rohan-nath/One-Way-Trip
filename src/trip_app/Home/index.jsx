import React from 'react'
import DefaultHeader from "@/components/header/default-header";
import Hero1 from "../Hero/hero-1";


const TripApp = () => {
  return (
    <>
    <div className="header-margin"></div>
    {/* header top margin */}

    <DefaultHeader />
    {/* End Header 1 */}

    <Hero1 />

    </>

  )
}

export default TripApp