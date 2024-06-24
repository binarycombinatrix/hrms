import axios from "../../../axios/Axios";
import React, { useState, useEffect } from "react";

import {
  FormGroup,
  Row,
  Col,
  Input,
  Label,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Table,
  FormFeedback,
  CustomInput,
} from "reactstrap";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import { toast } from "react-toastify";
const initialState = {
  title: {
    inValid: false,
    errorMsg: "",
  },
};
const InterviewStatus = () => {
  const [interviewStatus, setInterviewStatus] = useState({
    title: "",
    isActive: false,
  });
  const [error, setError] = useState(initialState);
  const [interviewStatusData, setInterviewStatusData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [modal, setModal] = useState(false);
  const [id, setId] = useState("");
  const toggle = () => setModal(!modal);

  useEffect(() => {
    const fetchData = async () => {
      const { success, data } = await axios.get("/interviewStatus");
      if (success === true) {
        setInterviewStatusData(data);
      }
    };
    fetchData();
  }, []);
  const handlePrompt = (id) => {
    setId(id);
    toggle();
  };
  const handleInterviewStatus = (e) => {
    e.preventDefault();
    !isUpdate ? handleInsert() : updateMetohd();
  };

  const handleDelete = async () => {
    setIsUpdate(false);
    setInterviewStatus({
      title: "",
      isActive: false,
    });
    setError(initialState);
    const { success } = await axios.delete(`/interviewStatus/${id}`);
    if (success) {
      toggle();
      setInterviewStatusData((curr) =>
        curr.filter((interviewStatus) => interviewStatus.id !== id)
      );
      setId("");
    }
  };
  const handleErrorChange = (obj) => {
    setError((curr) => ({
      ...curr,
      ...obj,
    }));
  };
  const validate = () => {
    let flag = true;
    setError(initialState);

    if (interviewStatus.title === "") {
      handleErrorChange({
        title: {
          inValid: true,
          errorMsg: "Enter interview status",
        },
      });
      flag = false;
    }
    return !flag;
  };
  const handleInsert = async () => {
    let isValid = validate();
    if (!isValid) {
      const { success, data } = await axios.post(
        "/interviewStatus",
        interviewStatus
      );
      if (success === true) {
        setInterviewStatusData((curr) => [...curr, { ...data }]);
        setInterviewStatus({
          title: "",
          isActive: false,
        });
      }
    }
  };

  const updateMetohd = async () => {
    let { id, title, isActive } = interviewStatus;
    const { success, message } = await axios.put(`/interviewStatus/${id}`, {
      title,
      isActive,
    });
    if (success) {
      toast.success(message);
      setInterviewStatusData((curr) => {
        const temp = curr.map((interviewStatusItem) => {
          if (interviewStatusItem.id === id) {
            return interviewStatus;
          } else {
            return interviewStatusItem;
          }
        });
        return temp;
      });
      setInterviewStatus({
        title: "",
        isActive: false,
      });
      setIsUpdate(false);
    }
  };

  const handleIsActive = async (e, obj) => {
    let { id, isActive, title } = obj;
    let tempInterviewStatus = { ...obj, isActive: e.target.checked };

    const { success } = await axios.put(`/interviewStatus/${id}`, {
      isActive: !isActive,
      title,
    });
    if (success) {
      setInterviewStatusData((curr) => {
        const temp = curr.map((interviewStatusItem) => {
          if (interviewStatusItem.id === id) {
            return tempInterviewStatus;
          } else {
            return interviewStatusItem;
          }
        });
        return temp;
      });
    }
  };

  const handleUpdate = (obj) => {
    setIsUpdate(true);
    setInterviewStatus(obj);
    setError(initialState);
  };
  return (
    <>
      <Modal isOpen={modal} toggle={toggle} centered={true}>
        <ModalBody>Are you sure you want to delete?</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleDelete}>
            Yes
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <Card>
        <CardHeader>
          <CardTitle tag="h6">Interview status Master</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col xs="12">
              <form onSubmit={handleInterviewStatus}>
                <Row className="align-items-top mb-3">
                  <Col xs="5">
                    <Label for="bloodgroup">
                      Enter interview status<span className="mandatory">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="bloodgroup"
                      value={interviewStatus.title}
                      onChange={(e) =>
                        setInterviewStatus({
                          ...interviewStatus,
                          title: e.target.value,
                        })
                      }
                      invalid={error.title.inValid}
                      maxlength="64"
                    />
                    <FormFeedback>{error.title.errorMsg}</FormFeedback>
                  </Col>
                  <Col xs="3">
                    <FormGroup check className="status-check">
                      <Label check>
                        <Input
                          type="checkbox"
                          value={interviewStatus.isActive}
                          checked={interviewStatus.isActive}
                          onChange={(e) =>
                            setInterviewStatus({
                              ...interviewStatus,
                              isActive: e.target.checked,
                            })
                          }
                        />
                        Status
                        <span className="form-check-sign">
                          <span className="check"></span>
                        </span>
                      </Label>
                    </FormGroup>
                  </Col>
                  <Col xs="4" className="text-right">
                    <Button className="save-btn custom-button">
                      Save
                    </Button>
                  </Col>
                </Row>
              </form>
            </Col>
            <Col xs="12" className="master-table">
              {interviewStatusData.length > 0 ? (
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Title</th>
                      <th className="status">Status</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {interviewStatusData.map(
                      (interviewStatus, interviewStatusIdx) => (
                        <tr key={interviewStatusIdx}>
                          <td>{interviewStatus.title}</td>
                          <td className="text-center">
                            <div class="custom-control custom-switch">
                              <CustomInput
                                type="switch"
                                id={`interviewStatus${interviewStatusIdx}`}
                                checked={interviewStatus.isActive}
                                onClick={(e) =>
                                  handleIsActive(e, interviewStatus)
                                }
                              />
                            </div>
                          </td>
                          <td className="text-right">
                          <div className="action-btn">
                            <img src={require(`../../../assets/img/edit.png`)} alt="edit-icon" className="edit-icon" onClick={() => handleUpdate(interviewStatus)} />
                            <img src={require(`../../../assets/img/trash.png`)} alt="trash-icon" className="trash-icon" onClick={() => handlePrompt(interviewStatus.id)} />
                          </div>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </Table>
              ) : (
                <Col xs="12">
                  <h6 className="text-center">No records Found</h6>
                </Col>
              )}
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  );
};
export default InterviewStatus;
