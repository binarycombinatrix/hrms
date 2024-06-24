import React, { useState, useEffect } from "react";
import axios from "../../../axios/Axios";

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
const JobChangeReason = () => {
  const [jobChangeReason, setJobChangeReason] = useState({
    title: "",
    isActive: false,
  });
  const [jobChangeReasonData, setJobChangeReasonData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [error, setError] = useState(initialState);

  const [modal, setModal] = useState(false);
  const [id, setId] = useState("");
  const toggle = () => setModal(!modal);
  useEffect(() => {
    const fetchData = async () => {
      const { success, data } = await axios.get("/jobChange");
      if (success === true) {
        setJobChangeReasonData(data);
      }
    };
    fetchData();
  }, []);
  const handleJobChangeReason = (e) => {
    e.preventDefault();
    !isUpdate ? handleInsert() : updateMetohd();
  };
  const handlePrompt = (id) => {
    setId(id);
    toggle();
  };
  const handleDelete = async () => {
    setIsUpdate(false);
    setJobChangeReason({
      title: "",
      isActive: false,
    });
    setError(initialState);
    const { success } = await axios.delete(`/jobChange/${id}`);
    if (success) {
      toggle();
      setJobChangeReasonData((curr) =>
        curr.filter((jobChange) => jobChange.id !== id)
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
    if (jobChangeReason.title === "") {
      handleErrorChange({
        title: {
          inValid: true,
          errorMsg: "Enter job change reason",
        },
      });
      flag = false;
    }
    return !flag;
  };
  const handleInsert = async () => {
    let isValid = validate();
    if (!isValid) {
      const { success, data } = await axios.post("/jobChange", jobChangeReason);
      if (success === true) {
        setJobChangeReasonData((curr) => [...curr, data]);
        setJobChangeReason({
          title: "",
          isActive: false,
        });
      }
    }
  };

  const updateMetohd = async () => {
    let { id, title, isActive } = jobChangeReason;
    const { success, message } = await axios.put(`/jobChange/${id}`, {
      title,
      isActive,
    });
    if (success) {
      toast.success(message);
      setJobChangeReasonData((curr) => {
        const temp = curr.map((courseItem) => {
          if (courseItem.id === id) {
            return jobChangeReason;
          } else {
            return courseItem;
          }
        });
        return temp;
      });
      setJobChangeReason({
        title: "",
        isActive: false,
      });
      setIsUpdate(false);
    }
  };
  const handleIsActive = async (e, obj) => {
    let { id, isActive, title } = obj;
    let tempJobChangeReasonItem = { ...obj, isActive: e.target.checked };

    const { success } = await axios.put(`/jobChange/${id}`, {
      isActive: !isActive,
      title,
    });
    if (success) {
      setJobChangeReasonData((curr) => {
        const temp = curr.map((jobChangeReasonItem) => {
          if (jobChangeReasonItem.id === id) {
            return tempJobChangeReasonItem;
          } else {
            return jobChangeReasonItem;
          }
        });
        return temp;
      });
    }
  };
  const handleUpdate = (obj) => {
    setIsUpdate(true);
    setJobChangeReason(obj);
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
          <CardTitle tag="h6">Job Change Reason Master</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col xs="12">
              <form onSubmit={handleJobChangeReason}>
                <Row className="align-items-center mb-3">
                  <Col xs="5">
                    <label>
                      Enter Job Change Reason
                      <span className="mandatory">*</span>
                    </label>
                    <Input
                      type="text"
                      value={jobChangeReason.title}
                      onChange={(e) =>
                        setJobChangeReason({
                          ...jobChangeReason,
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
                          value={jobChangeReason.isActive}
                          checked={jobChangeReason.isActive}
                          onChange={(e) =>
                            setJobChangeReason({
                              ...jobChangeReason,
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
              {jobChangeReasonData.length > 0 ? (
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Title</th>
                      <th className="status">Status</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobChangeReasonData.map((jobChangeReason, index) => (
                      <tr key={index}>
                        <td>{jobChangeReason.title}</td>
                        <td className="text-center">
                          <div class="custom-control custom-switch">
                            <CustomInput
                              type="switch"
                              id={`jobChangeReason${index}`}
                              checked={jobChangeReason.isActive}
                              onClick={(e) =>
                                handleIsActive(e, jobChangeReason)
                              }
                            />
                          </div>
                        </td>
                        <td className="text-right">
                          <div className="action-btn">
                            <img src={require(`../../../assets/img/edit.png`)} alt="edit-icon" className="edit-icon" onClick={() => handleUpdate(jobChangeReason)} />
                            <img src={require(`../../../assets/img/trash.png`)} alt="trash-icon" className="trash-icon" onClick={() => handlePrompt(jobChangeReason.id)} />
                          </div>
                        </td>
                      </tr>
                    ))}
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
export default JobChangeReason;
