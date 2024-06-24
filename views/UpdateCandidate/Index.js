import React, { useState, useEffect } from "react";
import classnames from "classnames";
import Education from "./Components/Education";
import Personal from "./Components/Personal";
import Experience from "./Components/Experience";
import Activity from "./Components/Activity";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import axios from "../../axios/Axios";
import { useLocation, useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Index = () => {
  const { state } = useLocation();
  const History = useHistory();
  const params = useParams();

  if (!state && params.id) {
    toast.error("Id is not valid");
    History.push("/admin/list-page");
  }

  const [activeTab, setActiveTab] = useState("1");
  const [data, setData] = useState({});
  const [success, setSuccess] = useState(false);
  const [finalPage, setFinalPage] = useState(false);
  // const toggle = (tab) => {
  //   if (activeTab !== tab) setActiveTab(tab);
  // };

  useEffect(() => {
    if (state && params.id) {
      let personal = unwrap(state);
      setData({
        personal,
        education: state.education,
        course: state.course,
        experience: state.experience,
        salary: state.salary,
        activity: state.activity,
      });
    }
  }, []);

  const unwrap = ({
    id,
    firstName,
    middleName,
    lastName,
    dateOfBirth,
    gender,
    maritalStatus,
    candidateImage,
    referedBy,
    spouseName,
    wishlist,
    isActive,
    contactNumber,
    alternateContactNumber,
    email,
    skype,
    linkedIn,
  }) => ({
    id,
    firstName,
    middleName,
    lastName,
    dateOfBirth,
    gender,
    maritalStatus,
    candidateImage,
    referedBy,
    spouseName,
    wishlist,
    isActive,
    contactNumber,
    alternateContactNumber,
    email,
    skype,
    linkedIn,
  });
  const handleActiveTab = (number) => {
    setActiveTab(number);
  };
  const handleSetData = (obj) => {
    setData((curr) => ({ ...curr, ...obj }));
  };

  useEffect(() => {
    const update = async () => {
      let bodyData = data;
      const { candidateImage } = bodyData;
      delete bodyData["candidateImage"];
      delete bodyData["personal"];
      const { success, message } = await axios.put(
        `/candidate/${bodyData.id}`,
        bodyData
      );

      if (success && candidateImage !== null) {
        const formData = new FormData();
        formData.append("candidateImage", candidateImage);
        const { success, message } = await axios.put(
          `/uploadCandidateImage/${bodyData.id}`,
          formData
        );
        if (success) {
          toast.success(message);
          setFinalPage(false);
          setActiveTab("1");
          setSuccess(true);
          setData({});
          History.push("/admin/interview");
        }
      } else if (success) {
        toast.success(message);
        setFinalPage(false);
        setActiveTab("1");
        setSuccess(true);
        setData({});
        History.push("/admin/interview");
      }
    };
    if (finalPage) {
      update();
    }
  }, [data, finalPage]);

  const handlePrv = (number) => {
    setActiveTab(number);
  };
  return (
    <div className="content interview-content">
      <div className="text-right">
        <Link to="/admin/interview" className="btn bg-primary">
          Candidate List
        </Link>
      </div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "1" })}
            // onClick={() => {
            //   toggle("1");
            // }}
          >
            Personal
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            // onClick={() => {
            //   toggle("2");
            // }}
          >
            Education
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "3" })}
            // onClick={() => {
            //   toggle("3");
            // }}
          >
            Experience
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "4" })}
            // onClick={() => {
            //   toggle("4");
            // }}
          >
            Activity
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Personal
            handleActiveTab={handleActiveTab}
            handleSetData={handleSetData}
            personal={data.personal}
            success={success}
          />
        </TabPane>
        <TabPane tabId="2">
          <Education
            handleActiveTab={handleActiveTab}
            handleSetData={handleSetData}
            education={{ education: data.education, course: data.course }}
            success={success}
            handlePrv={handlePrv}
            setFinalPage={setFinalPage}
          />
        </TabPane>
        <TabPane tabId="3">
          <Experience
            handleActiveTab={handleActiveTab}
            handleSetData={handleSetData}
            experience={{ experience: data.experience, salary: data.salary }}
            handlePrv={handlePrv}
            setFinalPage={setFinalPage}
            success={success}
          />
        </TabPane>
        <TabPane tabId="4">
          <Activity
            handleSetData={handleSetData}
            activity={data.activity}
            success={success}
            setFinalPage={setFinalPage}
            handlePrv={handlePrv}
          />
        </TabPane>
      </TabContent>
    </div>
  );
};

export default Index;
