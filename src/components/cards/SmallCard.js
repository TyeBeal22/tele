import { currencyFormatter } from "../../actions/stripe";
import { diffDays } from "../../actions/hotel";
import { useHistory, Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "../Footer.css";
const SmallCard = ({
  h,
  handleHotelDelete = (f) => f,
  owner = false,
  showViewMoreButton = true,
}) => {
  const history = useHistory();
  return (
    <>
      <div className="card mb-3  justify-content-center">
        <div className="row no-gutters">
        
         
            {h.image && h.image.contentType ? (
              <a
              onClick={() => history.push(`/hotel/${h._id}`)}
              className="card-image img img-fluid"
              >
              <img
                src={`${process.env.REACT_APP_API}/hotel/image/${h._id}`}
                alt="grinders"
                className="card-image img-fluid moves"
                style={{height: '18em',width: '24rem'}}
              />
              </a>
            ) : (
              <img
                src="https://via.placeholder.com/900x500.png?text=MERN+Booking"
                alt="default hotel image"
                className="card-image img img-fluid"
              />
            )}
        
         
            <div className="card-body" style={{textAlign: 'center'}}>
              <h3 className="card-title">
                <span className="float-right text-primary">
                  {currencyFormatter({
                    amount: h.price * 100,
                    currency: "usd",
                  })}
                </span>{" "}
              </h3>

{/* 
              {showViewMoreButton && (
                  <button
                    onClick={() => history.push(`/hotel/${h._id}`)}
                    className="btn btn-primary myDiv"
                  >
                    {h.title}{" "}
                  </button>
                )}

                */}
                {owner && (
                  <>
                    <Link to={`/hotel/edit/${h._id}`}>
                      <EditOutlined className="text-warning moves" style={{fontSize: '2em',width:'2em'}} />
                    </Link>
                    <DeleteOutlined
                      onClick={() => handleHotelDelete(h._id)}
                      className="text-danger moves"
                      style={{fontSize: '2em'}} 
                    />
                  </>
                )}
              </div>
            </div>
          </div>
      
   
    </>
  );
};

export default SmallCard;
