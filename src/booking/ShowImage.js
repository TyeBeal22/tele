import React from "react";
import { API } from "../config";


const ShowImage = ({ item, url }) => (

    <div className="product-img">
        <img
            src={`${API}/${url}/image/${item._id}`}
            alt={item.title}
            style={{ maxHeight: "100%", maxWidth: "100%" }}
        />
    </div>
    
);

export default ShowImage;
