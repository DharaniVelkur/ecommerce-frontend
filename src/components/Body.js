import React, { useContext, useEffect, useState } from "react";
import Rescard from "./Rescard";
import notecontext from "../context/NoteContext";
import Shimmer from "./Shimmer";
import InfiniteScroll from "react-infinite-scroll-component";
import UpArrowButton from "./UpArrowButton";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  const [restaurant, setRestaurant] = useState([]);
  const [searchtext, setSearchtext] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page,setPage] = useState(0);
  const [total,setTotal] =useState(0);
  let a = useContext(notecontext);
console.log(filtered)
  const fetchmenu = async () => {
    setLoading(true);
    const res = await fetch(
      `https://swiggy-clone-wjqx.onrender.com/api/v1/restaurant?location=${a.selectedoption}&page=${page}`
    );
    const json = await res.json();
    // console.log(json.data);
    setRestaurant(json.data);
    setFiltered(json.data);
    setLoading(false);
    setTotal(json.total);
  };

  useEffect(() => {
    fetchmenu();
  }, [a.selectedoption]);

  const searchfunction = () => {
    let filtered = restaurant?.filter((res) =>
      res.info.name.toLowerCase().includes(searchtext.toLowerCase())
    );
    setFiltered(filtered);
  };
  const fetchMoreData  =async () =>{
    setLoading(true);
    const res = await fetch(`https://swiggy-clone-wjqx.onrender.com/api/v1/restaurant?location=${a.selectedoption}&page=${page+1}`);
    setPage(page+1);
    const json = await res.json();
    setLoading(false);
    setRestaurant(restaurant.concat(json.data));
    setFiltered(filtered.concat(json.data));
  }
  let onlineStatus = useOnlineStatus();
  if(!onlineStatus){
    return <h1>Looks like no internet connection.</h1>
  }
  return (
    <div className="mx-5">
      <div className="d-flex flex-wrap justify-content-between p-3">
        <span className="d-flex">
          <input
          placeholder="Search restaurants..."
          className="border border-none px-1"
          style={{height:"37.6px"}}
            type="text"
            value={searchtext}
            onChange={(e) => setSearchtext(e.target.value)}
          />
          <button className="btn" style={{backgroundColor:"orange"}} onClick={searchfunction}>Search</button>
        </span>
        {/* <button className="btn text-white" style={{backgroundColor:"orange"}} onClick={()=>{[...filtered].sort((a,b)=>a.info.feeDetails.totalFee-b.info.feeDetails.totalFee)}}>Order by Price</button> */}
        <button
        className="btn text-white fw-bold"
        style={{backgroundColor:"orange"}}
          onClick={() => {
            setFiltered(restaurant?.filter((res) => res.info.avgRating > 4.2));
          }}
        >
          Top rated Restaurants
        </button>
      </div>
  <InfiniteScroll dataLength={restaurant.length} next={fetchMoreData} hasMore={restaurant.length!== total}>
 
      <div className="d-flex mt-2 flex-wrap container-fluid justify-content-center">
        {loading && <Shimmer />}
        {filtered.map((res) => {
          return <Rescard key={res._id} res={res} />;
        })}
      </div>
         <UpArrowButton/>
  </InfiniteScroll>
    </div>
  );
};

export default Body;