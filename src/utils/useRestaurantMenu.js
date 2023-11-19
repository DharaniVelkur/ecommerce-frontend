import { useEffect, useState } from "react";

const useRestaurantMenu = (resid) => {
    const [recommendeditems,setRecommendeditems] = useState([]);
    const fetchres = async () => {
        const data = await fetch(`https://corsproxy.io/?https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=25.5940947&lng=85.1375645&restaurantId=${resid}`); 
        const resdata = await data.json();
        setRecommendeditems(resdata.data.cards);
    }

    useEffect(()=>{
        fetchres();
    },[]);
  return recommendeditems;
}

export default useRestaurantMenu;
