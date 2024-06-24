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
const Designation = () => {
  const [designation, setDesignation] = useState({
    title: "",
    isActive: false,
  });
  const [designationData, setDesignationData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [error, setError] = useState(initialState);

  const [modal, setModal] = useState(false);
  const [id, setId] = useState("");
  const toggle = () => setModal(!modal);
  useEffect(() => {
    const fetchData = async () => {
      const { success, data } = await axios.get("/designation");
      if (success === true) {
        setDesignationData(data);
      }
    };
    fetchData();
  }, []);
  const handleDesignation = (e) => {
    e.preventDefault();
    !isUpdate ? handleInsert() : updateMetohd();
  };
  const handlePrompt = (id) => {
    setId(id);
    toggle();
  };
  const handleDelete = async () => {
    setIsUpdate(false);
    setDesignation({
      title: "",
      isActive: false,
    });
    setError(initialState);
    const { success } = await axios.delete(`/designation/${id}`);
    if (success) {
      toggle();
      setDesignationData((curr) =>
        curr.filter((designation) => designation.id !== id)
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
    if (/\d/.test(designation.title)) {
      handleErrorChange({
        title: {
          inValid: true,
          errorMsg: "Designation do not contain numbers",
        },
      });
      flag = false;
    } else if (designation.title > 10) {
      handleErrorChange({
        title: {
          inValid: true,
          errorMsg: "Designation is too long",
        },
      });
      flag = false;
    } else if (designation.title === "") {
      handleErrorChange({
        title: {
          inValid: true,
          errorMsg: "Enter designation",
        },
      });
      flag = false;
    }
    return !flag;
  };
  const handleInsert = async () => {
    let isValid = validate();
    if (!isValid) {
      const { success, data } = await axios.post("/designation", designation);
      if (success === true) {
        setDesignationData((curr) => [...curr, data]);
        setDesignation({
          title: "",
          isActive: false,
        });
      }
    }
  };

  const updateMetohd = async () => {
    let { id, title, isActive } = designation;
    const { success, message } = await axios.put(`/designation/${id}`, {
      title,
      isActive,
    });
    if (success) {
      toast.success(message);
      setDesignationData((curr) => {
        const temp = curr.map((designationItem) => {
          if (designationItem.id === id) {
            return designation;
          } else {
            return designationItem;
          }
        });
        return temp;
      });
      setDesignation({
        title: "",
        isActive: false,
      });
      setIsUpdate(false);
    }
  };
  const handleIsActive = async (e, obj) => {
    let { id, isActive, title } = obj;
    let tempDesignationItem = { ...obj, isActive: e.target.checked };

    const { success } = await axios.put(`/designation/${id}`, {
      isActive: !isActive,
      title,
    });
    if (success) {
      setDesignationData((curr) => {
        const temp = curr.map((designationItem) => {
          if (designationItem.id === id) {
            return tempDesignationItem;
          } else {
            return designationItem;
          }
        });
        return temp;
      });
    }
  };

  const handleUpdate = (obj) => {
    setIsUpdate(true);
    setDesignation(obj);
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
          <CardTitle tag="h6">Designation Master</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col xs="12">
              <form onSubmit={handleDesignation}>
                <Row className="align-items-top mb-3">
                  <Col xs="5">
                    <label>
                      Enter Designation<span className="mandatory">*</span>
                    </label>
                    <Input
                      type="text"
                      value={designation.title}
                      onChange={(e) =>
                        setDesignation({
                          ...designation,
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
                          value={designation.isActive}
                          checked={designation.isActive}
                          onChange={(e) =>
                            setDesignation({
                              ...designation,
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
              {designationData.length > 0 ? (
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Title</th>
                      <th className="status">Status</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {designationData.map((designation, designationIdx) => (
                      <tr key={designationIdx}>
                        <td>{designation.title}</td>
                        <td className="text-center">
                          <div class="custom-control custom-switch">
                            <CustomInput
                              type="switch"
                              id={`designation${designationIdx}`}
                              checked={designation.isActive}
                              onClick={(e) => handleIsActive(e, designation)}
                            />
                          </div>
                        </td>
                        <td className="text-right">
                        <div className="action-btn">
                            <img src={require(`../../../assets/img/edit.png`)} alt="edit-icon" className="edit-icon"   onClick={() => handleUpdate(designation)} />
                            <img src={require(`../../../assets/img/trash.png`)} alt="trash-icon" className="trash-icon"  onClick={() => handlePrompt(designation.id)} />
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

export default Designation;
