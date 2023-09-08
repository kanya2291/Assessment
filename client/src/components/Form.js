import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { Link } from "react-router-dom";
import "./styles.css";
import { Dropdown } from "primereact/dropdown";
const Form = () => {
  const [data, setData] = useState({
    name: " ",
    des: " ",
    type: " ",
    datee: " ",
    imgg: " ",
  });

  const handlesubmit = (event) => {
    event.preventDefault();
    
    axios
      .post("http://127.0.0.1:8000/receipe/rec/", data)
      .then((res) => {
        alert("data added successfully..........");
        setData({ name: " ", des: " ", type: " ", datee: " ", imgg: " " });
      })
      .catch((error) => console.log(error));
   
  };


  return (
    <div  className="body-bg">
     
        <div className="formm">
          <form onSubmit={handlesubmit}>
          <h1>Create Receipe</h1>
            <div className="form-group row">
              <label htmlFor="name" id="labell" className="col-sm-2 col-form-label">
                Receipe Name
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  required
                  className="form-control"
                  placeholder="Enter Receipe Name"
                  id="name"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                />
              </div>
            </div>
            <br />
            <div className="form-group row">
              <label id="labell"  htmlFor="description" className="col-2 col-form-label">
                Description
              </label>
              <div className="col-sm-10">
                <textarea
                  maxLength="500"
                  required
                  value={data.des}
                  className="form-control"
                  id="description"
                  placeholder="description"
                  onChange={(e) => setData({ ...data, des: e.target.value })}
                />
              </div>
            </div>
            <br />
            <div className="form-group row ">
              <label  id="labell" htmlFor="veg/nonveg" className="col-sm-2 col-form-label">
                Select
              </label>
              <div className="col-sm-10">
                <select
                  name="type"
                  id="dd"
                  value={data.type}
                  className="form-select "
                  required
                  onChange={(e) => setData({ ...data, type: e.target.value })}
                >
                  <option value="select">Select</option>
                  <option value="veg">Veg</option>
                  <option value="nonveg">NonVeg</option>
                </select>
              </div>
            </div>
            <br />
            <div className="form-group row">
              <label id="labell"  htmlFor="date" className="col-sm-2 col-form-label">
                Date
              </label>
              <div className="col-sm-10">
                <input
                value={data.datee}
                  type="date"
                  required
                  className="form-control"
                  id="date"
                  onChange={(e) => setData({ ...data, datee: e.target.value })}
                />
              </div>
            </div>
            <br />
            <div className="form-group row">
              <label  id="labell" htmlFor="image" className="col-sm-2 col-form-label">
                Image
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  required
                  value={data.imgg}
                  className="form-control"
                  id="img"
                  onChange={(e) => setData({ ...data, imgg: e.target.value })}
                />
              </div>
            </div>
            <br />
            <br />
            <button
              type="submit"
              className="btn btn-secondary"
              style={{ margin: "10px" }}
            >
              Add Receipe
            </button>
            <Link to="/view" className="btn btn-secondary">
              View Receipes
            </Link>
          </form>
        </div>
    </div>
  );
};

export default Form;
