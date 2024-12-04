// import React, { useState } from "react";

// const Pay = ({ receipt, subtotal, taxAmount, total, onConfirmPayment, onCancel }) => {
//   const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
//   const [showError, setShowError] = useState(false);

//   const handlePaymentSelection = (method) => {
//     setSelectedPaymentMethod(method);
//     setShowError(false);
//   };

//   const handlePay = () => {
//     if (!selectedPaymentMethod) {
//       setShowError(true);
//     } else {
//       console.log("Payment Method:", selectedPaymentMethod); // For debugging/logging
//       onConfirmPayment(selectedPaymentMethod);
//     }
//   };

//   return (
//     <div className="payment-container">
//       <h2>Payment</h2>
//       <div className="receipt-summary">
//         <h3>Subtotal: ${subtotal.toFixed(2)}</h3>
//         <h3>Tax: ${taxAmount.toFixed(2)}</h3>
//         <h3>Total: ${total.toFixed(2)}</h3>
//       </div>
//       {showError && <p className="payment-error">Please select a payment method.</p>}
//       <div className="payment-methods">
//         {["Credit Card", "Cash", "Gift Card", "Student Swipe"].map((method) => (
//           <button
//             key={method}
//             className={`payment-button ${selectedPaymentMethod === method ? "selected" : ""}`}
//             onClick={() => handlePaymentSelection(method)}
//           >
//             {method}
//           </button>
//         ))}
//       </div>
//       <div className="action-buttons">
//         <button className="cancel-button" onClick={onCancel}>Cancel</button>
//         <button className="pay-button" onClick={handlePay}>Pay</button>
//       </div>
//     </div>
//   );
// };

// export default Pay;
