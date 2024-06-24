import React, { useState, useEffect } from "react";
import { Card, CardBody, CustomInput, Table, Col, Button } from "reactstrap";
import { FormGroup, Input, Label } from "reactstrap";
import { useHistory } from "react-router-dom";
import ReactPaginate from "react-paginate";
import axios from "../../../axios/Axios";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import "./pagination.css";

const CompanyList = () => {
  const [searchParams, setSearchParams] = useState({
    search: "",
    name: "",
    city: "",
  });
  const [companyList, setCompanyList] = useState([]);
  const [pagination, setPagination] = useState({ totalPages: 0 });
  const [popup, setPopup] = useState({
    show: false, // initial values set to false and null
    id: null,
    name: null,
  });
  const History = useHistory();

  const fetchData = async (pageNo) => {
    const res = await axios.get(`/company?page=${pageNo || 1}&limit=10`);
    if (res.status) {
      const { totalPages, limit, totalRecords, currentPage } = res.data;
      setCompanyList(res.data.list);
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
    History.push({
      pathname: `company/update/${obj.id}`,
      state: obj,
    });
  };

  const handleDeleteTrue = async () => {
    const res = await axios.delete(`/company/${popup.id}`);
    if (res.status) {
      setCompanyList((curr) =>
        curr.filter((company) => company.id !== popup.id)
      );
      handleDeleteFalse();
    }
  };
  const handleDelete = (id, name) => {
    setPopup({
      show: true,
      id,
      name,
    });
  };
  const handleDeleteFalse = () => {
    setPopup({
      show: false,
      id: null,
      name: null,
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
    const res = await axios.get(`/company`, { params });
    if (res.status) {
      setCompanyList(res.data);
    } else {
      setCompanyList([]);
    }
  };
  const close = (params) => {
    let searchParameter = { ...searchParams };
    searchParameter[params] = "";
    setSearchParams(searchParameter);
  };
  return (
    <div className="col-12">
      <Modal isOpen={popup.show} toggle={handleDeleteFalse} centered={true}>
        <ModalBody>
          Are you sure you want to delete the record of
          {` ${popup.name}`}?
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
      <Card className="pt-3 mt-3">
        <div className="col-12">
          <div className="form-row">
            <FormGroup className="col-md-4">
              <Label for="documentName">Name</Label>
              <Input
                type="text"
                id="name"
                value={searchParams.name}
                onChange={handleSearchParams}
                maxlength="40"
              />
            </FormGroup>
            <FormGroup className="col-md-4">
              <Label for="code">Search by Name/Email</Label>
              <Input
                type="text"
                id="search"
                value={searchParams.search}
                onChange={handleSearchParams}
                maxlength="50"
              />
            </FormGroup>
            <FormGroup className="col-md-4">
              <Label for="city">city</Label>
              <CustomInput
                type="select"
                id="city"
                name="city"
                value={searchParams.city}
                onChange={handleSearchParams}
                className="filter-drop"
              >
                <option value="">Select city</option>
                <option value="Surat">Surat</option>
                <option value="Ahemdabad">Ahemdabad</option>
              </CustomInput>
              <button
                type="button"
                className="close filter-clear"
                onClick={() => close("city")}
              >
                <span>×</span>
              </button>
            </FormGroup>
            <FormGroup className="col-md-12 text-right">
              <Button className="btn-alt mr-2" onClick={search}>
                <i className="nc-icon nc-zoom-split mr-2" />
                Search
              </Button>
            </FormGroup>
          </div>
        </div>
        <CardBody>
          {companyList.length > 0 ? (
            <>
              <Table responsive>
                <thead className="text-primary">
                  <tr>
                    <th>Name</th>
                    <th>contact Email</th>
                    <th>city</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {companyList.length > 0 &&
                    companyList.map((company, cmpIdx) => (
                      <tr key={cmpIdx}>
                        <td>{company.name}</td>

                        <td>{company.contactEmail}</td>

                        <td>{company.city}</td>

                        <td className="text-right">
                          <div className="action-btn">
                            <img
                              src={require(`../../../assets/img/edit.png`)}
                              alt="edit-icon"
                              className="edit-icon"
                              onClick={() => handleRoute(company)}
                            />
                            <img
                              src={require(`../../../assets/img/trash.png`)}
                              alt="trash-icon"
                              className="trash-icon"
                              onClick={() =>
                                handleDelete(company.id, company.name)
                              }
                            />
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
  );
};

export default CompanyList;
