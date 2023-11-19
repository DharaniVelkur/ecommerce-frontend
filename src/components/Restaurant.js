import React from "react";
import { useParams } from "react-router-dom";
import IndividualRes from "./IndividualRes";
import useRestaurantMenu from "../utils/useRestaurantMenu";

const Restaurant = () => {
  const { resid } = useParams();
  const recommendeditems = useRestaurantMenu(resid);
  const cards =
    recommendeditems[recommendeditems.length - 1]?.groupedCard?.cardGroupMap
      ?.REGULAR.cards;
  const categrorycards = cards?.filter(
    (c) =>
      c.card.card["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
  );

  return (
    <div className="mx-5">
      <div className="d-flex justify-content-between align-items-center pt-3">
        <div>
          <p style={{ fontSize: "1.43rem", color: "#282c3f", fontWeight: 800 }}>
            {recommendeditems[0]?.card?.card?.info?.name}
          </p>
          <p style={{ overflow: "hidden", color: "#7e808c" }}>
            {recommendeditems[0]?.card?.card?.info?.cuisines?.join(",")}
          </p>
        </div>
        <div className="border p-1">
          <div style={{ color: "green" }} className="fw-bold text-center">
            {recommendeditems[0]?.card?.card?.info?.avgRating}
            <i className="fa-regular fa-star"></i>
          </div>
          <hr />
          <div
            className="text-center"
            style={{ fontSize: "11px", color: "#8b8d97", fontWeight: 600 }}
          >
            {recommendeditems[0]?.card?.card?.info?.totalRatingsString}
          </div>
        </div>
      </div>
      <hr />
      {categrorycards?.map((e, index) => {
        const accordionId = `accordion-${index}`;
        return (
          <div className="d-flex justify-content-center align-items-center">
            <div key={accordionId} className="accordion my-2 shadow" id={accordionId} style={{width:"70vw"}}>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#${accordionId}-collapse`}
                    aria-expanded="true"
                    aria-controls={`#${accordionId}-collapse`}
                  >
                    <span className="fw-bold">
                      {e?.card?.card?.title}({e?.card?.card.itemCards?.length})
                    </span>
                  </button>
                </h2>

                <div className="d-flex flex-column justify-content-center align-items-center">
                  <div
                    id={`${accordionId}-collapse`}
                    className="accordion-collapse collapse show"
                    data-bs-parent={`#${accordionId}`}
                  >
                    <div className="accordion-body">
                      {e?.card?.card.itemCards.map((res) => (
                        <IndividualRes res={res.card.info} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Restaurant;
