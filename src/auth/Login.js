import { useState } from "react";
import { toast } from "react-toastify";
import { login } from "../actions/auth";
import LoginForm from "../components/LoginForm";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  MDBNavbarNav,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBMask,
  MDBIcon,
  MDBView,
  MDBBtn
} from 'mdbreact';
import './Login.css';
import { FcBinoculars, FcHome,FcKey,FcDataConfiguration, FcLock} from "react-icons/fc";





const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { auth } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("SEND LOGIN DATA", { email, password });
    try {
      let res = await login({ email, password });

      if (res.data) {
        console.log(
          "SAVE USER RES IN REDUX AND LOCAL STORAGE THEN REDIRECT ===> "
        );
        // console.log(res.data);
        // save user and token to local storage
        window.localStorage.setItem("auth", JSON.stringify(res.data));
        // save user and token to redux
        dispatch({
          type: "LOGGED_IN_USER",
          payload: res.data,
        });
        history.push("/dashboard");
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 400) toast.error(err.response.data);
    }
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
        <a className="navl" href="#" onClick={logout}>
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


      <div className='classic-form-page' id='login'>

     

        <MDBView>
          <MDBMask
            className='d-flex justify-content-center align-items-center'
            overlay='stylish-strong'
          >
            <MDBContainer>
              <MDBRow>
                <MDBCol md='10' lg='6' xl='5' sm='12' className='mt-5 mx-auto'>
                  <MDBCard>
                    <MDBCardBody>
                      <div className='form-header purple-gradient'>
                        <h3>
                          <MDBIcon
                            icon='user'
                            className='mt-2 mb-2 text-white'
                          />{' '}
                          Log in:
                        </h3>
                        <a href='/register' style={{color:'#f7a440',fontWeight:'bold'}}>No Account? Create Account</a>
                      </div>
                      <LoginForm
              handleSubmit={handleSubmit}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            />
                      <div className='text-center mt-3 black-text'>
                        <MDBBtn className='purple-gradient' size='lg'>
                          Sign Up
                        </MDBBtn>
                        <hr />
                      </div>
                      <div className='inline-ul text-center d-flex justify-content-center'>
                        <a href='!#'>
                          <MDBIcon
                            fab
                            icon='twitter'
                            size='lg'
                            className='p-2 m-2  white-text'
                          />
                        </a>
                        <a href='!#'>
                          <MDBIcon
                            fab
                            icon='linkedin'
                            size='lg'
                            className='p-2 m-2 white-text'
                          />{' '}
                        </a>
                        <a href='!#'>
                          <MDBIcon
                            fab
                            icon='instagram'
                            size='lg'
                            className='p-2 m-2 white-text'
                          />
                        </a>
                      </div>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </MDBMask>
        </MDBView>
      </div>
    </>
  );
};

export default Login;
