import React from "react";
import { Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import HolidayMaster from "./HolidayList";

const Index = () => {
  return (
    <div className="content">
      <Row>
        <Col xs="6"></Col>
        <Col xs="6" className="text-right">
          <Link to="holiday-master/add">
            <Button>Add Holiday</Button>
          </Link>
        </Col>
        <HolidayMaster />
      </Row>
    </div>
  );
};

export default Index;
