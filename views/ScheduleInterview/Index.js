import React, { useState, useEffect } from "react";
import {
  Col,
  Button,
  Row,
  FormGroup,
  Input,
  Label,
  CustomInput,
} from "reactstrap";
import { Card, CardBody, Table } from "reactstrap";
import { useHistory } from "react-router-dom";
import ReactPaginate from "react-paginate";
import axios from "../../axios/Axios";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import CryptoJS from "crypto-js";
// import ScheduleInterviewList from "./ListScheduleInterview";
import { Link } from "react-router-dom";

const Index = () => {
  const [searchParams, setSearchParams] = useState({
    search: "",
    fromDate: "",
    toDate: "",
    interviewStatus: "",
    interviewer: "",
    technology: "",
  });
  const [scheduleInterviewList, setScheduleInterviewList] = useState([]);
  const [pagination, setPagination] = useState({ totalPages: 0 });
  const [popup, setPopup] = useState({
    show: false, // initial values set to false and null
    id: null,
    firstName: null,
    lastName: null,
  });
  const History = useHistory();
  const fetchData = async (pageNo) => {
    const res = await axios.get(
      `/scheduleInterview?page=${pageNo || 1}&limit=10`
    );
    if (res.status) {
      const { totalPages, limit, totalRecords, currentPage } = res.data;
      setScheduleInterviewList(res.data.list);
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
      pathname: `schedule-interview/update/${finalId}`,
      state: {
        ...obj,
      },
    });
  };

  const handleDeleteTrue = async () => {
    const res = await axios.delete(`/candidate/${popup.id}`);
    if (res.status) {
      setScheduleInterviewList((curr) =>
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
    const res = await axios.get(`/scheduleInterview`, { params });
    if (res.status) {
      setSearchParams({
        search: "",
        fromDate: "",
        toDate: "",
        interviewStatus: "",
        interviewer: "",
        technology: "",
      });
      setScheduleInterviewList(res.data);
    } else {
      setScheduleInterviewList([]);
    }
  };

  const close = (params) => {
    let searchParameter = { ...searchParams };
    searchParameter[params] = "";
    setSearchParams(searchParameter);
  };
  return (
    <div className="content interview-page">
      <Row className="mb-3">
        <Col md="4"></Col>
        <Col md="8" className="text-right d-flex justify-content-end">
          <Link to="/admin/schedule-interview/add">
            <Button>Add schedule interview</Button>
          </Link>
        </Col>
      </Row>
      <div className="form-row">
        <FormGroup className="col-md-4">
          <Label for="fromDate">From Date</Label>
          <Input
            type="date"
            id="fromDate"
            value={searchParams.fromDate}
            onChange={handleSearchParams}
            onKeyDown={(e) => e.preventDefault()}
          />
        </FormGroup>
        <FormGroup className="col-md-4">
          <Label for="toDate">To Date</Label>
          <Input
            type="date"
            id="toDate"
            value={searchParams.toDate}
            onChange={handleSearchParams}
            onKeyDown={(e) => e.preventDefault()}
          />
        </FormGroup>
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
      </div>
      <div className="form-row mb-3">
        <FormGroup className="col-md-4">
          <Label for="Technology">Technology</Label>
          <CustomInput
            type="select"
            id="technology"
            name="Technology"
            value={searchParams.technology}
            onChange={handleSearchParams}
            className="filter-drop"
          >
            <option value="">Select Technology</option>
            <option value="1">Javascript</option>
            <option value="3">PHP</option>
          </CustomInput>
          <button
            type="button"
            className="close filter-clear"
            onClick={() => close("technology")}
          >
            <span>×</span>
          </button>
        </FormGroup>
        <FormGroup className="col-md-4">
          <Label for="Technology">Interview Status</Label>
          <CustomInput
            type="select"
            id="interviewStatus"
            name="status"
            value={searchParams.interviewStatus}
            onChange={handleSearchParams}
            className="filter-drop"
          >
            <option value="">select interview status</option>
            <option>Scheduled</option>
            <option>Rescheduled</option>
            <option>Pending</option>
            <option>Cancelled</option>
          </CustomInput>
          <button
            type="button"
            className="close filter-clear"
            onClick={() => close("interviewStatus")}
          >
            <span>×</span>
          </button>
        </FormGroup>
        <FormGroup className="col-md-4">
          <Label for="interviewer">Interviewer</Label>
          <CustomInput
            type="select"
            id="interviewer"
            name="interviewer"
            value={searchParams.interviewer}
            onChange={handleSearchParams}
            className="filter-drop"
          >
            <option value="">select interviewer</option>
            <option>HR</option>
            <option>TL</option>
          </CustomInput>
          <button
            type="button"
            className="close filter-clear"
            onClick={() => close("interviewer")}
          >
            <span>×</span>
          </button>
        </FormGroup>
      </div>
      <div className="row">
        <FormGroup className="col-md-12 text-right">
          <Button className="btn-alt mr-2" onClick={search}>
            <i className="nc-icon nc-zoom-split mr-2" />
            Search
          </Button>
        </FormGroup>
        <div className="col-12">
          <Card>
            <CardBody>
              {scheduleInterviewList.length > 0 ? (
                <>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Candidate Name</th>

                        <th>Email</th>
                        <th>contact number</th>
                        <th>interview type</th>
                        <th>technology</th>
                        <th>interview status</th>
                        <th>date</th>
                        <th>time</th>
                        <th>total experience</th>
                        <th>interviewer</th>
                        <th className="text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scheduleInterviewList.length > 0 &&
                        scheduleInterviewList.map(
                          (scheduleInterview, scheduleInterviewIdx) => (
                            <tr key={scheduleInterviewIdx}>
                              <td>{`${scheduleInterview.candidate.firstName} ${scheduleInterview.candidate.lastName}`}</td>

                              <td>{scheduleInterview.candidate.email}</td>

                              <td>
                                {scheduleInterview.candidate.contactNumber}
                              </td>
                              <td>
                                {
                                  scheduleInterview.interviewdetail[0]
                                    .interviewType
                                }
                              </td>
                              <td>
                                {
                                  scheduleInterview.interviewdetail[0]
                                    .interviewType.title
                                }
                              </td>
                              <td>
                                {
                                  scheduleInterview.interviewdetail[0]
                                    .interviewStatus
                                }
                              </td>
                              <td>
                                {scheduleInterview.interviewdetail[0].date}
                              </td>
                              <td>
                                {scheduleInterview.interviewdetail[0].time}
                              </td>
                              <td>
                                {
                                  scheduleInterview.experiencedetail[0]
                                    .totalExperience
                                }
                              </td>
                              <td>
                                {
                                  scheduleInterview.interviewdetail[0]
                                    .interviewerName
                                }
                              </td>

                              <td className="text-right">
                                <i className="far fa-edit mr-3"></i>
                                <i className="far fa-trash-alt"></i>
                              </td>
                            </tr>
                          )
                        )}
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
      </div>
    </div>
  );
};

export default Index;
