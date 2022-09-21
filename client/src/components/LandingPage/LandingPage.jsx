import React from "react";
import { Link } from "react-router-dom";
import styles from "./landingPageStyle.css";

export default function LandingPage() {
  return (
    <>
    <h1 className="landingtitle">ACTIVITIES ATLAS</h1>
    <div className="background">

      <Link to="/countries">
        <button type="button" className="landingbutton">
          
         <h1 className="btn">←Start Now→</h1> 
        </button>
      </Link>
     
  
    </div>
     
      <footer>Made with love - All Rights Reserved</footer>
    </>
  );
}
