import React from "react";
import { useNavigate, useRouteError } from "react-router-dom";

const Error = () => {
  const err = useRouteError();
  let navigate = useNavigate();
  return (
    <div>
      {/* <h1>Oops!!!!</h1>
      <h2>Something went wrong!!</h2>
      <h3>{err.status}:{err.statusText}</h3>
      <button onClick={()=>navigate('/')}>Back to home</button> */}
      <section className="page_404">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 ">
              <div className="col-sm-10 col-sm-offset-1  text-center">
                <div className="four_zero_four_bg">
                  <h1 className="text-center ">{err.status}</h1>
                </div>
                <div className="contant_box_404">
                  <h3 className="h2">{err.statusText}</h3>
                  <p>the page you are looking for not available!</p>
                  <button
                    onClick={() => {
                      navigate("/");
                    }}
                    className="border border-none rounded link_404"
                  >
                    Go to Home
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Error;
