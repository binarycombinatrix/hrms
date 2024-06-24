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
const BloodGroup = () => {
  const [bloodGroop, setBloodGroup] = useState({
    title: "",
    isActive: false,
  });
  const [error, setError] = useState(initialState);
  const [BloodGroupData, setBloodGroupData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [modal, setModal] = useState(false);
  const [id, setId] = useState("");
  const toggle = () => setModal(!modal);

  useEffect(() => {
    const fetchData = async () => {
      const { success, data } = await axios.get("/bloodGroup");
      if (success === true) {
        setBloodGroupData(data);
      }
    };
    fetchData();
  }, []);
  const handlePrompt = (id) => {
    setId(id);
    toggle();
  };
  const handleBloodGroup = (e) => {
    e.preventDefault();
    !isUpdate ? handleInsert() : updateMetohd();
  };

  const handleDelete = async () => {
    setIsUpdate(false);
    setBloodGroup({
      title: "",
      isActive: false,
    });
    setError(initialState);
    const { success } = await axios.delete(`/bloodGroup/${id}`);
    if (success) {
      toggle();
      setBloodGroupData((curr) =>
        curr.filter((technology) => technology.id !== id)
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

    if (!/^(A|B|AB|O)[+-]$/i.test(bloodGroop.title)) {
      handleErrorChange({
        title: {
          inValid: true,
          errorMsg: "Enter blood group in proper format",
        },
      });
      flag = false;
    } else if (bloodGroop.title === "") {
      handleErrorChange({
        title: {
          inValid: true,
          errorMsg: "Enter blood group",
        },
      });
      flag = false;
    }
    return !flag;
  };
  const handleInsert = async () => {
    let isValid = validate();
    if (!isValid) {
      const { success, data } = await axios.post("/bloodGroup", bloodGroop);
      if (success === true) {
        setBloodGroupData((curr) => [...curr, { ...data }]);
        setBloodGroup({
          title: "",
          isActive: false,
        });
      }
    }
  };

  const updateMetohd = async () => {
    let { id, title, isActive } = bloodGroop;
    const { success, message } = await axios.put(`/bloodGroup/${id}`, {
      title,
      isActive,
    });
    if (success) {
      toast.success(message);
      setBloodGroupData((curr) => {
        const temp = curr.map((bloodGroopItem) => {
          if (bloodGroopItem.id === id) {
            return bloodGroop;
          } else {
            return bloodGroopItem;
          }
        });
        return temp;
      });
      setBloodGroup({
        title: "",
        isActive: false,
      });
      setIsUpdate(false);
    }
  };

  const handleIsActive = async (e, obj) => {
    let { id, isActive, title } = obj;
    let tempBloodGroup = { ...obj, isActive: e.target.checked };

    const { success } = await axios.put(`/bloodGroup/${id}`, {
      isActive: !isActive,
      title,
    });
    if (success) {
      setBloodGroupData((curr) => {
        const temp = curr.map((bloodGroopItem) => {
          if (bloodGroopItem.id === id) {
            return tempBloodGroup;
          } else {
            return bloodGroopItem;
          }
        });
        return temp;
      });
    }
  };

  const handleUpdate = (obj) => {
    setIsUpdate(true);
    setBloodGroup(obj);
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
          <CardTitle tag="h6">Blood Group Master</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col xs="12">
              <form onSubmit={handleBloodGroup}>
                <Row className="align-items-top mb-3">
                  <Col xs="5">
                    <Label for="bloodgroup">
                      Enter Blood Group<span className="mandatory">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="bloodgroup"
                      value={bloodGroop.title}
                      onChange={(e) =>
                        setBloodGroup({
                          ...bloodGroop,
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
                          value={bloodGroop.isActive}
                          checked={bloodGroop.isActive}
                          onChange={(e) =>
                            setBloodGroup({
                              ...bloodGroop,
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
              {BloodGroupData.length > 0 ? (
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Title</th>
                      <th className="status">Status</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {BloodGroupData.map((BloodGroup, bloodGroupIdx) => (
                      <tr key={bloodGroupIdx}>
                        <td>{BloodGroup.title}</td>
                        <td className="text-center">
                          <div class="custom-control custom-switch">
                            <CustomInput
                              type="switch"
                              id={`BloodGroup${bloodGroupIdx}`}
                              checked={BloodGroup.isActive}
                              onClick={(e) => handleIsActive(e, BloodGroup)}
                            />
                          </div>
                        </td>
                        <td className="text-right">
                        <div className="action-btn">
                            <img src={require(`../../../assets/img/edit.png`)} alt="edit-icon" className="edit-icon"  onClick={() => handleUpdate(BloodGroup)} />
                            <img src={require(`../../../assets/img/trash.png`)} alt="trash-icon" className="trash-icon"   onClick={() => handlePrompt(BloodGroup.id)}/>
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
export default BloodGroup;
