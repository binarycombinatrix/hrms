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
const Skill = () => {
  const [skill, setSkill] = useState({
    title: "",
    isActive: false,
  });
  const [skillData, setSkillData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [error, setError] = useState(initialState);

  const [modal, setModal] = useState(false);
  const [id, setId] = useState("");
  const toggle = () => setModal(!modal);
  useEffect(() => {
    const fetchData = async () => {
      const { success, data } = await axios.get("/skill");
      if (success === true) {
        setSkillData(data);
      }
    };
    fetchData();
  }, []);
  const handleSkill = (e) => {
    e.preventDefault();
    !isUpdate ? handleInsert() : updateMetohd();
  };
  const handlePrompt = (id) => {
    setId(id);
    toggle();
  };
  const handleDelete = async () => {
    setIsUpdate(false);
    setSkill({
      title: "",
      isActive: false,
    });
    setError(initialState);
    const { success } = await axios.delete(`/skill/${id}`);
    if (success) {
      toggle();
      setSkillData((curr) => curr.filter((skill) => skill.id !== id));
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
    if (/\d/.test(skill.title)) {
      handleErrorChange({
        title: { inValid: true, errorMsg: "Skill do not contain numbers" },
      });
      flag = false;
    } else if (skill.title > 10) {
      handleErrorChange({
        title: {
          inValid: true,
          errorMsg: "Skill is too long",
        },
      });
      flag = false;
    } else if (skill.title === "") {
      handleErrorChange({
        title: {
          inValid: true,
          errorMsg: "Enter skill",
        },
      });
      flag = false;
    }
    return !flag;
  };
  const handleInsert = async () => {
    let isValid = validate();
    if (!isValid) {
      const { success, data } = await axios.post("/skill", skill);
      if (success === true) {
        setSkillData((curr) => [...curr, { ...data }]);
        setSkill({
          title: "",
          isActive: false,
        });
      }
    }
  };

  const updateMetohd = async () => {
    let { id, title, isActive } = skill;
    const { success, message } = await axios.put(`/skill/${id}`, {
      title,
      isActive,
    });
    if (success) {
      toast.success(message);
      setSkillData((curr) => {
        const temp = curr.map((skillItem) => {
          if (skillItem.id === id) {
            return skill;
          } else {
            return skillItem;
          }
        });
        return temp;
      });
      setSkill({
        title: "",
        isActive: false,
      });
      setIsUpdate(false);
    }
  };

  const handleIsActive = async (e, obj) => {
    let { id, isActive, title } = obj;
    let tempSkillItem = { ...obj, isActive: e.target.checked };

    const { success } = await axios.put(`/skill/${id}`, {
      isActive: !isActive,
      title,
    });
    if (success) {
      setSkillData((curr) => {
        const temp = curr.map((skillItem) => {
          if (skillItem.id === id) {
            return tempSkillItem;
          } else {
            return skillItem;
          }
        });
        return temp;
      });
    }
  };

  const handleUpdate = (obj) => {
    setIsUpdate(true);
    setSkill(obj);
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
          <CardTitle tag="h6">Skill Master</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col xs="12">
              <form onSubmit={handleSkill}>
                <Row className="align-items-top mb-3">
                  <Col xs="5">
                    <label>
                      Enter Skill<span className="mandatory">*</span>
                    </label>
                    <Input
                      type="text"
                      value={skill.title}
                      onChange={(e) =>
                        setSkill({
                          ...skill,
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
                          value={skill.isActive}
                          checked={skill.isActive}
                          onChange={(e) =>
                            setSkill({
                              ...skill,
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
              {skillData.length > 0 ? (
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Title</th>
                      <th className="status">Status</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {skillData.map((skill, skillIdx) => (
                      <tr key={skillIdx}>
                        <td>{skill.title}</td>
                        <td className="text-center">
                          <div class="custom-control custom-switch">
                            <CustomInput
                              type="switch"
                              id={`skill${skillIdx}`}
                              checked={skill.isActive}
                              onClick={(e) => handleIsActive(e, skill)}
                            />
                          </div>
                        </td>
                        <td className="text-right">
                        <div className="action-btn">
                            <img src={require(`../../../assets/img/edit.png`)} alt="edit-icon" className="edit-icon" onClick={() => handleUpdate(skill)} />
                            <img src={require(`../../../assets/img/trash.png`)} alt="trash-icon" className="trash-icon"  onClick={() => handlePrompt(skill.id)}  />
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

export default Skill;
