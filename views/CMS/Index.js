import React, { useState, useEffect } from "react";
import axios from "../../axios/Axios";
import { Button, Row, Col } from "reactstrap";
import { Card, CardBody, Table } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import { FormGroup, Input, Label, CustomInput } from "reactstrap";
import ReactPaginate from "react-paginate";
import CryptoJS from "crypto-js";

const Index = () => {
  const [searchParams, setSearchParams] = useState({
    title: "",
    accessKey: "",
    metaKeyword: "",
    status: "",
  });
  const [cmsList, setCmsList] = useState([]);
  const [pagination, setPagination] = useState({ totalPages: 0 });
  const [popup, setPopup] = useState({
    show: false, // initial values set to false and null
    id: null,
    title: null,
  });

  const History = useHistory();
  const fetchData = async (pageNo) => {
    const res = await axios.get(`/page?page=${pageNo || 1}&limit=10`);
    if (res.status) {
      const { totalPages, limit, totalRecords, currentPage } = res.data;
      setCmsList(res.data.list);
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

    let finalId = encodedId.replace("/", "xMl3Jk");

    History.push({
      pathname: `page/edit/${finalId}`,
      state: {
        ...obj,
      },
    });
  };

  const handleDeleteTrue = async () => {
    const res = await axios.delete(`/page/${popup.id}`);
    if (res.status) {
      setCmsList((curr) => curr.filter((cms) => cms.id !== popup.id));
      handleDeleteFalse();
    }
  };

  const handleDelete = (id, title) => {
    setPopup({
      show: true,
      id,
      title,
    });
  };
  const handleDeleteFalse = () => {
    setPopup({
      show: false,
      id: null,
      title: null,
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
    const res = await axios.get(`/page`, { params });
    if (res.status) {
      setCmsList(res.data);
    } else {
      setCmsList([]);
    }
  };

  const close = (params) => {
    let searchParameter = { ...searchParams };
    searchParameter[params] = "";
    setSearchParams(searchParameter);
  };
  return (
    <div className="content">
      <Modal isOpen={popup.show} toggle={handleDeleteFalse} centered={true}>
        <ModalBody>
          Are you sure you want to delete the record of
          {` ${popup.title}`}?
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
          <Link to="/admin/page/add">
            <Button>Add page</Button>
          </Link>
        </Col>
      </Row>

      <div className="row">
        <div className="col-12">
          <Card className="pt-3">
            <div className="col-12">
              <div className="form-row">
                <FormGroup className="col-md-6">
                  <Label for="title">Title</Label>
                  <Input
                    type="text"
                    id="title"
                    value={searchParams.title}
                    onChange={handleSearchParams}
                    maxlength="50"
                  />
                </FormGroup>
                <FormGroup className="col-md-6">
                  <Label for="accessKey">Access key</Label>
                  <Input
                    type="text"
                    id="accessKey"
                    value={searchParams.accessKey}
                    onChange={handleSearchParams}
                    maxlength="50"
                  />
                </FormGroup>
                <FormGroup className="col-md-6">
                  <Label for="metaKeyword">Meta keyword</Label>
                  <Input
                    type="text"
                    id="metaKeyword"
                    value={searchParams.metaKeyword}
                    onChange={handleSearchParams}
                    maxlength="50"
                  />
                </FormGroup>
                <FormGroup className="col-md-6">
                  <Label for="status">Status</Label>
                  <CustomInput
                    type="select"
                    id="status"
                    name="status"
                    value={searchParams.status}
                    onChange={handleSearchParams}
                    className="filter-drop"
                  >
                    <option value="">select status</option>
                    <option value="disable">disable</option>
                    <option value="enable">enable</option>
                  </CustomInput>
                  <button
                    type="button"
                    className="close filter-clear"
                    onClick={() => close("status")}
                  >
                    <span>×</span>
                  </button>
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
              {cmsList.length > 0 ? (
                <>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Title</th>
                        <th>Access key</th>
                        <th>Meta keyword</th>
                        <th>Status</th>
                        <th className="text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cmsList.length > 0 &&
                        cmsList.map((cms, cmsIdx) => (
                          <tr key={cmsIdx}>
                            <td>{cms.title}</td>
                            <td>{cms.accessKey}</td>
                            <td>{cms.metaKeyword}</td>
                            <td>{cms.status}</td>

                            <td className="text-right">
                              <div className="action-btn">
                                <img
                                  src={require(`../../assets/img/edit.png`)}
                                  alt="edit-icon"
                                  className="edit-icon"
                                  onClick={() => handleRoute(cms)}
                                />
                                <img
                                  src={require(`../../assets/img/trash.png`)}
                                  alt="trash-icon"
                                  className="trash-icon"
                                  onClick={() =>
                                    handleDelete(cms.id, cms.title)
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
