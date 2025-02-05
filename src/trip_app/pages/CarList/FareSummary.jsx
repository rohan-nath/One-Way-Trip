import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FareSummary = ({ selectedCar, originalPrice, discountPercentage }) => {

  console.log("Selected Car:", selectedCar);
  
  const [isExpanded, setIsExpanded] = useState(false);

  const calculateDiscountedPrice = () => {
    const discount = originalPrice * (discountPercentage / 100);
    return originalPrice - discount;
  };

  const savings = originalPrice - calculateDiscountedPrice();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fare-summary bg-light rounded-lg p-4 shadow-sm"
    >
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <motion.h4 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="text-primary mb-2"
          >
            {selectedCar.name} 
          </motion.h4>
          
          <div className="fare-breakdown">
            <div className="d-flex justify-content-between">
              <span>Base Fare</span>
              <span className="text-muted text-decoration-line-through">
                ₹ {originalPrice.toFixed(2)}
              </span>
            </div>
            <div className="d-flex justify-content-between text-success">
              <span>Discount ({discountPercentage}%)</span>
              <span>- ₹ {savings.toFixed(2)}</span>
            </div>
            <motion.div 
              className="d-flex justify-content-between fw-bold mt-2"
              initial={{ backgroundColor: 'transparent' }}
              animate={{ 
                backgroundColor: isExpanded ? '#e6f3ff' : 'transparent',
                transition: { duration: 0.3 }
              }}
            >
              <span>Final Fare</span>
              <span className="text-primary">₹ {calculateDiscountedPrice().toFixed(2)}</span>
            </motion.div>
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className="btn btn-outline-primary btn-sm"
        >
          {isExpanded ? 'Hide Fare Details' : 'Show Fare Details'}
        </motion.button>
      </div>

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: 1, 
            height: 'auto',
            transition: { duration: 0.3 }
          }}
          className="additional-details mt-3 pt-3 border-top"
        >
          <div className="row">
            <div className="col-6">
              <small className="text-muted">Distance Covered</small>
              <p className="mb-0">400 Km</p>
            </div>
            <div className="col-6">
              <small className="text-muted">Trip Type</small>
              <p className="mb-0">Outstation</p>
            </div>
            <div className="col-6 mt-2">
              <small className="text-muted">Fuel Type</small>
              <p className="mb-0">Diesel</p>
            </div>
            <div className="col-6 mt-2">
              <small className="text-muted">Comfort Level</small>
              <p className="mb-0">AC | 5 Seater</p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default FareSummary;