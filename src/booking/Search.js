import React, { useState, useEffect } from "react";
import { list } from "./apiCore";
import BookingCard from "../components/cards/BookingCard";
import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from "react-router-dom";
import './PostListing.css';


const Search = () => {
    const [data, setData] = useState({
        categories: [],
        title: "",
        search: "",
        results: [],
        searched: false
    });

    const history = useHistory();

    const { categories, title, search, results, searched } = data;



    const searchData = () => {
        // console.log(search, category);
        if (search) {
            list({ search: search || undefined, title:title}).then(
                response => {
                    if (response.error) {
                        console.log(response.error);
                    } else {
                        setData({ ...data, results: response, searched: true });
                    }
                }
            );
        }
    };

    const searchSubmit = e => {
        e.preventDefault();
        searchData();

    };

    const handleChange = name => event => {
        setData({ ...data, [name]: event.target.value, searched: false });
    };

    const searchMessage = (searched, results) => {
        if (searched && results.length > 1) {
            return `Found ${results.length} items`;
        }
        if (searched && results.length == 1) {
            return `Found ${results.length} item`;
        }
        if (searched && results.length < 1) {
            return `No products found`;
        }
    };

    const searchedProducts = (results = []) => {
        return (
            <div className="container">
                <h2 className="mt-4 mb-2" style={{textAlign: 'center'}}>
                    {searchMessage(searched, results)}
                </h2>

                <div className="row">
                {results.map((hotel, i) => (
                    <div className="col-sm-4 mb-1" style={{marginLeft:'auto',marginRight:'auto'}}>
                            <BookingCard key={i} hotel={hotel} />
                       </div>
                    ))}
        

                </div>
            </div>
        );
    };

    const searchForm = () => (
 
        <form onSubmit={searchSubmit}  id="demo-2">
            <span>
     
        
                      <input
                        type='search'
                        placeholder='Search'
                        onChange={handleChange("search")}
                      />
              
                    <div
  className="btn input-group-append"
  style={{ border: "none" }}
>
  <button className="input-group-text"><SearchIcon /></button>
</div>
            </span>
        </form>
       
    );

    return (


        <div className="row">
              <div className="container">{searchForm()}</div>
          
              <div className="container-fluid">
            {searchedProducts(results)} 
            </div>
              
                </div>
       
    );
};

export default Search;
