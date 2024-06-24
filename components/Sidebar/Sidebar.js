import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Nav } from "reactstrap";
import Cybercom from "../../assets/img/cybercom.png";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
    this.sidebar = React.createRef();
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  SidebarItem = ({ path, pro, name, icon, layout, key }) => (
    <li
      className={this.activeRoute(path) + (pro ? " active-pro" : "")}
      key={key}
    >
      <NavLink
        to={layout + path}
        className="nav-link withoutChild"
        activeClassName="active"
      >
        <p>{name}</p>
      </NavLink>
    </li>
  );
  SidebarItemDrawer = ({ routes, name }) => {
    const [open, setOpen] = useState(false);
    let iconName = open ? "up" : "down";
    return (
      <>
        <li onClick={() => setOpen(!open)}>
          <div
            className="nav-link"
            style={{ color: "white" }}
            activeClassName="active"
          >
            <div className="menu-link">
              {name}

              <div>
                <i class={`fa fa-angle-${iconName}`} aria-hidden="true"></i>
              </div>
            </div>
          </div>
        </li>
        {open &&
          routes.map((prop, key) => {
            return (
              <li
                className={
                  this.activeRoute(prop.path) +
                  (prop.pro ? " active-pro " : "") +
                  " submenu"
                }
                key={key}
              >
                <NavLink
                  to={prop.layout + prop.path}
                  className="nav-link "
                  activeClassName="active"
                >
                  <i className={prop.icon} />
                  <p>{prop.name}</p>
                </NavLink>
              </li>
            );
          })}
      </>
    );
  };

  render() {
    return (
      <div
        className="sidebar"
        data-color={this.props.bgColor}
        data-active-color={this.props.activeColor}
      >
        <div className="sidebar-wrapper" ref={this.sidebar}>
          <Link to="/admin/master" className="main-logo">
            <img src={Cybercom} alt="Cybercom" />
          </Link>

          <Nav>
            {this.props.routes.map((prop, key) => {
              if (prop.child) {
                return (
                  <this.SidebarItemDrawer
                    routes={prop.child}
                    name={prop.name}
                  />
                );
              }
              return (
                <this.SidebarItem
                  path={prop.path}
                  pro={prop.pro}
                  layout={prop.layout}
                  name={prop.name}
                  icon={prop.icon}
                  key={key}
                />
              );
            })}
          </Nav>
        </div>
      </div>
    );
  }
}

export default Sidebar;
