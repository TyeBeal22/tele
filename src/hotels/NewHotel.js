import { useState } from "react";
import { toast } from "react-toastify";
import { DatePicker, Select } from "antd";
import { createHotel } from "../actions/hotel";
import { useSelector, useDispatch} from "react-redux";
import HotelCreateForm from "../components/forms/HotelCreateForm";
import {
  MDBNavbarNav,
  MDBRow,
  MDBNavbar,
} from 'mdbreact';
import { useHistory, Link } from "react-router-dom";
import { FcBinoculars, FcHome,FcKey,FcDataConfiguration, FcLock, FcComments } from "react-icons/fc";
const { Option } = Select;

const NewHotel = () => {
  // redux
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  const history = useHistory();
  const [values, setValues] = useState({
    title: "",
    content: "",
    image: "",
    image2: "",
    price: "",
  });
  const [preview, setPreview] = useState(
    "https://via.placeholder.com/100x100.png?text=PREVIEW"
  );
  const [location, setLocation] = useState("");
  // destructuring variables from state
  const { title, content, image, image2, price, from, to, bed } = values;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(values);
    // console.log(location);

    let hotelData = new FormData();
    hotelData.append("title", title);
    hotelData.append("content", content);
    hotelData.append("location", location);
    hotelData.append("price", price);
    image && hotelData.append("image", image);
    image2 && hotelData.append("image2", image2);

    console.log([...hotelData]);

    try {
      let res = await createHotel(token, hotelData);
      console.log("HOTEL CREATE RES", res);
      toast.success("New hotel is posted");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
    }
  };

  const handleImageChange = (e) => {
    // console.log(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
    setValues({ ...values, image: e.target.files[0] });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();
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
      <div className="container-fluid bg-secondary p-5 text-center">
        <h2>Add Product</h2>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <br />
            <HotelCreateForm
              values={values}
              setValues={setValues}
              handleChange={handleChange}
              handleImageChange={handleImageChange}
              handleSubmit={handleSubmit}
              location={location}
              setLocation={setLocation}
            />
          </div>
          <div className="col-md-2">
            <img
              src={preview}
              alt="preview_image"
              className="img img-fluid m-2"
            />
            <pre>{JSON.stringify(values, null, 4)}</pre>
            {JSON.stringify(location)}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewHotel;
