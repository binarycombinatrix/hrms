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
  name: {
    inValid: false,
    errorMsg: "",
  },
};
const JobChangeReason = () => {
  const [activity, setActivity] = useState({
    name: "",
    isActive: false,
  });
  const [activityData, setActivityData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [error, setError] = useState(initialState);

  const [modal, setModal] = useState(false);
  const [id, setId] = useState("");
  const toggle = () => setModal(!modal);
  useEffect(() => {
    const fetchData = async () => {
      const { success, data } = await axios.get("/activityStatus");
      if (success === true) {
        setActivityData(data);
      }
    };
    fetchData();
  }, []);
  const handleErrorChange = (obj) => {
    setError((curr) => ({
      ...curr,
      ...obj,
    }));
  };
  const validate = () => {
    let flag = true;
    setError(initialState);
    if (/\d/.test(activity.name)) {
      handleErrorChange({
        name: { inValid: true, errorMsg: "Activity do not contain numbers" },
      });
      flag = false;
    } else if (activity.name > 10) {
      handleErrorChange({
        name: {
          inValid: true,
          errorMsg: "Activity is too long",
        },
      });
      flag = false;
    } else if (activity.name === "") {
      handleErrorChange({
        name: {
          inValid: true,
          errorMsg: "Enter activity",
        },
      });
      flag = false;
    }
    return !flag;
  };
  const handleActivity = (e) => {
    e.preventDefault();
    !isUpdate ? handleInsert() : updateMetohd();
  };
  const handlePrompt = (id) => {
    setId(id);
    toggle();
  };
  const handleDelete = async () => {
    setIsUpdate(false);
    setActivity({
      name: "",
      isActive: false,
    });
    setError(initialState);
    const { success } = await axios.delete(`/activityStatus/${id}`);
    if (success) {
      toggle();
      setActivityData((curr) => curr.filter((activity) => activity.id !== id));
      setId("");
    }
  };

  const handleInsert = async () => {
    let isValid = validate();
    if (!isValid) {
      const { success, data } = await axios.post("/activityStatus", activity);
      if (success === true) {
        setActivityData((curr) => [...curr, data]);
        setActivity({
          name: "",
          isActive: false,
        });
      }
    }
  };

  const updateMetohd = async () => {
    let { id, name, isActive } = activity;
    const { success, message } = await axios.put(`/activityStatus/${id}`, {
      name,
      isActive,
    });
    if (success) {
      toast.success(message);
      setActivityData((curr) => {
        const temp = curr.map((activityItem) => {
          if (activityItem.id === id) {
            return activity;
          } else {
            return activityItem;
          }
        });
        return temp;
      });
      setActivity({
        name: "",
        isActive: false,
      });
      setIsUpdate(false);
    }
  };
  const handleIsActive = async (e, obj) => {
    let { id, isActive, name } = obj;
    let tempActivityItem = { ...obj, isActive: e.target.checked };

    const { success } = await axios.put(`/activityStatus/${id}`, {
      isActive: !isActive,
      name,
    });
    if (success) {
      setActivityData((curr) => {
        const temp = curr.map((activityItem) => {
          if (activityItem.id === id) {
            return tempActivityItem;
          } else {
            return activityItem;
          }
        });
        return temp;
      });
    }
  };

  const handleUpdate = (obj) => {
    setIsUpdate(true);
    setActivity(obj);
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
          <CardTitle tag="h6">Activity Status Master</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col xs="12">
              <form onSubmit={handleActivity}>
                <Row className="align-items-top mb-3">
                  <Col xs="5">
                    <Label>
                      Enter Activity Status<span className="mandatory">*</span>
                    </Label>
                    <Input
                      type="text"
                      value={activity.name}
                      onChange={(e) =>
                        setActivity({
                          ...activity,
                          name: e.target.value,
                        })
                      }
                      invalid={error.name.inValid}
                      maxlength="64"
                    />
                    <FormFeedback>{error.name.errorMsg}</FormFeedback>
                  </Col>
                  <Col xs="3">
                    <FormGroup check className="status-check">
                      <Label check>
                        <Input
                          type="checkbox"
                          value={activity.isActive}
                          checked={activity.isActive}
                          onChange={(e) =>
                            setActivity({
                              ...activity,
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
              {activityData.length > 0 ? (
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Title</th>
                      <th className="status">Status</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activityData.map((activity, activityIdx) => (
                      <tr key={activityIdx}>
                        <td>{activity.name}</td>
                        <td className="text-center">
                          <div class="custom-control custom-switch">
                            <CustomInput
                              type="switch"
                              id={`activity${activityIdx}`}
                              checked={activity.isActive}
                              onClick={(e) => handleIsActive(e, activity)}
                            />
                          </div>
                        </td>
                        <td className="text-right">
                        <div className="action-btn">
                            <img src={require(`../../../assets/img/edit.png`)} alt="edit-icon" className="edit-icon"  onClick={() => handleUpdate(activity)} />
                            <img src={require(`../../../assets/img/trash.png`)} alt="trash-icon" className="trash-icon"  onClick={() => handlePrompt(activity.id)}/>
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
