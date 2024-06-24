import React from "react";
// javascript plugin used to create scrollbars on windows
import { Route, Switch } from "react-router-dom";

import DemoNavbar from "components/Navbars/DemoNavbar.js";

import Sidebar from "components/Sidebar/Sidebar.js";
import AddCompany from "views/CompanyList/Components/AddCompany";
import UpdateCompany from "views/CompanyList/Components/UpdateCompany";
import UpdateCandidate from "views/UpdateCandidate/Index";
// import HolidayList from "views/Holiday/HolidayList";
import EditHoliday from "views/Holiday/EditHoliday";
import AddHoliday from "views/Holiday/Add";
import AddCandidate from "views/Interview/Components/Index";
import AddEmployee from "views/Emp/Components/Index";
import scheduleInterview from "views/ScheduleInterview/ScheduleInterview";
import AddColleges from "views/Colleges/AddColleges";
import UpdateCollge from "views/Colleges/UpdateCollege";
import AddProjects from "views/Projects/AddProjects";
import AddList from "views/List/AddList";
import AddContent from "views/Content/AddContent";
import UpdateContent from "views/Content/UpdateContent";
import UpdateList from "views/List/UpdateList";
import UpdateProjects from "views/Projects/UpdateProject";
import AddJobDescription from "views/JobDescription/AddJobDescription";
import AddCms from "views/CMS/AddCms";
import CandidateProfile from "views/Interview/CandidateProfile";
import RegisterUser from "views/User/register";
import UserList from "views/User/list";
import routes from "routes.js";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "black",
      activeColor: "info",
    };
    this.mainPanel = React.createRef();
  }

  createRoutes = () => {
    let arrRoutes = routes.filter((e) => e.child);
    let arrWithOutRoutes = routes.filter((e) => !e.child);
    return [
      ...arrWithOutRoutes,
      ...arrRoutes.reduce((now, curr) => [...now, ...curr.child], []),
    ];
  };

  render() {
    return (
      <div className="wrapper">
        <Sidebar
          {...this.props}
          routes={routes}
          bgColor={this.state.backgroundColor}
          activeColor={this.state.activeColor}
        />
        <div className="main-panel" ref={this.mainPanel}>
          <DemoNavbar {...this.props} />
          <Switch>
            <Route path="/admin/company/add" component={AddCompany} />
            <Route path="/admin/company/update/:id" component={UpdateCompany} />

            <Route path="/admin/employee/add" component={AddEmployee} />
            <Route exact path="/admin/user/list" component={UserList} />
            <Route exact path="/admin/user/register" component={RegisterUser} />
            <Route exact path="/admin/user/update/:id" component={RegisterUser} />

            <Route
              exact
              path="/admin/holiday-master/edit/:id"
              component={EditHoliday}
            />

            <Route
              exact
              path="/admin/holiday-master/add"
              component={AddHoliday}
            />
            <Route exact path="/admin/page/add" component={AddCms} />
            <Route exact path="/admin/colleges/add" component={AddColleges} />
            <Route exact path="/admin/content/add" component={AddContent} />
            <Route
              exact
              path="/admin/content/edit/:id"
              component={UpdateContent}
            />
            <Route
              exact
              path="/admin/colleges/edit/:id"
              component={UpdateCollge}
            />
            <Route exact path="/admin/projects/add" component={AddProjects} />
            <Route
              exact
              path="/admin/projects/edit/:id"
              component={UpdateProjects}
            />
            <Route exact path="/admin/list/add" component={AddList} />
            <Route exact path="/admin/list/edit/:id" component={UpdateList} />
            <Route
              exact
              path="/admin/job-description/add"
              component={AddJobDescription}
            />

            <Route
              exact
              path="/admin/schedule-interview"
              component={scheduleInterview}
            />

            <Route exact path="/admin/candidate/add" component={AddCandidate} />
            <Route
              exact
              path="/admin/candidate/profile/:id"
              component={CandidateProfile}
            />

            <Route
              path="/admin/candidate/update/:id"
              component={UpdateCandidate}
            />

            {this.createRoutes().map((prop, key) => {
              return (
                <Route
                  exact
                  path={prop.layout + prop.path}
                  component={prop.component}
                  key={key}
                />
              );
            })}
          </Switch>
        </div>
      </div>
    );
  }
}

export default Dashboard;
