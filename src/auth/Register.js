import { useState } from "react";
import RegisterForm from "../components/RegisterForm";
import axios from "axios";
import { toast } from "react-toastify";
import { register } from "../actions/auth";
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
import './Register.css';
import { FcHome } from "react-icons/fc";

const Register = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register({
        name,
        email,
        password,
        address,
      });
      console.log("REGISTER USER ===> ", res);
      toast.success("Register success. Please login.");
      history.push("/login");
    } catch (err) {
      console.log(err);
      if (err.response.status === 400) toast.error(err.response.data);
    }
  };

  return (
    <>

<nav sticky='top' style={{position: 'fixed'}}>
<MDBNavbarNav>
      <MDBRow>
      <div className="d-flex" style={{justifyContent:'space-between'}}>
<Link className="navl" to="/">
      <FcHome size='2rem' className="moves" />
     
      </Link>




      </div>
   </MDBRow>
      </MDBNavbarNav>
    </nav>



      <div id='register'>

       



        <MDBView>
          <MDBMask
            className='d-flex justify-content-center align-items-center'
            overlay='gradient'
          >
            <MDBContainer className='h-100 d-flex justify-content-center align-items-center'>
              <MDBRow>
                <MDBCol md='12' className='mt-5 mx-auto'>
                  <MDBCard>
                    <MDBCardBody>
                      <h2 className='font-weight-bold my-4 text-center mb-5 mt-4 font-weight-bold'>
                        <strong>REGISTER</strong>
                      </h2>
                      <hr />
                      <MDBRow className='mt-5'>
                        <MDBCol md='6' className='ml-lg-5 ml-md-3'>
                          <MDBRow className='pb-4'>
                            <MDBCol size='2' lg='1'>
                              <MDBIcon
                                icon='university'
                                size='lg'
                                className='indigo-text'
                              />
                            </MDBCol>
                            <MDBCol col='10'>
                              <h4 className='font-weight-bold mb-4'>
                                <strong>Quality</strong>
                              </h4>
                              <p className=''>
                           Crafted with Aircraft grade Alumium Rod, Razor sharp blades, powerful magnetic lids. Style and custimizations to bring you a unique product.
                              </p>
                            </MDBCol>
                          </MDBRow>
                        </MDBCol>
                        <MDBCol md='5'>
                          <MDBRow className='pb-4 d-flex justify-content-center mb-4'>
                            <h4 className='mr-4'>
                            <a href='/login' style={{color:'#f7a440',fontWeight:'bold'}}>
                        Already Registered? Log in
                              </a>
                            </h4>
                          </MDBRow>
                          <RegisterForm
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              address={address}
              setAddress={setAddress}
            />
                          <div className='text-center'>
                            <MDBBtn color='indigo' rounded>
                              Log in
                            </MDBBtn>
                          </div>
                        </MDBCol>
                      </MDBRow>
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

export default Register;
