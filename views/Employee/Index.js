import React, { useState } from "react";
import classnames from "classnames";
// import Education from "./Components/Education";
// import Contact from "./Components/Contact";
import Personal from "./Components/Personal";
// import Experience from "./Components/Experience";
// import Activity from "./Components/Activity";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import Contact from "./Components/Contact";
import Address from "./Components/Address";
import Education from "./Components/Education";
import WorkExperience from "./Components/WorkExperience";
// import CheckList from "./Components/CheckList";

const Index = () => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  return (
    <div className="content">
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
            Contacts
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "3" })}
            onClick={() => {
              toggle("3");
            }}
          >
            Address
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "4" })}
            onClick={() => {
              toggle("4");
            }}
          >
            Education
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "5" })}
            onClick={() => {
              toggle("5");
            }}
          >
            Work & Experience
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "6" })}
            onClick={() => {
              toggle("6");
            }}
          >
            PF/ESIC
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "7" })}
            onClick={() => {
              toggle("7");
            }}
          >
            Service Agreement
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "8" })}
            onClick={() => {
              toggle("8");
            }}
          >
            Checklist
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Personal />
        </TabPane>
        <TabPane tabId="2">
          <Contact />
        </TabPane>
        <TabPane tabId="3">
          <Address />
        </TabPane>
        <TabPane tabId="4">
          <Education />
        </TabPane>
        <TabPane tabId="5">
          <WorkExperience />
        </TabPane>
        {/* <TabPane tabId="8">
          <CheckList />
        </TabPane> */}
      </TabContent>
    </div>
  );
};

export default Index;
