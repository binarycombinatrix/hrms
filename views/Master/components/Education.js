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
const Education = () => {
  const [education, setEducation] = useState({
    title: "",
    isActive: false,
  });
  const [educationData, setEducationData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [error, setError] = useState(initialState);

  const [modal, setModal] = useState(false);
  const [id, setId] = useState("");
  const toggle = () => setModal(!modal);
  useEffect(() => {
    const fetchData = async () => {
      const { success, data } = await axios.get("/education");
      if (success === true) {
        setEducationData(data);
      }
    };
    fetchData();
  }, []);
  const handleEducation = (e) => {
    e.preventDefault();
    !isUpdate ? handleInsert() : updateMetohd();
  };
  const handlePrompt = (id) => {
    setId(id);
    toggle();
  };
  const handleDelete = async () => {
    setIsUpdate(false);
    setEducation({
      title: "",
      isActive: false,
    });
    setError(initialState);
    const { success } = await axios.delete(`/education/${id}`);
    if (success) {
      toggle();
      setEducationData((curr) =>
        curr.filter((education) => education.id !== id)
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
    if (/\d/.test(education.title)) {
      handleErrorChange({
        title: { inValid: true, errorMsg: "Education do not contain numbers" },
      });
      flag = false;
    } else if (education.title > 10) {
      handleErrorChange({
        title: {
          inValid: true,
          errorMsg: "Education is too long",
        },
      });
      flag = false;
    } else if (education.title === "") {
      handleErrorChange({
        title: {
          inValid: true,
          errorMsg: "Enter education",
        },
      });
      flag = false;
    }
    return !flag;
  };
  const handleInsert = async () => {
    let isValid = validate();
    if (!isValid) {
      const { success, data } = await axios.post("/education", education);
      if (success === true) {
        setEducationData((curr) => [...curr, { ...data }]);
        setEducation({
          title: "",
          isActive: false,
        });
      }
    }
  };

  const updateMetohd = async () => {
    let { id, title, isActive } = education;
    const { success, message } = await axios.put(`/education/${id}`, {
      title,
      isActive,
    });
    if (success) {
      toast.success(message);
      setEducationData((curr) => {
        const temp = curr.map((educationItem) => {
          if (educationItem.id === id) {
            return education;
          } else {
            return educationItem;
          }
        });
        return temp;
      });
      setEducation({
        title: "",
        isActive: false,
      });
      setIsUpdate(false);
    }
  };

  const handleIsActive = async (e, obj) => {
    let { id, isActive, title } = obj;
    let tempEducationItem = { ...obj, isActive: e.target.checked };
    const { success } = await axios.put(`/education/${id}`, {
      isActive: !isActive,
      title,
    });
    if (success) {
      setEducationData((curr) => {
        const temp = curr.map((educationItem) => {
          if (educationItem.id === id) {
            return tempEducationItem;
          } else {
            return educationItem;
          }
        });
        return temp;
      });
    }
  };
  const handleUpdate = (obj) => {
    setIsUpdate(true);
    setEducation(obj);
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
          <CardTitle tag="h6">Education Master</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col xs="12">
              <form onSubmit={handleEducation}>
                <Row className="align-items-top mb-3">
                  <Col xs="5">
                    <label>
                      Enter Education Type<span className="mandatory">*</span>
                    </label>
                    <Input
                      type="text"
                      value={education.title}
                      onChange={(e) =>
                        setEducation({
                          ...education,
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
                          value={education.isActive}
                          checked={education.isActive}
                          onChange={(e) =>
                            setEducation({
                              ...education,
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
              {educationData.length > 0 ? (
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Title</th>
                      <th className="status">Status</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {educationData.map((education, educationIdx) => (
                      <tr key={educationIdx}>
                        <td>{education.title}</td>
                        <td className="text-center">
                          <div sclass="custom-control custom-switch">
                            <CustomInput
                              type="switch"
                              id={`education${educationIdx}`}
                              checked={education.isActive}
                              onClick={(e) => handleIsActive(e, education)}
                            />
                          </div>
                        </td>
                        <td className="text-right">
                        <div className="action-btn">
                            <img src={require(`../../../assets/img/edit.png`)} alt="edit-icon" className="edit-icon"  onClick={() => handleUpdate(education)} />
                            <img src={require(`../../../assets/img/trash.png`)} alt="trash-icon" className="trash-icon"  onClick={() => handlePrompt(education.id)} />
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
export default Education;
