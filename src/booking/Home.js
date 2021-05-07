import { React, useState, useEffect } from "react";
import { allHotels } from "../actions/hotel";
import SmallCard from "../components/cards/SmallCard";
import Search from "./Search";
import ember from '../img/ember.png';
import back from '../img/back.png';
import './PostListing.css';
import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';
import { FcMultipleCameras, FcExternal } from "react-icons/fc";
import {animateScroll as scroll} from 'react-scroll'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBJumbotron,
  MDBFooter
} from 'mdbreact';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { FcBinoculars, FcHome,FcKey,FcDataConfiguration, FcLock } from "react-icons/fc";
import twitter from "../img/twitter.png";
import './PostListing.css';


const Home = () => {

  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => ({ ...state }));
  const history = useHistory();

  useEffect(() => {
    loadAllhotels();
  }, []);

  const loadAllhotels = async () => {
    let res = await allHotels();
    setHotels(res.data);
  }
  ;

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
 
    <nav style={{position: 'sticky'}}>
   

      <div className="d-flex" style={{justifyContent:'space-between'}}>
      <Link className="navl" to="/">
      <FcHome size='2rem' className="moves"/>
      </Link>
 
      {auth !== null && (
        <Link className="navl" to="/dashboard">
        <FcBinoculars size="2rem" className="moves" />
        </Link>
      )}
 

      {auth !== null && (
        <a className="pointer navl" href="#" onClick={logout}>
          <FcLock size="2rem" className="moves" />
        </a>
      )}

      {auth === null && (
        <>
          <Link className="navl" to="/login">
          <FcKey size='2rem' className="moves" />
          </Link>

        </>
      )}
    </div>
  

    
         </nav>
    
 <div style={{backgroundImage:`url(${back})`,  backgroundPosition: 'center', backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat' }}>
       

       <MDBJumbotron className="p-5 text-center text-md-left author-box">
                    <Zoom>
                        <h4 className="h3-responsive text-center font-weight-bold" style={{color:'#fff'}}>GrinderGifts</h4>
                        </Zoom>
                        <hr/>
                        <MDBRow>
                        <MDBCol size="12" md="2" className="mb-md-0 mb-4">
                                <img src={ember} className="img-fluid emb rounded-circle z-depth-2" alt="An avatar"/>
                            </MDBCol>
                            <MDBCol size="12" md="10">

                            </MDBCol>
                        </MDBRow>
                             
  
                    </MDBJumbotron>
                  
                    </div>
              
               <div style={{ display: "flex",flexDirection: "column",flexDirection: "row"}}>
                    <Search />
                    </div>
        <br />
       
     
      <div style={{ display: "flex",flexDirection: "column", position: "static",overflowX:"auto",flexDirection: "row",maxHeight: "100vh",alignContent: "center"}}>
  

        {/*<pre>{JSON.stringify(hotels, null, 4)}</pre> */} 
        {hotels.map((h) => (
          <Fade>
          <SmallCard key={h._id} h={h} />
          </Fade>
        ))}
   
      
       </div>




   {/* break */}


       <MDBFooter className='pt-3 mt-5 text-center text-md-left'>

   <hr />
   <MDBContainer>
     <MDBRow>
       <MDBCol md='12'>
         <ul className='list-unstyled d-flex justify-content-center mb-0 pb-0 pt-2 list-inline'>

           <li className='list-inline-item'>
           <a href="https://www.instagram.com/grindergifts/" className>
             <FcMultipleCameras
               fab
               icon='instagram'
               size='4rem'
               className='white-text p-2 m-2 moves'
             />
           </a></li>
           <a href="https://www.twitter.com/grindergifts/" className>
           <li className='list-inline-item'>
             <img
               src={twitter}
               style={{height:"3.5rem"}}
               className='pt-4 moves'
             />
          </li></a>
           <li className='list-inline-item'>
             <FcExternal
               fab
               icon='google-plus'
               size='4rem'
               className='white-text p-2 m-2 moves'
               onClick={() => scroll.scrollToTop()}
             />
           </li>
         </ul>
       </MDBCol>
     </MDBRow>
   </MDBContainer>

 </MDBFooter>

    </>
  );
};

export default Home;
