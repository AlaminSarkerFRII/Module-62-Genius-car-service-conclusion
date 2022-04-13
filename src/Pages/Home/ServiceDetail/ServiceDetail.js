import React from "react";
import { Link, useParams } from "react-router-dom";

const ServiceDetail = () => {
  // parameter akare niye asbo

  const { serviceId } = useParams();
  return (
    <div>
      <h2>Service Detail : {serviceId}</h2>
      <div className="text-center">
        <Link to="/checkout">
          <button className="btn btn-primary">Proceed To Checkout</button>
        </Link>
      </div>
    </div>
  );
};

export default ServiceDetail;
