import React from "react";
import "./Footer.css";
import socials from '../img/socials.svg'
import { FcLeftUp2, FcKey,FcDataConfiguration,FcLock } from "react-icons/fc";
import { FaInstagram } from 'react-icons/fa';
import { Link } from "react-router-dom";



function Footer() {
  return (

    <div className="main-footer">
      <div className="container">
        <div className="row">
          {/* Column1 */}

          {/* Column2 */}
          <div className="col">
            <div className="col">


          </div>
            <img src={socials} className="socials" />


          </div>
          {/* Column3 */}

          
       
         <ui className="list-unstyled">
            <a href="https://www.instagram.com/grindergifts/"><FaInstagram className="fab fa-instagram" style={{ fontSize: 50, color: "gold" }} /></a>
            </ui>
        </div>
        <hr />
        <div className="row" style={{textAlign:"center"}}>
          <p className="col-sm bottom">
            &copy;{new Date().getFullYear()} Developed by | MutationCode LLC | admin@grindergifts.com| Privacy
          </p>
         
        </div>
      </div>
    </div>

  );
}

export default Footer;





{/*
import React, { Component } from 'react'
import { Link } from "react-router-dom";
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import SportsBasketballIcon from '@material-ui/icons/SportsBasketball';
import SportsFootballIcon from '@material-ui/icons/SportsFootball';
import basketball from '../assets/basketball.png';

export default class Footer extends Component {
    render() {
        return (
            <div  styles={{ backgroundImage:`url(${basketball})` }}>
                    <Link href="#"><FacebookIcon className="fab fa-facebook-f" /></Link>
                    <Link href="#"><InstagramIcon className="fab fa-instagram" /></Link>
                    <Link href="#"><SportsFootballIcon style={{ fontSize: 60 }}/></Link>
                    <Link href="/"><SportsBasketballIcon style={{ fontSize: 60 }} /></Link>
            </div>
        )
    }
}

*/}
