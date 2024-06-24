import React, { useState, useEffect } from "react";
import { Card, CardBody, Table, Col, Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import ReactPaginate from "react-paginate";
import axios from "./../../axios/Axios";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import CryptoJS from "crypto-js";
import moment from "moment";

const Index = () => {
  const [holidayList, setHolidayList] = useState([]);
  const [pagination, setPagination] = useState({ totalPages: 0 });
  const [popup, setPopup] = useState({
    show: false, // initial values set to false and null
    id: null,
    title: null,
  });

  const History = useHistory();
  const fetchData = async (pageNo) => {
    const res = await axios.get(
      `/holiday?page=${pageNo || 1}&limit=10?sortBy=startDate&orderBy=asc`
    );
    if (res.status) {
      const { totalPages, limit, totalRecords, currentPage } = res.data;
      setHolidayList(res.data.list);
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
      pathname: `holiday-master/edit/${finalId}`,
      state: {
        ...obj,
      },
    });
  };

  const handleDeleteTrue = async () => {
    const res = await axios.delete(`/holiday/${popup.id}`);
    if (res.status) {
      setHolidayList((curr) =>
        curr.filter((holiday) => holiday.id !== popup.id)
      );
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

  const dateComparision = (date) => {
    let dataBaseDate = moment(date).format("YYYY-MM-DD");
    let todayDate = moment().format("YYYY-MM-DD");
    return moment(dataBaseDate).isAfter(todayDate);
  };

  return (
    <>
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
      </div>

      <div className="col-12 mt-3">
        <Card>
          <CardBody>
            {holidayList.length > 0 ? (
              <>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Title</th>
                      <th className="text-center">Start End</th>
                      <th className="text-center">End End</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {holidayList.length > 0 &&
                      holidayList.map((holiday, cmpIdx) => (
                        <tr key={cmpIdx}>
                          <td>{holiday.title}</td>

                          <td className="text-center">
                            {moment(holiday.startDate).format("DD-MM-YYYY")}
                          </td>

                          <td className="text-center">
                            {moment(holiday.endDate).format("DD-MM-YYYY")}
                          </td>
                          {dateComparision(holiday.startDate) ? (
                            <td className="text-right">
                              <div className="action-btn">
                            <img src={require(`../../assets/img/edit.png`)} alt="edit-icon" className="edit-icon"  onClick={() => handleRoute(holiday)} />
                            <img src={require(`../../assets/img/trash.png`)} alt="trash-icon" className="trash-icon" onClick={() =>
                                  handleDelete(holiday.id, holiday.title)
                                } />
                          </div>
                            </td>
                          ) : (
                            <td className="text-right">-</td>
                          )}
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
    </>
  );
};

export default Index;
