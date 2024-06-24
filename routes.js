import Master from "views/Master/Index";
import Interview from "views/Interview/Index";
import Emp from "views/Emp/Index";
// import Employee from "views/Employee/Index";
import Company from "views/CompanyList/Index";
// import ScheduleInterview from "views/ScheduleInterview/Index";
import JobDescription from "views/JobDescription/Index";
import PageMaster from "views/CMS/Index";
import Holiday from "views/Holiday/Index";
import Dashboard from "views/Dashboard/Index";
import Colleges from "views/Colleges/Index";
import Interns from "views/Interns/Index";
import Projects from "views/Projects/Index";
import Content from "views/Content/Index";
import History from "views/History/Index";
import List from "views/List/Index";
import UserList from "views/User/list";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    layout: "/admin",
  },
  {
    name: "Organization",
    child: [
      {
        path: "/master",
        name: "Master",
        component: Master,
        layout: "/admin",
        icon: "fas fa-table",
      },
      {
        path: "/employee",
        name: "Employee",
        component: Emp,
        layout: "/admin",
        icon: "fas fa-user",
      },
      {
        path: "/holiday",
        name: "Holiday",
        component: Holiday,
        layout: "/admin",
        icon: "far fa-calendar",
      },
    ],
  },
  {
    name: "Recruitment",
    child: [
      {
        path: "/interview",
        name: "Candidates",
        component: Interview,
        layout: "/admin",
        icon: "fas fa-clock",
      },
      {
        path: "/job-description",
        name: "Job Description",
        component: JobDescription,
        layout: "/admin",
        icon: "fas fa-building",
      },
      {
        path: "/company",
        name: "Company",
        component: Company,
        layout: "/admin",
        icon: "fas fa-building",
      },
    ],
  },
  {
    name: "TPA",
    child: [
      {
        path: "/colleges",
        name: "Colleges",
        component: Colleges,
        layout: "/admin",
        icon: "fa fa-university",
      },
      {
        path: "/interns",
        name: "Interns",
        component: Interns,
        layout: "/admin",
        icon: "fa fa-male",
      },
      {
        path: "/projects",
        name: "Projects",
        component: Projects,
        layout: "/admin",
        icon: "fa fa-tasks",
      },
    ],
  },
  {
    name: "User",
    child: [
      {
        path: "/user/list",
        name: "List",
        component: UserList,
        layout: "/admin",
        icon: "fas fa-table",
      },
    ],
  },

  {
    name: "Documents",
    child: [
      {
        path: "/list",
        name: "List",
        component: List,
        layout: "/admin",
        icon: "fa fa-list",
      },
      {
        path: "/content",
        name: "Content",
        component: Content,
        layout: "/admin",
        icon: "fa fa-file-text",
      },
      {
        path: "/history",
        name: "History",
        component: History,
        layout: "/admin",
        icon: "fa fa-history",
      },
    ],
  },
  {
    name: "CMS",
    child: [
      {
        path: "/pagemaster",
        name: "Page Master",
        component: PageMaster,
        layout: "/admin",
        icon: "fas fa-table",
      },
    ],
  },
];

/*var routes = [
  {
    path: "/master",
    name: "Master",
    component: Master,
    layout: "/admin",
    icon: "fas fa-table",
  },
  {
    path: "/interview",
    name: "Interview",
    component: Interview,
    layout: "/admin",
    icon: "fas fa-clock",
  },
  // {
  //   path: "/employee",
  //   name: "Employee",
  //   component: Employee,
  //   layout: "/admin",
  // },
  
  {
    path: "/schedule-interview",
    name: "Schedule Interview",
    component: ScheduleInterview,
    layout: "/admin",
    icon: "fa fa-clock",
  },
  // {
  //   path: "/list-page",
  //   name: "List Page",
  //   component: ListPage,
  //   layout: "/admin",
  //   icon: " far fa-list-alt",
  // },
  {
    path: "/jobDescription",
    name: "Job Description",
    component: JobDescription,
    layout: "/admin",
    icon: "fas fa-building",
  },
  {
    path: "/pagemaster",
    name: "Page Master",
    component: PageMaster,
    layout: "/admin",
    icon: "fas fa-table",
  },
  {
    path: "/holiday",
    name: "Holiday",
    component: Holiday,
    layout: "/admin",
    icon: "far fa-calendar",
  },
];*/
export default routes;
