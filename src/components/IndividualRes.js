import React,{useState} from "react";
import { useDispatch,useSelector } from "react-redux";
import { addItem, removeItem } from "../utils/cartSlice";

const IndividualRes = ({ res }) => {
  let dispatch = useDispatch();
  let cartItems =useSelector(store=>store.cart.items);
  const itemInCart = cartItems.find((item) => item.id === res?.id);
  // console.log(itemInCart)
  const quantity = itemInCart ? itemInCart.quantity : 0;


  return (
    <>
      <div className="d-flex justify-content-between" style={{ width: "60vw" }}>
        <div>
          <p className="fw-bolder">{res.name}</p>
          <p style={{ fontSize: "15px" }}>
            &#8377; {res.price ? res.price / 100 : res.defaultPrice / 100}
          </p>
          <p style={{ fontSize: "11px", color: "rgba(40,44,63,.45)" }}>
            {res?.description}
          </p>
        </div>
        <div className="position-relative">
          <img
            src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/${res.imageId}`}
            alt="food"
            width={"118px"}
            height={"96px"}
          />
            {quantity>0 ? (
            <div className="bg-white text-success px-4 py-1 fw-bold border shadow border-none position-absolute rounded">
              <span
                style={{cursor:"pointer"}}
                onClick={() => dispatch(removeItem(res.id))}
              >
                -
              </span>
              <span className="px-2">{quantity}</span>
              <span
                style={{cursor:"pointer"}}
                onClick={() => dispatch(addItem(res))}
              >
                +
              </span>
            </div>
          ) : (
            <button
            className="bg-white text-success px-4 py-1 fw-bold shadow border border-none position-absolute rounded"
              onClick={()=>dispatch(addItem(res))}
              style={{
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              ADD
            </button>
          )}
        </div>
      </div>
      <hr />
    </>
  );
};

export default IndividualRes;
