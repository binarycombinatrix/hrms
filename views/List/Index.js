import React, { useState, useEffect } from "react";
import { Button, Row, Col } from "reactstrap";
import axios from "../../axios/Axios";
import { Card, CardBody, Table } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import { FormGroup, Input, Label } from "reactstrap";
import ReactPaginate from "react-paginate";
import CryptoJS from "crypto-js";
import moment from "moment";
const Index = () => {
  const [searchParams, setSearchParams] = useState({
    documentName: "",
    code: "",
    createdDateFrom: "",
    createdDateTo: "",
    updatedDateFrom: "",
    updatedDateTo: "",
  });
  const [documentList, setDocumentList] = useState([]);
  const [pagination, setPagination] = useState({ totalPages: 0 });
  const [popup, setPopup] = useState({
    show: false, // initial values set to false and null
    id: null,
    ducumentName: null,
  });

  const History = useHistory();
  const fetchData = async (pageNo) => {
    const res = await axios.get(`/document?page=${pageNo || 1}&limit=10`);
    if (res.status) {
      const { totalPages, limit, totalRecords, currentPage } = res.data;
      setDocumentList(res.data.list);
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
      pathname: `list/edit/${finalId}`,
      state: {
        ...obj,
      },
    });
  };

  const handleDeleteTrue = async () => {
    const res = await axios.delete(`/document/${popup.id}`);
    if (res.status) {
      setDocumentList((curr) =>
        curr.filter((document) => document.id !== popup.id)
      );
      handleDeleteFalse();
    }
  };

  const handleDelete = (id, ducumentName) => {
    setPopup({
      show: true,
      id,
      ducumentName,
    });
  };
  const handleDeleteFalse = () => {
    setPopup({
      show: false,
      id: null,
      ducumentName: null,
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
    const res = await axios.get(`/document`, { params });
    if (res.status) {
      setDocumentList(res.data);
    } else {
      setDocumentList([]);
    }
  };
  return (
    <div className="content">
      <Modal isOpen={popup.show} toggle={handleDeleteFalse} centered={true}>
        <ModalBody>
          Are you sure you want to delete the record of
          {` ${popup.ducumentName}`}?
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
          <Link to="/admin/list/add">
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
          <Label for="documentName">Document name</Label>
          <Input
            type="text"
            id="documentName"
            value={searchParams.documentName}
            onChange={handleSearchParams}
            maxlength="25"
          />
        </FormGroup>
        <FormGroup className="col-md-4">
          <Label for="code">Code</Label>
          <Input
            type="text"
            id="code"
            value={searchParams.code}
            onChange={handleSearchParams}
            maxlength="30"
          />
        </FormGroup>
        <FormGroup className="col-md-4">
          <Label for="createdDateFrom">Created date from</Label>
          <Input
            type="date"
            id="createdDateFrom"
            value={searchParams.createdDateFrom}
            onChange={handleSearchParams}
            onKeyDown={(e) => e.preventDefault()}
          />
        </FormGroup>
      
        <FormGroup className="col-md-4">
          <Label for="createdDateTo">Created date to</Label>
          <Input
            type="date"
            id="createdDateTo"
            value={searchParams.createdDateTo}
            onChange={handleSearchParams}
            onKeyDown={(e) => e.preventDefault()}
          />
        </FormGroup>
        <FormGroup className="col-md-4">
          <Label for="updatedDateFrom">Updated date from</Label>
          <Input
            type="date"
            id="updatedDateFrom"
            value={searchParams.updatedDateFrom}
            onChange={handleSearchParams}
            onKeyDown={(e) => e.preventDefault()}
          />
        </FormGroup>
        <FormGroup className="col-md-4">
          <Label for="updatedDateTo">Updated date to</Label>
          <Input
            type="date"
            id="updatedDateTo"
            value={searchParams.updatedDateTo}
            onChange={handleSearchParams}
            onKeyDown={(e) => e.preventDefault()}
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
              {documentList.length > 0 ? (
                <>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Document Name</th>
                        <th>Code</th>
                        <th>Created Date</th>
                        <th>Updated Date</th>

                        <th className="text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {documentList.length > 0 &&
                        documentList.map((document, documentIdx) => (
                          <tr key={documentIdx}>
                            <td>{document.documentName}</td>
                            <td>{document.code}</td>
                            <td>
                              {moment(document.createdDate).format(
                                "DD/MM/YYYY"
                              )}
                            </td>
                            <td>
                              {moment(document.updatedDate).format(
                                "DD/MM/YYYY"
                              )}
                            </td>

                            <td className="text-right">
                            <div className="action-btn">
                            <img src={require(`../../assets/img/edit.png`)} alt="edit-icon" className="edit-icon"   onClick={() => handleRoute(document)}  />
                            <img src={require(`../../assets/img/trash.png`)} alt="trash-icon" className="trash-icon"  onClick={() =>
                                  handleDelete(
                                    document.id,
                                    document.projectName
                                  )
                                }  />
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
