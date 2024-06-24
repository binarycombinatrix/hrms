/*!

=========================================================
* Paper Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input,
} from "reactstrap";

import routes from "routes.js";
import { connect } from "react-redux";
import { UserLogout } from "../../store/Auth/Action/Index";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      dropdownOpen: false,
      userDropdown: false,
      color: "transparent",
    };
    this.toggle = this.toggle.bind(this);
    this.dropdownToggle = this.dropdownToggle.bind(this);
    this.handleDropdown = this.handleDropdown.bind(this);
    this.sidebarToggle = React.createRef();
  }
  toggle() {
    if (this.state.isOpen) {
      this.setState({
        color: "transparent",
      });
    } else {
      this.setState({
        color: "dark",
      });
    }
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  dropdownToggle(e) {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  logoutUser = () => {
    this.props.UserLogout();
    this.props.history.push("/login");
  };

  handleDropdown(type) {
    if (type === "User") {
      this.setState({
        userDropdown: !this.state.userDropdown,
      });
    }
  }
  getBrand() {
    let brandName = "Default Brand";
    routes.map((prop, key) => {
      if (prop.child) {
        prop.child.forEach((prop, key) => {
          if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
            brandName = prop.name;
          }
        });
      }

      if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
        brandName = prop.name;
      }
      return null;
    });
    if (window.location.href.indexOf("/admin/company/add") !== -1) {
      brandName = "Add company";
    }
    if (window.location.href.indexOf("/admin/candidate/update") !== -1) {
      brandName = "Update candidate";
    }
    if (window.location.href.indexOf("/admin/candidate/add") !== -1) {
      brandName = "Add candidate";
    }
    if (window.location.href.indexOf("/admin/candidate/profile") !== -1) {
      brandName = "Candidate profile";
    }
    if (window.location.href.indexOf("/admin/employee/add") !== -1) {
      brandName = "Add employee";
    }
    if (window.location.href.indexOf("/admin/employee/edit") !== -1) {
      brandName = "Update employee";
    }
    if (window.location.href.indexOf("/admin/holiday-master/add") !== -1) {
      brandName = "Add holiday";
    }
    if (window.location.href.indexOf("/admin/company/update") !== -1) {
      brandName = "Update company";
    }
    if (window.location.href.indexOf("/admin/schedule-interview") !== -1) {
      brandName = "Schedule interview";
    }
    if (window.location.href.indexOf("/admin/colleges/add") !== -1) {
      brandName = "Add college";
    }
    if (window.location.href.indexOf("/admin/page/add") !== -1) {
      brandName = "Add page master";
    }
    if (window.location.href.indexOf("/admin/content/add") !== -1) {
      brandName = "Add content";
    }
    if (window.location.href.indexOf("/admin/content/edit") !== -1) {
      brandName = "Edit content";
    }
    if (window.location.href.indexOf("/admin/list/add") !== -1) {
      brandName = "Add document template";
    }
    if (window.location.href.indexOf("/admin/list/edit/:id") !== -1) {
      brandName = "Edit document template";
    }
    if (window.location.href.indexOf("/admin/colleges/edit") !== -1) {
      brandName = "Edit college";
    }
    if (window.location.href.indexOf("/admin/projects/add") !== -1) {
      brandName = "Add project";
    }

    if (window.location.href.indexOf("/admin/projects/edit") !== -1) {
      brandName = "Edit project";
    }
    if (window.location.href.indexOf("/admin/interns/add") !== -1) {
      brandName = "Add intern";
    }
    return brandName;
  }
  openSidebar() {
    document.documentElement.classList.toggle("nav-open");
    this.sidebarToggle.current.classList.toggle("toggled");
  }
  // function that adds color dark/transparent to the navbar on resize (this is for the collapse)
  updateColor() {
    if (window.innerWidth < 993 && this.state.isOpen) {
      this.setState({
        color: "dark",
      });
    } else {
      this.setState({
        color: "transparent",
      });
    }
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateColor.bind(this));
  }
  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      this.sidebarToggle.current.classList.toggle("toggled");
    }
  }
  render() {
    return (
      // add or remove classes depending if we are on full-screen-maps page or not
      <Navbar
        color={
          this.props.location.pathname.indexOf("full-screen-maps") !== -1
            ? "dark"
            : this.state.color
        }
        expand="lg"
        className={
          this.props.location.pathname.indexOf("full-screen-maps") !== -1
            ? "navbar-absolute fixed-top"
            : "navbar-absolute fixed-top " +
              (this.state.color === "transparent" ? "navbar-transparent " : "")
        }
      >
        <Container fluid>
          <div className="navbar-wrapper">
            <div className="navbar-toggle">
              <button
                type="button"
                ref={this.sidebarToggle}
                className="navbar-toggler"
                onClick={() => this.openSidebar()}
              >
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </button>
            </div>
            <NavbarBrand href="/">{this.getBrand()}</NavbarBrand>
          </div>
          <NavbarToggler onClick={this.toggle}>
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </NavbarToggler>
          <Collapse
            isOpen={this.state.isOpen}
            navbar
            className="justify-content-end"
          >
            <form>
              <InputGroup className="no-border">
                <Input placeholder="Search..." />
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <i className="nc-icon nc-zoom-split" />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </form>
            <Nav navbar>
              <NavItem>
                <Link to="#pablo" className="nav-link btn-magnify">
                  <i className="nc-icon nc-layout-11" />
                  <p>
                    <span className="d-lg-none d-md-block">Stats</span>
                  </p>
                </Link>
              </NavItem>
              <Dropdown
                nav
                isOpen={this.state.dropdownOpen}
                toggle={(e) => this.dropdownToggle(e)}
              >
                <DropdownToggle caret nav>
                  <i className="nc-icon nc-bell-55" />
                  <p>
                    <span className="d-lg-none d-md-block">Some Actions</span>
                  </p>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem tag="a">Action</DropdownItem>
                  <DropdownItem tag="a">Another Action</DropdownItem>
                  <DropdownItem tag="a">Something else here</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <NavItem>
                <Link to="#pablo" className="nav-link btn-rotate">
                  <i className="nc-icon nc-settings-gear-65" />
                  <p>
                    <span className="d-lg-none d-md-block">Account</span>
                  </p>
                </Link>
              </NavItem>
              {/* <NavItem>
                <Link to="#pablo" className="nav-link btn-magnify">
                  <i className="nc-icon nc-layout-11" />
                  <p>
                    <span className="d-lg-none d-md-block">Stats</span>
                  </p>
                </Link>
              </NavItem> */}
              <Dropdown
                nav
                isOpen={this.state.userDropdown}
                toggle={() => this.handleDropdown("User")}
              >
                <DropdownToggle caret nav>
                  <i className="nc-icon nc-single-02" />
                  <p>
                    <span className="d-lg-none d-md-block">Profile</span>
                  </p>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem tag="a">My Account</DropdownItem>
                  <DropdownItem tag="a">Settings</DropdownItem>
                  <DropdownItem onClick={this.logoutUser}>Logout</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

// export default Header;
export default connect(null, { UserLogout })(Header);
