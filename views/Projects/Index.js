import React, { useState, useEffect } from "react";
import { Button, Row, Col } from "reactstrap";
import axios from "../../axios/Axios";
import { Card, CardBody, Table } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import ReactPaginate from "react-paginate";
import CryptoJS from "crypto-js";
import { FormGroup, Input, Label, CustomInput } from "reactstrap";
const Index = () => {
  const [projectList, setProjectList] = useState([]);
  const [pagination, setPagination] = useState({ totalPages: 0 });
  const [popup, setPopup] = useState({
    show: false, // initial values set to false and null
    id: null,
    projectName: null,
  });
  const [searchParams, setSearchParams] = useState({
    projectName: "",
    technologyId: "",
    projectManager: "",
    year: "",
  });
  const History = useHistory();
  const fetchData = async (pageNo) => {
    const res = await axios.get(`/project?page=${pageNo || 1}&limit=10`);
    if (res.status) {
      const { totalPages, limit, totalRecords, currentPage } = res.data;
      setProjectList(res.data.list);
      setPagination({ totalPages, limit, totalRecords, currentPage });
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handlePageClick = (arg) => {
    fetchData(arg.selected + 1);
  };

  const handleRoute = (obj) => {
    let encodedId = CryptoJS.AES.encrypt(
      JSON.stringify(obj.id),
      "Yeah"
    ).toString();

    let finalId = encodedId.replace("/", "xMl3Jk").replace("/", "xMl3Jk");

    History.push({
      pathname: `projects/edit/${finalId}`,
      state: {
        ...obj,
      },
    });
  };

  const handleDeleteTrue = async () => {
    const res = await axios.delete(`/project/${popup.id}`);
    if (res.status) {
      setProjectList((curr) =>
        curr.filter((project) => project.id !== popup.id)
      );
      handleDeleteFalse();
    }
  };

  const handleDelete = (id, projectName) => {
    setPopup({
      show: true,
      id,
      projectName,
    });
  };
  const handleDeleteFalse = () => {
    setPopup({
      show: false,
      id: null,
      projectName: null,
    });
  };

  const handleSearchParams = (e) => {
    let { id, value } = e.target;
    setSearchParams((curr) => ({
      ...curr,
      [id]: value,
    }));
  };
  const search = async () => {
    let params = {};
    for (let key in searchParams) {
      if (searchParams[key]) {
        params[key] = searchParams[key];
      }
    }
    const res = await axios.get(`/project`, { params });
    if (res.status) {
      setSearchParams({
        projectName: "",
        technologyId: "",
        projectManager: "",
        year: "",
      });
      setProjectList(res.data);
    } else {
      setProjectList([]);
    }
  };
  return (
    <div className="content">
      <Modal isOpen={popup.show} toggle={handleDeleteFalse} centered={true}>
        <ModalBody>
          Are you sure you want to delete the record of
          {` ${popup.projectName}`}?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleDeleteTrue}>
            Yes
          </Button>
          <Button color="secondary" onClick={handleDeleteFalse}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <Row className="mb-3">
        <Col md="4"></Col>
        <Col md="8" className="text-right d-flex justify-content-end">
          <Link to="/admin/projects/add">
            <Button>Add Project</Button>
          </Link>
        </Col>
      </Row>

      <div className="row">
        <div className="col-12">
          <Card className="pt-3">
            <div className="col-12">
              <div className="form-row">
                <FormGroup className="col-md-6">
                  <Label for="fromDate">Project name</Label>
                  <Input
                    type="text"
                    id="projectName"
                    maxlength="25"
                    value={searchParams.projectName}
                    onChange={handleSearchParams}
                  />
                </FormGroup>
                <FormGroup className="col-md-6">
                  <Label for="technologyId">Technology Name</Label>
                  <CustomInput
                    type="select"
                    id="technologyId"
                    name="technologyId"
                    onChange={handleSearchParams}
                    value={searchParams.technologyId}
                  >
                    <option value="">Select technology</option>
                    <option value="1">PHP</option>
                    <option value="2">iOS</option>
                    <option value="3">Zend</option>
                    <option value="4">ASP.NET</option>
                    <option value="5">UI/UX</option>
                    <option value="6">SEO</option>
                    <option value="7">Python</option>
                  </CustomInput>
                </FormGroup>
                <FormGroup className="col-md-6">
                  <Label for="projectManager">Project manager</Label>
                  <Input
                    type="text"
                    id="projectManager"
                    maxlength="35"
                    value={searchParams.projectManager}
                    onChange={handleSearchParams}
                  />
                </FormGroup>
                <FormGroup className="col-md-6">
                  <Label for="year">Year</Label>
                  <Input
                    type="text"
                    id="year"
                    maxlength="30"
                    value={searchParams.year}
                    onChange={handleSearchParams}
                  />
                </FormGroup>
                <FormGroup className="col-md-12 text-right">
                  <Button className="btn-alt" onClick={search}>
                    <i className="nc-icon nc-zoom-split mr-2" />
                    Search
                  </Button>
                </FormGroup>
              </div>
            </div>
            <CardBody>
              {projectList.length > 0 ? (
                <>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Project Name</th>
                        <th>Technology Name</th>
                        <th>Project Manager</th>
                        <th>Year</th>

                        <th className="text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projectList.length > 0 &&
                        projectList.map((project, ProjectIdx) => (
                          <tr key={ProjectIdx}>
                            <td>{project.projectName}</td>
                            <td>{project.technology.title}</td>
                            <td>{project.projectManager}</td>
                            <td>{project.year}</td>

                            <td className="text-right">
                              <div className="action-btn">
                                <img
                                  src={require(`../../assets/img/edit.png`)}
                                  alt="edit-icon"
                                  className="edit-icon"
                                  onClick={() => handleRoute(project)}
                                />
                                <img
                                  src={require(`../../assets/img/trash.png`)}
                                  alt="trash-icon"
                                  className="trash-icon"
                                  onClick={() =>
                                    handleDelete(
                                      project.id,
                                      project.projectName
                                    )
                                  }
                                />
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                  <Col md="12">
                    <div className="row justify-content-center">
                      <ReactPaginate
                        previousLabel={"<"}
                        nextLabel={">"}
                        breakLabel={"..."}
                        pageCount={pagination.totalPages}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={3}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination"}
                        activeClassName={"active"}
                        breakClassName={"page-item"}
                        breakLinkClassName={"page-link"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link"}
                        previousClassName={"page-item"}
                        previousLinkClassName={"page-link"}
                        nextClassName={"page-item"}
                        nextLinkClassName={"page-link"}
                      />
                    </div>
                  </Col>
                </>
              ) : (
                <Col xs="12">
                  <h6 className="text-center">No records Found</h6>
                </Col>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
