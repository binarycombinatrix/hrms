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
const Department = () => {
  const [department, setDepartment] = useState({
    title: "",
    isActive: false,
  });
  const [departmentData, setDepartmentData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [error, setError] = useState(initialState);

  const [modal, setModal] = useState(false);
  const [id, setId] = useState("");
  const toggle = () => setModal(!modal);
  useEffect(() => {
    const fetchData = async () => {
      const { success, data } = await axios.get("/department");
      if (success === true) {
        setDepartmentData(data);
      }
    };
    fetchData();
  }, []);
  const handleDepartment = (e) => {
    e.preventDefault();
    !isUpdate ? handleInsert() : updateMetohd();
  };
  const handlePrompt = (id) => {
    setId(id);
    toggle();
  };
  const handleDelete = async () => {
    setIsUpdate(false);
    setDepartment({
      title: "",
      isActive: false,
    });
    setError(initialState);
    const { success } = await axios.delete(`/department/${id}`);
    if (success) {
      toggle();
      setDepartmentData((curr) =>
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
    if (/\d/.test(department.title)) {
      handleErrorChange({
        title: { inValid: true, errorMsg: "Department do not contain numbers" },
      });
      flag = false;
    } else if (department.title > 10) {
      handleErrorChange({
        title: {
          inValid: true,
          errorMsg: "Department is too long",
        },
      });
      flag = false;
    } else if (department.title === "") {
      handleErrorChange({
        title: {
          inValid: true,
          errorMsg: "Enter department",
        },
      });
      flag = false;
    }
    return !flag;
  };
  const handleInsert = async () => {
    let isValid = validate();
    if (!isValid) {
      const { success, data } = await axios.post("/department", department);
      if (success === true) {
        setDepartmentData((curr) => [...curr, { ...data }]);
        setDepartment({
          title: "",
          isActive: false,
        });
      }
    }
  };

  const updateMetohd = async () => {
    let { id, title, isActive } = department;
    const { success, message } = await axios.put(`/department/${id}`, {
      title,
      isActive,
    });
    if (success) {
      toast.success(message);
      setDepartmentData((curr) => {
        const temp = curr.map((departmentItem) => {
          if (departmentItem.id === id) {
            return department;
          } else {
            return departmentItem;
          }
        });
        return temp;
      });
      setDepartment({
        title: "",
        isActive: false,
      });
      setIsUpdate(false);
    }
  };
  const handleIsActive = async (e, obj) => {
    let { id, isActive, title } = obj;
    let tempDepartmentItem = { ...obj, isActive: e.target.checked };

    const { success } = await axios.put(`/department/${id}`, {
      isActive: !isActive,
      title,
    });
    if (success) {
      setDepartmentData((curr) => {
        const temp = curr.map((departmentItem) => {
          if (departmentItem.id === id) {
            return tempDepartmentItem;
          } else {
            return departmentItem;
          }
        });
        return temp;
      });
    }
  };
  const handleUpdate = (obj) => {
    setIsUpdate(true);
    setDepartment(obj);
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
          <CardTitle tag="h6">Department Master</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col xs="12">
              <form onSubmit={handleDepartment}>
                <Row className="align-items-top mb-3">
                  <Col xs="5">
                    <label>
                      Enter Department Type<span className="mandatory">*</span>
                    </label>
                    <Input
                      type="text"
                      value={department.title}
                      onChange={(e) =>
                        setDepartment({
                          ...department,
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
                          value={department.isActive}
                          checked={department.isActive}
                          onChange={(e) =>
                            setDepartment({
                              ...department,
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
              {departmentData.length > 0 ? (
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Title</th>
                      <th className="status">Status</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departmentData.map((department, depIdx) => (
                      <tr key={depIdx}>
                        <td>{department.title}</td>
                        <td className="text-center">
                          <div class="custom-control custom-switch">
                            <CustomInput
                              type="switch"
                              id={`department${depIdx}`}
                              checked={department.isActive}
                              onClick={(e) => handleIsActive(e, department)}
                            />
                          </div>
                        </td>
                        <td className="text-right">
                        <div className="action-btn">
                            <img src={require(`../../../assets/img/edit.png`)} alt="edit-icon" className="edit-icon" onClick={() => handleUpdate(department)} />
                            <img src={require(`../../../assets/img/trash.png`)} alt="trash-icon" className="trash-icon"  onClick={() => handlePrompt(department.id)} />
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
export default Department;
