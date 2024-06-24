import React, { useState, useEffect } from "react";
import classnames from "classnames";
import Education from "./Education";
import Personal from "./Personal";
import Experience from "./Experience";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import axios from "../../../axios/Axios";
import { Link } from "react-router-dom";

const Index = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [data, setData] = useState({});
  const [success, setSuccess] = useState(false);
  const [finalPage, setFinalPage] = useState(false);
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const handleActiveTab = (number) => {
    setActiveTab(number);
  };
  const handleSetData = (obj) => {
    setData((curr) => ({ ...curr, ...obj }));
  };
  useEffect(() => {
    const access = async () => {
      if (data.experience) {
        let bodyData = data;
        const { employeeImage } = bodyData;

        delete bodyData["employeeImage"];

        const {
          success,
          data: { id },
        } = await axios.post("/employee", bodyData);

        if (success && employeeImage) {
          const formData = new FormData();
          formData.append("employeeImage", employeeImage);
          const { success } = await axios.post(
            `/uploadEmployeeImage/${id}`,
            formData
          );
          if (success) {
            setFinalPage(false);
            setActiveTab("1");
            setSuccess(true);
            setData({});
          }
        } else if (success) {
          setFinalPage(false);
          setActiveTab("1");
          setSuccess(true);
          setData({});
        }
      }
    };
    if (finalPage) {
      access();
    }
  }, [data, finalPage]);

  const handlePrv = (number) => {
    setActiveTab(number);
  };

  return (
    <div className="content interview-content">
      <div className="text-right">
        <Link to="/admin/employee" className="btn bg-primary">
          Employee List
        </Link>
      </div>
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
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "3" })}
            onClick={() => {
              toggle("3");
            }}
          >
            Experience
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Personal
            handleActiveTab={handleActiveTab}
            handleSetData={handleSetData}
            setSuccess={setSuccess}
            success={success}
          />
        </TabPane>
        <TabPane tabId="2">
          <Education
            handleActiveTab={handleActiveTab}
            handleSetData={handleSetData}
            handlePrv={handlePrv}
            setFinalPage={setFinalPage}
            success={success}
          />
        </TabPane>
        <TabPane tabId="3">
          <Experience
            handleActiveTab={handleActiveTab}
            handleSetData={handleSetData}
            handlePrv={handlePrv}
            setFinalPage={setFinalPage}
            success={success}
          />
        </TabPane>
      </TabContent>
    </div>
  );
};

export default Index;
