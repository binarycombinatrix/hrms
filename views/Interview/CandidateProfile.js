import React, { useState, useEffect } from "react";
import axios from "../../axios/Axios";
import { useHistory, useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Label,
  Button,
  Row,
  Table,
  CardHeader,
} from "reactstrap";
import { Link } from "react-router-dom";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import image from "../../assets/images/photo.png";
import CryptoJS from "crypto-js";
import moment from "moment";
const CandidateProfile = () => {
  const History = useHistory();
  const [candidateProfile, setCandidateProfile] = useState({});
  const params = useParams();

  if (!params.id) {
    History.push("/admin/candidate");
  }
  const [activeTab, setActiveTab] = useState("1");
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    let data = params.id.replaceAll("xMl3Jk", "/");
    var decrypted = CryptoJS.AES.decrypt(data, "Yeah*/").toString(
      CryptoJS.enc.Utf8
    );
    const fetchData = async () => {
      const res = await axios.get(`/candidateDetail/${decrypted}`);
      if (res.status) {
        setCandidateProfile(res.data);
      }
    };
    fetchData();
  }, [params.id]);

  const convertToEmployee = async () => {
    const res = await axios.get(`/candidateToEmployee/${candidateProfile.id}`);
    if (res.status) {
      window.location.reload();
    }
  };

  return (
    <div className="content">
      <div className="text-right">
        <Link to="/admin/interview" className="btn bg-primary">
          Candidate List
        </Link>
      </div>
      <Row className="mb-3">
        <Col md="4"></Col>
        <Col md="8" className="text-right d-flex justify-content-end">
          {candidateProfile.employeeId === null && (
            <Button className="mr-2" onClick={convertToEmployee}>
              Convert to employee
            </Button>
          )}

          {/* <Link to="candidate/edit"> */}
          <Button className="btn-alt">Edit candidate</Button>
          {/* </Link> */}
        </Col>
      </Row>
      <Row className="my-profile">
        <Col md="4">
          <Card className="">
            <div className="text-center mb-3 profile-image">
              <img
                src={
                  candidateProfile.candidateImage !== null
                    ? `http://192.168.0.31:3006/${candidateProfile.candidateImage}`
                    : image
                }
                alt="candidateImage"
              />
              <button>
                <span className="fa fa-edit"></span>
              </button>
            </div>
            <div className="user-info">
              <h3 className="header-name">{candidateProfile.firstName}</h3>
              <span class="designation">{candidateProfile.lastName}</span>
            </div>
            <div className="user-details">
              <div className="border-top-dashed">
                <div className="d-flex justify-content-between align-items-center">
                  <Label>
                    <i class="fa fa-mobile"></i>Conatct Information:
                  </Label>
                  <a href="#" className="details">
                    {candidateProfile.contactNumber}
                  </a>
                </div>
              </div>
              <div className="border-top-dashed">
                <div className="d-flex justify-content-between align-items-center">
                  <Label>
                    <i class="fa fa-user "></i>Candidate Status
                  </Label>
                  <button className="btn btn-block btn-primary btn-xs">
                    {candidateProfile?.activity?.candidateStatus?.name}
                  </button>
                </div>
              </div>
              <div className="border-top-dashed">
                <div className="d-flex justify-content-between align-items-center">
                  <Label>
                    <i class="fa fa-calendar-plus-o"></i>Interview Status
                  </Label>
                  <button className="btn btn-block btn-primary btn-md">
                    {candidateProfile?.interviewStatus === null
                      ? "-"
                      : candidateProfile?.interviewStatus?.title}
                  </button>
                </div>
              </div>
              <div className="border-top-dashed">
                <div className="d-flex justify-content-center align-items-center social-links">
                  {candidateProfile.skype && (
                    <a
                      href={candidateProfile.skype}
                      // href={`skype:${candidateProfile.skype}?chat`}
                      target="_blank"
                    >
                      <i class="fa fa-skype" aria-hidden="true"></i>
                    </a>
                  )}
                  {candidateProfile.linkedIn && (
                    <a href={candidateProfile.linkedIn} target="_blank">
                      <i class="fa  fa-linkedin" aria-hidden="true"></i>
                    </a>
                  )}
                  {candidateProfile.email && (
                    <a
                      //  href={candidateProfile.email}
                      href={`mailto:${candidateProfile.email}`}
                      target="_blank"
                    >
                      <i class="fa fa-envelope" aria-hidden="true"></i>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </Col>
        <Col md="8">
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "1" })}
                onClick={() => {
                  toggle("1");
                }}
              >
                Personal
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "2" })}
                onClick={() => {
                  toggle("2");
                }}
              >
                Education
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Card>
                <CardBody>
                  <Row>
                    <Col md="4">
                      <div class="form-group ">
                        <label>First Name:</label>
                        <p> {candidateProfile.firstName}</p>
                      </div>
                    </Col>
                    <Col md="4">
                      <div class="form-group ">
                        <label>Middle Name:</label>
                        <p> {candidateProfile.middleName}</p>
                      </div>
                    </Col>
                    <Col md="4">
                      <div class="form-group ">
                        <label>Last name:</label>
                        <p> {candidateProfile.lastName}</p>
                      </div>
                    </Col>
                    <Col md="4">
                      <div class="form-group ">
                        <label>Birthday:</label>
                        <p>
                          {moment(candidateProfile.dateOfBirth).format(
                            "dd/mm/yyyy"
                          )}
                        </p>
                      </div>
                    </Col>
                    <Col md="4">
                      <div class="form-group ">
                        <label>Gender:</label>
                        <p>
                          {" "}
                          {candidateProfile.gender === "M" ? "Male" : "Female"}
                        </p>
                      </div>
                    </Col>
                    <Col md="4">
                      <div class="form-group ">
                        <label>Refered by:</label>
                        <p> {candidateProfile.referedBy}</p>
                      </div>
                    </Col>
                    <Col md="4">
                      <div class="form-group ">
                        <label>Contact no :</label>
                        <p>{candidateProfile.contactNumber}</p>
                      </div>
                    </Col>

                    {/* <Col md="4">Email : Single</Col>
                    <Col md="4">LinkedIn : Single</Col>
                    <Col md="4">SkypeId : Single</Col> */}
                  </Row>
                </CardBody>
              </Card>
            </TabPane>
            <TabPane tabId="2">
              <Card>
                <CardBody>
                  <CardTitle tag="h6">EDUCATION</CardTitle>

                  {candidateProfile &&
                    candidateProfile?.education &&
                    candidateProfile.education.length > 0 &&
                    candidateProfile.education.map((education, idx) => (
                      <Row key={idx}>
                        <Col md="4">
                          <div class="form-group ">
                            <label>Education :</label>
                            <p>{education.educationtype.title}</p>
                          </div>
                        </Col>
                        <Col md="4">
                          <div class="form-group ">
                            <label>Course :</label>
                            <p>{education.course.title}</p>
                          </div>
                        </Col>
                        <Col md="4">
                          <div class="form-group ">
                            <label>Institute name :</label>
                            <p>{education.instituteName}</p>
                          </div>
                        </Col>
                        <Col md="4">
                          <div class="form-group ">
                            <label>Percentage :</label>
                            <p>{education.percentage}</p>
                          </div>
                        </Col>
                        <Col md="4">
                          <div class="form-group ">
                            <label>Passing year :</label>
                            <p>{education.passingYear}</p>
                          </div>
                        </Col>
                      </Row>
                    ))}

                  <CardTitle tag="h6">ADDITIONAL COURSE</CardTitle>
                  {candidateProfile &&
                    candidateProfile?.course &&
                    candidateProfile.course.length > 0 &&
                    candidateProfile.course.map((course, idx) => (
                      <Row key={idx}>
                        <Col md="4">
                          <div class="form-group ">
                            <label>Course :</label>
                            <p>{course.courseName}</p>
                          </div>
                        </Col>
                        <Col md="4">
                          <div class="form-group ">
                            <label>Institute name :</label>
                            <p>{course.instituteName}</p>
                          </div>
                        </Col>
                        <Col md="4">
                          <div class="form-group ">
                            <label>Skills :</label>
                            <p>{course.skills}</p>
                          </div>
                        </Col>
                      </Row>
                    ))}
                </CardBody>
              </Card>
            </TabPane>
          </TabContent>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <CardTitle tag="h6">
                <div class="card-custom-part d-flex justify-content-between">
                  <h6>EXPERIENCE</h6>
                  <div class="d-flex right-side-header">
                    <p>
                      Total Experience:<span class="ml-2">1</span>
                    </p>
                    <span class="mx-1">,</span>
                    <p>
                      Counted:<span class="ml-2">0 year(S)</span>
                    </p>
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardBody>
              {candidateProfile &&
              candidateProfile?.experience &&
              candidateProfile.experience.length > 0 ? (
                <>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Company Name</th>
                        <th>Designation</th>
                        <th>Technology</th>
                        <th>From</th>
                        <th>TO</th>
                      </tr>
                    </thead>
                    <tbody>
                      {candidateProfile.experience.map((experience, idx) => (
                        <tr key={idx}>
                          <td>{experience.company.name}</td>

                          <td>{experience.designation.title}</td>
                          <td>{experience.technology.title}</td>
                          <td>
                            {moment(experience.from).format("DD/MM/YYYY")}
                          </td>
                          <td>
                            {experience.to === null
                              ? "Present"
                              : moment(experience.to).format("DD/MM/YYYY")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </>
              ) : (
                <Col xs="12">
                  <h6 className="text-center">No records Found</h6>
                </Col>
              )}
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle tag="h6">SALARY</CardTitle>
            </CardHeader>
            <CardBody>
              {candidateProfile && candidateProfile?.salary && (
                <>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Company</th>
                        <th>Current</th>
                        <th>LI</th>
                        <th>Before</th>
                        <th>Expected</th>
                        <th>NP</th>
                        <th>Reason</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Comapny</td>

                        <td>{candidateProfile.salary.currentCtc}</td>

                        <td>
                          {moment(
                            candidateProfile.salary.lastIncrementDate
                          ).format("DD/MM/YYYY")}
                        </td>
                        <td>{candidateProfile.salary.salaryBeforeIncrement}</td>
                        <td>{candidateProfile.salary.expectedCtc}</td>
                        <td>{candidateProfile.salary.addNoticePeriod}</td>
                        <td>
                          {candidateProfile.salary.reasonForProfessionalGap}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CandidateProfile;
