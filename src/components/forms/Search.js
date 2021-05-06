import React, { useState } from "react";
import { DatePicker, Select, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import AlgoliaPlaces from "algolia-places-react";
import moment from "moment";
import { useHistory } from "react-router-dom";

// destructure values from ant components
const { RangePicker } = DatePicker;
const { Option } = Select;

const config = {
  appId: process.env.REACT_APP_ALGOLIA_APP_ID,
  apiKey: process.env.REACT_APP_ALGOLIA_API_KEY,
  language: "en",
  // countries: ["au"],
};

const Search = () => {
  // state
  const [title, setTitle] = useState("");

  // route
  const history = useHistory();

  const handleSubmit = () => {
    history.push(`/search-result?title=${title}`);
  };

  return (
    <div className="d-flex pb-4" style={{justifyContent: 'center'}}>
      <div className="w-100">
      <Input />
      </div>



      <SearchOutlined
        onClick={handleSubmit}
        className="btn btn-primary p-3 btn-square"
      />
    </div>
  );
};

export default Search;

