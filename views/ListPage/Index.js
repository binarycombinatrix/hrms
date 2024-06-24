import React, { useState, useEffect } from "react";
import { Card, CardBody, Table, Col, Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import ReactPaginate from "react-paginate";
import axios from "../../axios/Axios";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import CryptoJS from "crypto-js";

const Index = () => {
  const [candidateList, setCandidateList] = useState([]);
  const [pagination, setPagination] = useState({ totalPages: 0 });
  const [popup, setPopup] = useState({
    show: false, // initial values set to false and null
    id: null,
    firstName: null,
    lastName: null,
  });
  const History = useHistory();
  const fetchData = async (pageNo) => {
    const res = await axios.get(`/candidate?page=${pageNo || 1}&limit=10`);
    if (res.status) {
      const { totalPages, limit, totalRecords, currentPage } = res.data;
      setCandidateList(res.data.list);
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
      "Yeah*/"
    ).toString();
    let finalId = encodedId.replace("/", "xMl3Jk");
    History.push({
      pathname: `candidate/update/${finalId}`,
      state: {
        ...obj,
      },
    });
  };

  const handleDeleteTrue = async () => {
    const res = await axios.delete(`/candidate/${popup.id}`);
    if (res.status) {
      setCandidateList((curr) =>
        curr.filter((company) => company.id !== popup.id)
      );
      handleDeleteFalse();
    }
  };

  const handleDelete = (id, firstName, lastName) => {
    setPopup({
      show: true,
      id,
      firstName,
      lastName,
    });
  };
  const handleDeleteFalse = () => {
    setPopup({
      show: false,
      id: null,
      firstName: null,
      lastName: null,
    });
  };
  return (
    <div className="content">
      <Modal isOpen={popup.show} toggle={handleDeleteFalse} centered={true}>
        <ModalBody>
          Are you sure you want to delete the record of{" "}
          {`${popup.firstName} ${popup.lastName}`}?
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
      <div className="col-12">
        <Card>
          {/* <CardHeader>
            <CardTitle tag="h6">Candidate List</CardTitle>
          </CardHeader> */}
          <CardBody>
            {candidateList.length > 0 ? (
              <>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Phone Number</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {candidateList.length > 0 &&
                      candidateList.map((candidate, cmpIdx) => (
                        <tr key={cmpIdx}>
                          <td>{candidate.firstName}</td>

                          <td>{candidate.lastName}</td>

                          <td>{candidate.email}</td>
                          <td>{candidate.contactNumber}</td>

                          <td className="text-right">
                            <i
                              className="far fa-edit mr-3"
                              onClick={() => handleRoute(candidate)}
                            ></i>
                            <i
                              className="far fa-trash-alt"
                              onClick={() =>
                                handleDelete(
                                  candidate.id,
                                  candidate.firstName,
                                  candidate.lastName
                                )
                              }
                            ></i>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
                <Col md="12 m-2">
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
  );
};

export default Index;
