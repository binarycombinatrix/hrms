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
  const [technologyContent, setTechnolofyContent] = useState([]);
  const [pagination, setPagination] = useState({ totalPages: 0 });
  const [popup, setPopup] = useState({
    show: false, // initial values set to false and null
    id: null,
    technology: null,
  });
  const [searchParams, setSearchParams] = useState({
    technologyId: "",
    content: "",
  });
  const History = useHistory();
  const fetchData = async (pageNo) => {
    const res = await axios.get(
      `/technologyContent?page=${pageNo || 1}&limit=10`
    );
    if (res.status) {
      const { totalPages, limit, totalRecords, currentPage } = res.data;
      setTechnolofyContent(res.data.list);
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
      pathname: `content/edit/${finalId}`,
      state: {
        ...obj,
      },
    });
  };

  const handleDeleteTrue = async () => {
    const res = await axios.delete(`/technologyContent/${popup.id}`);
    if (res.status) {
      setTechnolofyContent((curr) =>
        curr.filter(
          (technologyContentItem) => technologyContentItem.id !== popup.id
        )
      );
      handleDeleteFalse();
    }
  };

  const handleDelete = (id, technology) => {
    setPopup({
      show: true,
      id,
      technology,
    });
  };
  const handleDeleteFalse = () => {
    setPopup({
      show: false,
      id: null,
      technology: null,
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
    const res = await axios.get(`/technologyContent`, { params });
    if (res.status) {
      setTechnolofyContent(res.data);
    } else {
      setTechnolofyContent([]);
    }
  };
  return (
    <div className="content">
      <Modal isOpen={popup.show} toggle={handleDeleteFalse} centered={true}>
        <ModalBody>
          Are you sure you want to delete the record of
          {` ${popup.technology}`}?
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
          <Link to="/admin/content/add">
            <Button>Add document template</Button>
          </Link>
        </Col>
      </Row>

      <div className="row">
        <div className="col-12">
          <Card className="pt-3">
            <div className="col-12">
              <div className="form-row">
                <FormGroup className="col-md-4">
                  <Label for="technologyId">Technology Name</Label>
                  <CustomInput
                    type="select"
                    id="technologyId"
                    name="technologyId"
                    onChange={handleSearchParams}
                    value={searchParams.technologyId}
                  >
                    <option value="">select technology</option>
                    <option value="1">PHP</option>
                    <option value="2">iOS</option>
                    <option value="3">Zend</option>
                    <option value="4">ASP.NET</option>
                    <option value="5">UI/UX</option>
                    <option value="6">SEO</option>
                    <option value="7">Python</option>
                  </CustomInput>
                </FormGroup>
                <FormGroup className="col-md-8">
                  <Label for="projectManager">Content</Label>
                  <Input
                    type="text"
                    id="content"
                    value={searchParams.content}
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
              {technologyContent.length > 0 ? (
                <>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th width="18%">Technology Name</th>
                        <th width="70%">Content</th>
                        <th className="text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {technologyContent.length > 0 &&
                        technologyContent.map((techContent, techContentIdx) => (
                          <tr key={techContentIdx}>
                            <td>{techContent.technology.title}</td>
                            <td>{techContent.content}</td>
                            <td className="text-right">
                              <div className="action-btn">
                                <img
                                  src={require(`../../assets/img/edit.png`)}
                                  alt="edit-icon"
                                  className="edit-icon"
                                  onClick={() => handleRoute(techContent)}
                                />
                                <img
                                  src={require(`../../assets/img/trash.png`)}
                                  alt="trash-icon"
                                  className="trash-icon"
                                  onClick={() =>
                                    handleDelete(
                                      techContent.id,
                                      techContent.technology.title
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
