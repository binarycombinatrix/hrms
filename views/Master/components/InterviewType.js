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
const InterviewType = () => {
  const [interviewType, setInterviewType] = useState({
    title: "",
    isActive: false,
  });
  const [error, setError] = useState(initialState);
  const [interviewTypeData, setInterviewTypeData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [modal, setModal] = useState(false);
  const [id, setId] = useState("");
  const toggle = () => setModal(!modal);

  useEffect(() => {
    const fetchData = async () => {
      const { success, data } = await axios.get("/interviewType");
      if (success === true) {
        setInterviewTypeData(data);
      }
    };
    fetchData();
  }, []);
  const handlePrompt = (id) => {
    setId(id);
    toggle();
  };
  const handleInterviewType = (e) => {
    e.preventDefault();
    !isUpdate ? handleInsert() : updateMetohd();
  };

  const handleDelete = async () => {
    setIsUpdate(false);
    setInterviewType({
      title: "",
      isActive: false,
    });
    setError(initialState);
    const { success } = await axios.delete(`/interviewType/${id}`);
    if (success) {
      toggle();
      setInterviewTypeData((curr) =>
        curr.filter((interviewType) => interviewType.id !== id)
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

    if (interviewType.title === "") {
      handleErrorChange({
        title: {
          inValid: true,
          errorMsg: "Enter interview type",
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
        "/interviewType",
        interviewType
      );
      if (success === true) {
        setInterviewTypeData((curr) => [...curr, { ...data }]);
        setInterviewType({
          title: "",
          isActive: false,
        });
      }
    }
  };

  const updateMetohd = async () => {
    let { id, title, isActive } = interviewType;
    const { success, message } = await axios.put(`/interviewType/${id}`, {
      title,
      isActive,
    });
    if (success) {
      toast.success(message);
      setInterviewTypeData((curr) => {
        const temp = curr.map((interviewTypeItem) => {
          if (interviewTypeItem.id === id) {
            return interviewType;
          } else {
            return interviewTypeItem;
          }
        });
        return temp;
      });
      setInterviewType({
        title: "",
        isActive: false,
      });
      setIsUpdate(false);
    }
  };

  const handleIsActive = async (e, obj) => {
    let { id, isActive, title } = obj;
    let tempInterviewType = { ...obj, isActive: e.target.checked };

    const { success } = await axios.put(`/interviewType/${id}`, {
      isActive: !isActive,
      title,
    });
    if (success) {
      setInterviewTypeData((curr) => {
        const temp = curr.map((interviewTypeItem) => {
          if (interviewTypeItem.id === id) {
            return tempInterviewType;
          } else {
            return interviewTypeItem;
          }
        });
        return temp;
      });
    }
  };

  const handleUpdate = (obj) => {
    setIsUpdate(true);
    setInterviewType(obj);
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
          <CardTitle tag="h6">Interview type Master</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col xs="12">
              <form onSubmit={handleInterviewType}>
                <Row className="align-items-top mb-3">
                  <Col xs="5">
                    <Label for="bloodgroup">
                      Enter interview type<span className="mandatory">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="bloodgroup"
                      value={interviewType.title}
                      onChange={(e) =>
                        setInterviewType({
                          ...interviewType,
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
                          value={interviewType.isActive}
                          checked={interviewType.isActive}
                          onChange={(e) =>
                            setInterviewType({
                              ...interviewType,
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
              {interviewTypeData.length > 0 ? (
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Title</th>
                      <th className="status">Status</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {interviewTypeData.map(
                      (interviewType, interviewTypeIdx) => (
                        <tr key={interviewTypeIdx}>
                          <td>{interviewType.title}</td>
                          <td className="text-center">
                            <div class="custom-control custom-switch">
                              <CustomInput
                                type="switch"
                                id={`interviewType${interviewTypeIdx}`}
                                checked={interviewType.isActive}
                                onClick={(e) =>
                                  handleIsActive(e, interviewType)
                                }
                              />
                            </div>
                          </td>
                          <td className="text-right">
                          <div className="action-btn">
                            <img src={require(`../../../assets/img/edit.png`)} alt="edit-icon" className="edit-icon"  onClick={() => handleUpdate(interviewType)} />
                            <img src={require(`../../../assets/img/trash.png`)} alt="trash-icon" className="trash-icon"  onClick={() => handlePrompt(interviewType.id)} />
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
export default InterviewType;
