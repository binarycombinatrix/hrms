import React from "react";
import { Row, Col, Button } from "reactstrap";

import { Link } from "react-router-dom";
import CandidateList from "./ListPage/Index";

const Index = () => {
  return (
    <div className="content employee-page">
      <div className="mb-3">
        <div className="d-flex justify-content-end">
        <Link to="employee/add">
            <Button className="custom-button">Add Employee</Button>
          </Link>
        </div>
      </div>
      {/* <div className="form-row">
        <FormGroup className="col-md-4">
          <Label for="fromDate">From Date</Label>
          <Input type="date" id="fromDate" />
        </FormGroup>
        <FormGroup className="col-md-4">
          <Label for="toDate">To Date</Label>
          <Input type="date" id="toDate" />
        </FormGroup>
        <FormGroup className="col-md-4">
          <Label for="searchby">Search by Name/Email/PhoneNumber</Label>
          <Input type="text" id="searchby" maxlength="10" />
        </FormGroup>
      </div>
      <div className="form-row mb-3">
        <FormGroup className="col-md-4">
          <Label for="Technology">Technology</Label>
          <CustomInput type="select" id="Technology" name="Technology">
            <option value="">select technology</option>
            <option>PHP</option>
            <option>JS</option>
            <option>Zend</option>
          </CustomInput>
        </FormGroup>
        <FormGroup className="col-md-4">
          <Label for="Technology">Interview Status</Label>
          <CustomInput type="select" id="status" name="status">
            <option value="">select interview status</option>
            <option>Scheduled</option>
            <option>Rescheduled</option>
            <option>Pending</option>
            <option>Cancelled</option>
          </CustomInput>
        </FormGroup>
        <FormGroup className="col-md-4">
          <Label for="interviewer">Interviewer</Label>
          <CustomInput type="select" id="interviewer" name="interviewer">
            <option value="">select interviewer</option>
            <option>HR</option>
            <option>TL</option>
          </CustomInput>
        </FormGroup>
      </div> */}

      <Row>
        <CandidateList />
      </Row>
    </div>
  );
};

export default Index;
