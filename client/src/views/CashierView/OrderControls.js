import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

/**
 * Controls for managing the order, including payment, discount, and logout.
 * @function OrderControls
 * @param {Function} fetchLastReceipt - Function to fetch the last receipt.
 * @param {Function} onAddDiscount - Function to open the discount popup.
 * @param {boolean} hasDiscount - Whether a discount is applied.
 * @param {Function} toggleTax - Function to toggle tax application.
 * @param {boolean} applyTax - Whether tax is applied.
 * @param {Function} onClearOrder - Function to clear the current order.
 * @param {Function} onPay - Function to initiate payment.
 * @returns {JSX.Element}
 */
const OrderControls = ({
  fetchLastReceipt,
  onAddDiscount,
  hasDiscount,
  toggleTax,
  applyTax,
  onClearOrder,
  onPay,
}) => {
  const { logout } = useAuth0();

  /**
   * Logs out the user and returns to the customer view.
   * @function handleLogout
   * @returns {void}
   */
  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: `${window.location.origin}/customer`, // Redirect to the base URL after logout
      },
      federated: true, // Ensures Auth0 session is also cleared
    });
  };

  return (
    <div className="order-controls">
      <div className="logo-container">
        <img src="/panda-express-logo.svg" alt="Panda Express Logo" className="logo" />
      </div>
      <button className="toCustomerView" onClick={handleLogout}>
        Logout and Return<br/> to Customer View
      </button>
      {/* <button onClick={fetchLastReceipt}>Print Last Receipt</button> */}
      <button onClick={onAddDiscount}>{hasDiscount ? 'Update Discount' : 'Add Discount'}</button>
      <button onClick={toggleTax}>{applyTax ? 'No Tax' : 'Apply Tax'}</button>
      <button onClick={onClearOrder}>Clear Order</button>
      <button className="checkout-button" onClick={onPay}>
        Pay / Close Order
      </button>
    </div>
  );
};

export default OrderControls;
