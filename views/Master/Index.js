import React from "react";
import Designation from "./components/Designation";
import BloodGroup from "./components/BloodGroup";
import Education from "./components/Education";
import Department from "./components/Department";
import Skill from "./components/Skill";
import TechnologyMaster from "./components/TechnologyMaster";
import { Row, Col } from "reactstrap";
import Course from "./components/Course";
import JobChangeReason from "./components/JobChangeReason";
import ActivityStatus from "./components/ActivityStatus";
import InterviewStatus from "./components/InterviewStatus";
import InterviewType from "./components/InterviewType";

const Index = () => {
  return (
    <>
      <div className="content">
        <Row>
          <Col md="6">
            <BloodGroup />
          </Col>
          <Col md="6">
            <Education />
          </Col>
          <Col md="6">
            <Department />
          </Col>
          <Col md="6">
            <Designation />
          </Col>
          <Col md="6">
            <Skill />
          </Col>
          <Col md="6">
            <TechnologyMaster />
          </Col>
          <Col md="6">
            <JobChangeReason />
          </Col>
          <Col md="6">
            <Course />
          </Col>
          <Col md="6">
            <ActivityStatus />
          </Col>
          <Col md="6">
            <InterviewStatus />
          </Col>
          <Col md="6">
            <InterviewType />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Index;
