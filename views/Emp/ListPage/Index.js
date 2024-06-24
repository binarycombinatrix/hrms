import React, { useState, useEffect } from "react";
import { Card, CardBody, Table, Col, Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import ReactPaginate from "react-paginate";
import axios from "../../../axios/Axios";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import { FormGroup, Label, Input, CustomInput } from "reactstrap";
import CryptoJS from "crypto-js";

const Index = () => {
  const [searchParams, setSearchParams] = useState({
    search: "",
    fromDate: "",
    toDate: "",
    companyId: "",
    technologyId: "",
  });

  const [candidateList, setCandidateList] = useState([]);
  const [pagination, setPagination] = useState({ totalPages: 0 });
  const [popup, setPopup] = useState({
    show: false, // initial values set to false and null
    id: null,
    firstName: null,
    lastName: null,
  });
  const History = useHistory();
  const fetchData = async (pageNo) => {
    const res = await axios.get(`/employee?page=${pageNo || 1}&limit=10`);
    if (res.status) {
      const { totalPages, limit, totalRecords, currentPage } = res.data;
      setCandidateList(res.data.list);
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
      "Yeah*/"
    ).toString();
    let finalId = encodedId.replace("/", "xMl3Jk");
    History.push({
      pathname: `employee/update/${finalId}`,
      state: {
        ...obj,
      },
    });
  };

  const handleDeleteTrue = async () => {
    const res = await axios.delete(`/employee/${popup.id}`);
    if (res.status) {
      setCandidateList((curr) =>
        curr.filter((company) => company.id !== popup.id)
      );
      handleDeleteFalse();
    }
  };

  const handleDelete = (id, firstName, lastName) => {
    setPopup({
      show: true,
      id,
      firstName,
      lastName,
    });
  };
  const handleDeleteFalse = () => {
    setPopup({
      show: false,
      id: null,
      firstName: null,
      lastName: null,
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
    const res = await axios.get(`/employee`, { params });
    if (res.status) {
      setCandidateList(res.data);
    } else {
      setCandidateList([]);
    }
  };

  const close = (params) => {
    let searchParameter = { ...searchParams };
    searchParameter[params] = "";
    setSearchParams(searchParameter);
  };
  return (
    <>
      <div className="content">
        <Modal isOpen={popup.show} toggle={handleDeleteFalse} centered={true}>
          <ModalBody>
            Are you sure you want to delete the record of{" "}
            {`${popup.firstName} ${popup.lastName}`}?
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
      </div>
      <div className="col-12">
        <Card className="pt-3">
          {/* <CardHeader>
            <CardTitle tag="h6">Candidate List</CardTitle>
          </CardHeader> */}
          <div className="col-12">
            <div className="form-row">
              <FormGroup className="col-md-4">
                <Label for="searchby">Search by Name/Email/PhoneNumber</Label>
                <Input
                  type="text"
                  id="search"
                  maxlength="25"
                  value={searchParams.search}
                  onChange={handleSearchParams}
                />
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="fromDate">From[Experience]</Label>
                <Input
                  type="date"
                  id="fromDate"
                  value={searchParams.fromDate}
                  onChange={handleSearchParams}
                  onKeyDown={(e) => e.preventDefault()}
                />
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="toDate">To Date[Experience]</Label>
                <Input
                  type="date"
                  id="toDate"
                  value={searchParams.toDate}
                  onChange={handleSearchParams}
                  onKeyDown={(e) => e.preventDefault()}
                />
              </FormGroup>

              <FormGroup className="col-md-6">
                <Label for="Technology">Technology</Label>
                <CustomInput
                  type="select"
                  id="technologyId"
                  name="technologyId"
                  value={searchParams.technologyId}
                  onChange={handleSearchParams}
                  className="filter-drop"
                >
                  <option value="">Select technology</option>
                  <option value="1">PHP</option>
                  <option value="2">iOS</option>
                  <option value="3">Zend</option>
                  <option value="4">ASP.NET</option>
                  <option value="5">UI/UX</option>
                  <option value="6">SEO</option>
                  <option value="7">Python</option>
                </CustomInput>
                <button
                  type="button"
                  className="close filter-clear"
                  onClick={() => close("technology")}
                >
                  <span>×</span>
                </button>
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label for="company">Company</Label>
                <Input
                  type="text"
                  id="company"
                  maxlength="25"
                  value={searchParams.company}
                  onChange={handleSearchParams}
                />
              </FormGroup>
              <FormGroup className="col-md-12 text-right">
                <Button className="btn-alt custom-button" onClick={search}>
                  <i className="nc-icon nc-zoom-split mr-2" />
                  Search
                </Button>
              </FormGroup>
            </div>
          </div>
          <CardBody>
            {candidateList.length > 0 ? (
              <>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Phone Number</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {candidateList.length > 0 &&
                      candidateList.map((candidate, cmpIdx) => (
                        <tr key={cmpIdx}>
                          <td>{candidate.firstName}</td>

                          <td>{candidate.lastName}</td>

                          <td>{candidate.email}</td>
                          <td>{candidate.contactNumber}</td>

                          <td className="text-right">
                            <div className="action-btn">
                              <img
                                src={require(`../../../assets/img/edit.png`)}
                                alt="edit-icon"
                                className="edit-icon"
                                onClick={() => handleRoute(candidate)}
                              />
                              <img
                                src={require(`../../../assets/img/trash.png`)}
                                alt="trash-icon"
                                className="trash-icon"
                                onClick={() =>
                                  handleDelete(
                                    candidate.id,
                                    candidate.firstName,
                                    candidate.lastName
                                  )
                                }
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
                <Col md="12 m-2">
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
    </>
  );
};
export default Index;
