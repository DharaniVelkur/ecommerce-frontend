import React from "react";
import { Link } from "react-router-dom";
import '../css/Rescard.css';
const Rescard = ({ res }) => {
  return (
    <div className="p-3 ">
      <Link to={`/restaurant/${res.info.id}`}style={{textDecoration:"none"}}>
      <div className="card hoverres" style={{ width:"254.4px", height:"376px",cursor:"pointer"}}>
        <img
          src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${res.info.cloudinaryImageId}`}
          className="card-img-top"
          alt="resimage"
          width="254.4px"
          height="167.2px"
        />
        <div className="card-body">
          <h5 className="card-title" style={{fontSize:"17px"}}>{res.info.name}</h5>
          <p className="card-text" style={{fontSize:"12px"}}>{res.info.cuisines.join(",")}</p><br/>
          <div className="d-flex flex-wrap justify-content-between align-items-center">
          <span className="p-1"><span className={`${res.info.avgRating<4.2 ? "redrating" :"greenrating"} px-1`}>{res.info.avgRating}<i className="fa-regular fa-star"></i></span></span>
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 9.5a11.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"></path>
          </svg>
          <span>{res.info.costForTwo}</span>
          </div>
          <hr/>
        </div>
        
      </div>
      </Link>
    </div>
  );
};

export default Rescard;
