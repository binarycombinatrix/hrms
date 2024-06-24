import React from "react";
import { Row, Col, Button } from "reactstrap";

import { Link } from "react-router-dom";
import CandidateList from "./ListPage/Index";

const Index = () => {
  return (
    <div className="content interview-page">
      <Row className="mb-3">
        <Col md="4"></Col>
        <Col md="8" className="text-right d-flex justify-content-end">
          <Link to="schedule-interview">
            <Button className="btn-alt mr-2">Schedule Interview</Button>
          </Link>
          <Link to="candidate/add">
            <Button>Add Candidate</Button>
          </Link>
        </Col>
      </Row>

      <Row>
        <CandidateList />
      </Row>
    </div>
  );
};

export default Index;
