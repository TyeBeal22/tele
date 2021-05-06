import React, { useState, useEffect } from "react";
import { useStore } from "react-redux";
import { read, diffDays, isAlreadyBooked } from "../actions/hotel";
import { getSessionId } from "../actions/stripe";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { useHistory, Link } from "react-router-dom";
import {
  MDBNavbarNav,
  MDBRow,
  MDBNavbar,
} from 'mdbreact';

import { FcBinoculars, FcHome,FcKey,FcDataConfiguration, FcLock, FcComments } from "react-icons/fc";
const ViewHotel = ({ match, history }) => {
  const [hotel, setHotel] = useState({});
  const [image, setImage] = useState("");
  const [image2, setImage2] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
 // const [alreadyBooked, setAlreadyBooked] = useState(false);

  const { auth } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadSellerHotel();
  }, []);
{/*
  useEffect(() => {
    if (auth && auth.token) {
      isAlreadyBooked(auth.token, match.params.hotelId).then((res) => {
        // console.log(res);
        if (res.data.ok) setAlreadyBooked(true);
      });
    }
  }, []);
*/}
  const loadSellerHotel = async () => {
    let res = await read(match.params.hotelId);
    // console.log(res);
    setHotel(res.data);
    setImage(`${process.env.REACT_APP_API}/hotel/image/${res.data._id}`);
    setImage2(`${process.env.REACT_APP_API}/hotel/image2/${res.data._id}`);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!auth || !auth.token) {
      history.push("/login");
      return;
    }

    setLoading(true);
    if (!auth) history.push("/login");
    // console.log(auth.token, match.params.hotelId);
    let res = await getSessionId(auth.token, match.params.hotelId);
    // console.log("get sessionid resposne", res.data.sessionId);
    const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY);
    stripe
      .redirectToCheckout({
        sessionId: res.data.sessionId,
      })
      .then((result) => console.log(result));
  };





  const logout = () => {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    window.localStorage.removeItem("auth");
    history.push("/login");
  };

  return (
    <>

<nav sticky='top' dark expand='md' transparent scrolling style={{position: 'fixed'}}>
         <MDBNavbarNav>
         <MDBRow>
         <div className="d-flex" style={{justifyContent:'space-between'}}>
      <Link className="navl" to="/">
      <FcHome size='2rem' className="moves" />
     
      </Link>


      {auth !== null && (
        <Link className="navl" to="/dashboard">
        <FcBinoculars size="2rem" className="moves" />
        </Link>
      )}

      {auth !== null && (
        <a className="navl pointer" href="#" onClick={logout}>
          <FcLock size="2rem" className="moves" />
        </a>
      )}

      {auth === null && (
        <>
          <Link className="navl" to="/login">
          <FcKey size='2rem' className="moves" />
          </Link>
          <Link className="navl" to="/register">
            <FcDataConfiguration size="2rem" className="moves" />
          </Link>
        </>
      )}
      </div>
      </MDBRow>
      </MDBNavbarNav>
         </nav>


      <div className="container-fluid bg-secondary p-5 text-center" style={{backgroundImage:`url(${image2})`,  backgroundPosition: 'center', backgroundSize: 'cover'}}>
        <h1 style={{color:'#f7a440',fontWeight:'bold'}}>{hotel.title}</h1>
      </div>
      <div className="container-fluid">
        <div className="row justify-content-center">
            <img 
            src={image} 
            alt={hotel.title} 
            onClick={handleClick}
            className="img img-fluid m-2"
            style={{height: '20em',width: '20em'}}
             />
         


            <br />
            <p className="alert mt-3" style={{fontWeight: 'bold', color:"#ffdf6b",fontSize:"3rem",textAlign:"center"}}>${hotel.price}</p>

          </div>
        </div>
  
    </>
  );
};

export default ViewHotel;
