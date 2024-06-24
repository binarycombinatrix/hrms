import React, { useState, useEffect } from "react";
import { Button, Row, Col } from "reactstrap";
import axios from "../../axios/Axios";
import { Card, CardBody, Table } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import { FormGroup, Input, Label } from "reactstrap";
import ReactPaginate from "react-paginate";
import CryptoJS from "crypto-js";
const Index = () => {
  const [collegeList, setCollegeList] = useState([]);
  const [pagination, setPagination] = useState({ totalPages: 0 });
  const [popup, setPopup] = useState({
    show: false, // initial values set to false and null
    id: null,
    collegeName: null,
  });

  const [searchParams, setSearchParams] = useState({
    collegeName: "",
    location: "",
    search: "",
    web: "",
  });

  const History = useHistory();
  const fetchData = async (pageNo) => {
    const res = await axios.get(`/college?page=${pageNo || 1}&limit=10`);
    if (res.status) {
      const { totalPages, limit, totalRecords, currentPage } = res.data;
      setCollegeList(res.data.list);
      setPagination({ totalPages, limit, totalRecords, currentPage });
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handlePageClick = (arg) => {
    fetchData(arg.selected + 1);
  };

  const handleRoute = (obj) => {
    let encodedId = CryptoJS.AES.encrypt(
      JSON.stringify(obj.id),
      "Yeah"
    ).toString();

    let finalId = encodedId.replace("/", "xMl3Jk").replace("/", "xMl3Jk");
    History.push({
      pathname: `colleges/edit/${finalId}`,
      state: {
        ...obj,
      },
    });
  };

  const handleDeleteTrue = async () => {
    const res = await axios.delete(`/college/${popup.id}`);
    if (res.status) {
      setCollegeList((curr) =>
        curr.filter((college) => college.id !== popup.id)
      );
      handleDeleteFalse();
    }
  };

  const handleDelete = (id, collegeName) => {
    setPopup({
      show: true,
      id,
      collegeName,
    });
  };
  const handleDeleteFalse = () => {
    setPopup({
      show: false,
      id: null,
      collegeName: null,
    });
  };

  const handleSearchParams = (e) => {
    let { id, value } = e.target;
    setSearchParams((curr) => ({
      ...curr,
      [id]: value,
    }));
  };
  const search = async () => {
    let params = {};
    for (let key in searchParams) {
      if (searchParams[key]) {
        params[key] = searchParams[key];
      }
    }
    const res = await axios.get(`/college`, { params });
    if (res.status) {
      setCollegeList(res.data);
    } else {
      setCollegeList([]);
    }
  };
  return (
    <div className="content">
      <Modal isOpen={popup.show} toggle={handleDeleteFalse} centered={true}>
        <ModalBody>
          Are you sure you want to delete the record of
          {` ${popup.collegeName}`}?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleDeleteTrue}>
            Yes
          </Button>
          <Button color="secondary" onClick={handleDeleteFalse}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <Row className="mb-3">
        <Col md="4"></Col>
        <Col md="8" className="text-right d-flex justify-content-end">
          <Link to="/admin/colleges/add">
            <Button>Add College</Button>
          </Link>
        </Col>
      </Row>
     
      <div className="row">
        <div className="col-12">
          <Card className="pt-3">
            <div className="col-12">
            <div className="form-row">
        <FormGroup className="col-md-4">
          <Label for="fromDate">College name</Label>
          <Input
            type="text"
            id="collegeName"
            maxlength="25"
            value={searchParams.collegeName}
            onChange={handleSearchParams}
          />
        </FormGroup>
        <FormGroup className="col-md-4">
          <Label for="toDate">Location</Label>
          <Input
            type="text"
            id="location"
            maxlength="25"
            value={searchParams.location}
            onChange={handleSearchParams}
          />
        </FormGroup>
        <FormGroup className="col-md-4">
          <Label for="searchby">Search by Name/Email/PhoneNumber</Label>
          <Input
            type="text"
            id="search"
            maxlength="35"
            value={searchParams.search}
            onChange={handleSearchParams}
          />
        </FormGroup>
        
        {/* <FormGroup className="col-md-6">
          <Label for="searchby">Web</Label>
          <Input
            type="text"
            id="web"
            maxlength="30"
            value={searchParams.web}
            onChange={handleSearchParams}
          />
        </FormGroup> */}
        <FormGroup className="col-md-12 text-right">
          <Button className="btn-alt mr-2" onClick={search}>
            <i className="nc-icon nc-zoom-split mr-2" />
            Search
          </Button>
        </FormGroup>
      </div>
            </div>
            <CardBody>
              {collegeList.length > 0 ? (
                <>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>College Name</th>
                        <th>Location</th>
                        <th>Contact Person</th>
                        <th>Email</th>
                        <th>Contact Number</th>
                        <th>Website</th>
                        <th className="text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {collegeList.length > 0 &&
                        collegeList.map((college, collegeIdx) => (
                          <tr key={collegeIdx}>
                            <td>{college.collegeName}</td>
                            <td>{college.streetLine1}</td>
                            <td>{college.contact[0].name}</td>
                            <td>{college.contact[0].email}</td>
                            <td>{college.contact[0].contactNumber}</td>
                            <td>{college.website}</td>

                            <td className="text-right">
                            <div className="action-btn">
                            <img src={require(`../../assets/img/edit.png`)} alt="edit-icon" className="edit-icon"  onClick={() => handleRoute(college)} />
                            <img src={require(`../../assets/img/trash.png`)} alt="trash-icon" className="trash-icon" onClick={() =>
                                  handleDelete(college.id, college.collegeName)
                                } />
                          </div>
                             
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                  <Col md="12">
                    <div className="row justify-content-center">
                      <ReactPaginate
                        previousLabel={"<"}
                        nextLabel={">"}
                        breakLabel={"..."}
                        pageCount={pagination.totalPages}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={3}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination"}
                        activeClassName={"active"}
                        breakClassName={"page-item"}
                        breakLinkClassName={"page-link"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link"}
                        previousClassName={"page-item"}
                        previousLinkClassName={"page-link"}
                        nextClassName={"page-item"}
                        nextLinkClassName={"page-link"}
                      />
                    </div>
                  </Col>
                </>
              ) : (
                <Col xs="12">
                  <h6 className="text-center">No records Found</h6>
                </Col>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
