import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { faTrash, faPenSquare } from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import Modal from "react-bootstrap/Modal";

const ViewProducts = () => {
  const [gdata, gsetData] = useState([]);
  const [state, setState] = useState("");
  const [look, setLook] = useState(false);
  const [udata, uSetData] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const getting = () => {
    axios
      .get("http://127.0.0.1:8000/receipe/rec/")
      .then((res) => {
        gsetData(res.data);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getting();
  }, []);

  const getUpdatedDataa = (id) => {
    console.log(id);
    axios
      .get("http://localhost:8000/receipe/recc/" + id + "/")
      .then((res) => {
        uSetData(res.data);
      })
      .catch((error) => console.log(error));
  };
  const submitUpdatedData = (id) => (event) => {
    event.preventDefault();
    console.log(id);
    axios
      .put(`http://127.0.0.1:8000/receipe/recc/${id}/`, udata)
      .then((res) => {
        alert("updated data successfully...");
        getting();
        // setLook(false)
        setShow(false);
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = (id) => {
    const confirm=window.confirm("Are you sure want to delete the Receipe...?")
    if(confirm){
      axios
      .delete("http://localhost:8000/receipe/recc/" + id + "/")
      .then((res) => {
        alert("deleted successfully....");
        getting();
      })
      .catch((err) => console.log(err));
    }
   
  };
  useEffect(() => {
    if (state !== " ") {
      axios
        .get(`http://127.0.0.1:8000/receipe/fetching/${state}/`)
        .then((res) => {
          gsetData(res.data);
        })
        .catch((error) => console.log(error));
    } else {
      axios
        .get("http://127.0.0.1:8000/receipe/rec/")
        .then((res) => {
          gsetData(res.data);
        })
        .catch((error) => console.log(error));
    }
  }, [state]);
  return (
    <>
      <div className="main">
        <select
          style={{ width: "200px", float: "right", }}
          className="form-select"
          name="week"
          id="pr"
          onChange={(e) => {
            setState(e.target.value);
          }}
        >
          <option value="select">Select Products</option>
          <option value="thisweek">ThisWeek</option>
          <option value="lastweek">LastWeek</option>
        </select>
        <h3>Receipes</h3>
      </div>

      <div className='card-div' style={{ display: "flex", flexWrap: "wrap" }}>
        {gdata.map((d) => {
          return (
            <div
              key={d.id}
              className="card"
            >
              <img
                className="card-img-top"
                src={d.imgg}
                alt="Card image cap"
                style={{ height: "300px" }}
              />
              <div className="card-body">
                <h5 className="card-title">{d.name}</h5>
                <div
                  className="containerr"
                  style={{ display: "flex", float: "right" }}
                >
                  <div className="pic">
                    <button type="button" className="button">
                      <FontAwesomeIcon icon={faEllipsisVertical} />
                    </button>
                  </div>
                  <ul className="dropdown">
                    <li onClick={() => handleDelete(d.id)}><b>Delete</b></li>
                    <li
                      onClick={() => {
                        setShow(true);
                        getUpdatedDataa(d.id);
                      }}
                    ><b> Edit</b>

                    </li>
                  </ul>
                </div>
                <p className="card-text">{d.des.slice(0,150)}...</p>
                <p className="card-text">
                  <b>ReceipeType : </b>
                  {d.type}
                </p>
                <p className="card-text">
                  <b>Date : </b>
                  {d.datee}
                </p>

              </div>
            </div>
          );
        })}
        <Modal className="modal modal-lg" show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Update Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={submitUpdatedData(udata.id)}>
              {/* <div>
                <label htmlFor="id" className="form-label">
                  ID
                </label>
                <input
                  type="number"
                  disabled
                  className="form-control"
                  value={udata.id}
                />
              </div> */}
              <div>
                <label htmlFor="image" className="form-label">
                  <b>Image</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={udata.imgg}
                  onChange={(e) => uSetData({ ...udata, imgg: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="name" className="form-label">
                  <b>Name</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={udata.name}
                  onChange={(e) => uSetData({ ...udata, name: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="Description" className="form-label">
                  <b>Description</b>
                </label>
                <textarea
                  maxLength="500"
                  className="form-control"
                  value={udata.des}
                  onChange={(e) => uSetData({ ...udata, des: e.target.value })}
                />
              </div>
              <div className="form-group row ">
                <label for="veg/nonveg" className="form-label">
                  <b>Select</b>
                </label>
                <div className="col-sm-10">
                  <select
                    className="form-select"
                    name="type"
                    id="dd"
                    value={udata.type}
                    onChange={(e) =>
                      uSetData({ ...udata, type: e.target.value })
                    }
                  >
                    <option value="select">Select</option>
                    <option value="veg">Veg</option>
                    <option value="nonveg">NonVeg</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="Date" className="form-label">
                  <b>Date</b>
                </label>
                <input
                  type="date"
                  disabled
                  className="form-control"
                  value={udata.datee}
                  onChange={(e) =>
                    uSetData({ ...udata, datee: e.target.value })
                  }
                />
              </div>
              <br/>
              <br/>
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default ViewProducts;
