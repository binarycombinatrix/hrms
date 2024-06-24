import React from "react";

// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col
} from "reactstrap";
// core components
import {
  dashboard24HoursPerformanceChart,
  dashboardEmailStatisticsChart,
  dashboardNASDAQChart,
} from "variables/charts.js";
const Index = () => {
  return (
    // <div className="content">
    //   <div className="admin-cards">

    //     <div className="card-box">
    //    <div className="cards bg-aqua">
    //       <div className="card-inner">
    //           <div className="details">
    //               <h3>0</h3>
    //               <p>Employees</p>

    //           </div>
             
    //           <div className="icon">
    //             <i className="fa fa-users"></i>
    //           </div>
    //       </div>
    //    </div>
    //    <div className="cards bg-red">
    //    <div className="card-inner">
    //           <div className="details">
    //               <h3>3</h3>
    //               <p>Employees joining</p>

    //           </div>
             
    //           <div className="icon">
    //             <i className="fa fa-user-plus"></i>
    //           </div>
    //       </div>
    //    </div>
    //    <div className="cards bg-yellow">
    //    <div className="card-inner">
    //           <div className="details">
    //               <h3>10</h3>
    //               <p>Employees exiting</p>

    //           </div>
             
    //           <div className="icon">
    //             <i className="fa fa-user"></i>
    //           </div>
    //       </div>
    //    </div>
    //    <div className="cards bg-green">
    //    <div className="card-inner">
    //           <div className="details">
    //               <h3>5</h3>
    //               <p>Leads</p>

    //           </div>
             
    //           <div className="icon">
    //             <i className="fa fa-user"></i>
    //           </div>
    //       </div>
    //    </div>
    //  </div>
    //     </div>
    //     <Row>
    //       <Col sm="6">
    //       <Card>
    //     <CardHeader>
    //       <CardTitle tag="h6">EMPLOYEE CHART</CardTitle>
    //     </CardHeader>
    //     <CardBody>

    //       </CardBody>
    //       </Card>
    //       </Col>
    //     </Row>
    // </div>
    <>
    <div className="content">
      <Row>
        <Col lg="3" md="6" sm="6">
          <Card className="card-stats">
            <CardBody>
              <Row>
                <Col md="4" xs="5">
                  <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-single-02 text-warning" />
                  </div>
                </Col>
                <Col md="8" xs="7">
                  <div className="numbers">
                    <p className="card-category">Employees</p>
                    <CardTitle tag="p">150</CardTitle>
                    <p />
                  </div>
                </Col>
              </Row>
            </CardBody>
            <CardFooter>
              <hr />
              <div className="stats">
                <i className="fas fa-sync-alt" /> Update Now
              </div>
            </CardFooter>
          </Card>
        </Col>
        <Col lg="3" md="6" sm="6">
          <Card className="card-stats">
            <CardBody>
              <Row>
                <Col md="4" xs="5">
                  <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-money-coins text-success" />
                  </div>
                </Col>
                <Col md="8" xs="7">
                  <div className="numbers">
                    <p className="card-category">Revenue</p>
                    <CardTitle tag="p">$ 1,345</CardTitle>
                    <p />
                  </div>
                </Col>
              </Row>
            </CardBody>
            <CardFooter>
              <hr />
              <div className="stats">
                <i className="far fa-calendar" /> Last day
              </div>
            </CardFooter>
          </Card>
        </Col>
        <Col lg="3" md="6" sm="6">
          <Card className="card-stats">
            <CardBody>
              <Row>
                <Col md="4" xs="5">
                  <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-badge text-danger" />
                  </div>
                </Col>
                <Col md="8" xs="7">
                  <div className="numbers">
                    <p className="card-category">Leaders</p>
                    <CardTitle tag="p">23</CardTitle>
                    <p />
                  </div>
                </Col>
              </Row>
            </CardBody>
            <CardFooter>
              <hr />
              <div className="stats">
                <i className="far fa-clock" /> In the last hour
              </div>
            </CardFooter>
          </Card>
        </Col>
        <Col lg="3" md="6" sm="6">
          <Card className="card-stats">
            <CardBody>
              <Row>
                <Col md="4" xs="5">
                  <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-favourite-28 text-primary" />
                  </div>
                </Col>
                <Col md="8" xs="7">
                  <div className="numbers">
                    <p className="card-category">New Joining</p>
                    <CardTitle tag="p">10</CardTitle>
                    <p />
                  </div>
                </Col>
              </Row>
            </CardBody>
            <CardFooter>
              <hr />
              <div className="stats">
                <i className="fas fa-sync-alt" /> Update now
              </div>
            </CardFooter>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h6">Employee Performance</CardTitle>
              <p className="card-category">24 Hours performance</p>
            </CardHeader>
            <CardBody>
              <Line
                data={dashboard24HoursPerformanceChart.data}
                options={dashboard24HoursPerformanceChart.options}
                width={400}
                height={100}
              />
            </CardBody>
            <CardFooter>
              <hr />
              <div className="stats">
                <i className="fa fa-history" /> Updated 3 minutes ago
              </div>
            </CardFooter>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md="4">
          <Card>
            <CardHeader>
              <CardTitle tag="h6">Email Statistics</CardTitle>
              <p className="card-category">Last Campaign Performance</p>
            </CardHeader>
            <CardBody>
              <Pie
                data={dashboardEmailStatisticsChart.data}
                options={dashboardEmailStatisticsChart.options}
              />
            </CardBody>
            <CardFooter>
              <div className="legend">
                <i className="fa fa-circle text-primary" /> Opened{" "}
                <i className="fa fa-circle text-warning" /> Read{" "}
                <i className="fa fa-circle text-danger" /> Deleted{" "}
                <i className="fa fa-circle text-gray" /> Unopened
              </div>
              <hr />
              <div className="stats">
                <i className="fa fa-calendar" /> Number of emails sent
              </div>
            </CardFooter>
          </Card>
        </Col>
        <Col md="8">
          <Card className="card-chart">
            <CardHeader>
              <CardTitle tag="h6">NASDAQ: AAPL</CardTitle>
              <p className="card-category">Line Chart with Points</p>
            </CardHeader>
            <CardBody>
              <Line
                data={dashboardNASDAQChart.data}
                options={dashboardNASDAQChart.options}
                width={400}
                height={100}
              />
            </CardBody>
            <CardFooter>
              <div className="chart-legend">
                <i className="fa fa-circle text-info" /> Tesla Model S{" "}
                <i className="fa fa-circle text-warning" /> BMW 5 Series
              </div>
              <hr />
              <div className="card-stats">
                <i className="fa fa-check" /> Data information certified
              </div>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </div>
  </>
  );
};

export default Index;
