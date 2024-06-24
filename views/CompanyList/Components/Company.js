import React from "react";
import { Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import CompanyList from "./CompanyList";
const Company = () => {
  return (
    <div>
      <Row>
        <Col xs="6"></Col>
        <Col xs="6" className="text-right">
          <Link to="company/add">
            <Button>Add Company</Button>
          </Link>
        </Col>
        <CompanyList />
      </Row>
    </div>
  );
};

export default Company;
