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
const TechnologyMaster = () => {
  const [technologyTitle, setTechnologyTitle] = useState({
    title: "",
    isActive: false,
  });
  const [technologyData, setTechnologyData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [error, setError] = useState(initialState);

  const [modal, setModal] = useState(false);
  const [id, setId] = useState("");
  const toggle = () => setModal(!modal);

  useEffect(() => {
    const fetchData = async () => {
      const { success, data } = await axios.get("/technology");
      if (success === true) {
        setTechnologyData(data);
      }
    };
    fetchData();
  }, []);
  const handleTechnology = (e) => {
    e.preventDefault();
    !isUpdate ? handleInsert() : updateMetohd();
  };
  const handlePrompt = (id) => {
    setId(id);
    toggle();
  };
  const handleDelete = async () => {
    setIsUpdate(false);
    setTechnologyTitle({
      title: "",
      isActive: false,
    });
    setError(initialState);
    const { success } = await axios.delete(`/technology/${id}`);
    if (success) {
      toggle();
      setTechnologyData((curr) =>
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
    if (/\d/.test(technologyTitle.title)) {
      handleErrorChange({
        title: {
          inValid: true,
          errorMsg: "Technology do not contain numbers",
        },
      });
      flag = false;
    } else if (technologyTitle.title > 10) {
      handleErrorChange({
        title: {
          inValid: true,
          errorMsg: "Technology is too long",
        },
      });
      flag = false;
    } else if (technologyTitle.title === "") {
      handleErrorChange({
        title: {
          inValid: true,
          errorMsg: "Enter technology",
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
        "/technology",
        technologyTitle
      );
      if (success === true) {
        setTechnologyData((curr) => [...curr, { ...data }]);
        setTechnologyTitle({
          title: "",
          isActive: false,
        });
      }
    }
  };

  const updateMetohd = async () => {
    let { id, title, isActive } = technologyTitle;
    const { success, message } = await axios.put(`/technology/${id}`, {
      title,
      isActive,
    });
    if (success) {
      toast.success(message);
      setTechnologyData((curr) => {
        const temp = curr.map((technology) => {
          if (technology.id === id) {
            return technologyTitle;
          } else {
            return technology;
          }
        });
        return temp;
      });
      setTechnologyTitle({
        title: "",
        isActive: false,
      });
      setIsUpdate(false);
    }
  };
  const handleIsActive = async (e, obj) => {
    let { id, isActive, title } = obj;
    let tempTechnologyItem = { ...obj, isActive: e.target.checked };

    const { success } = await axios.put(`/technology/${id}`, {
      isActive: !isActive,
      title,
    });
    if (success) {
      setTechnologyData((curr) => {
        const temp = curr.map((technologyItem) => {
          if (technologyItem.id === id) {
            return tempTechnologyItem;
          } else {
            return technologyItem;
          }
        });
        return temp;
      });
    }
  };
  const handleUpdate = (obj) => {
    setIsUpdate(true);
    setTechnologyTitle(obj);
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
          <CardTitle tag="h6">Technology Master</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col xs="12">
              <form onSubmit={handleTechnology}>
                <Row className="align-items-top mb-3">
                  <Col xs="5">
                    <label>
                      Enter Technology Title<span className="mandatory">*</span>
                    </label>
                    <Input
                      type="text"
                      value={technologyTitle.title}
                      onChange={(e) =>
                        setTechnologyTitle({
                          ...technologyTitle,
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
                          value={technologyTitle.isActive}
                          defaultChecked={technologyTitle.isActive}
                          onChange={(e) =>
                            setTechnologyTitle({
                              ...technologyTitle,
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
              {technologyData.length > 0 ? (
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Title</th>
                      <th className="status">Status</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {technologyData.map((technology, technologyIdx) => (
                      <tr key={technologyIdx}>
                        <td>{technology.title}</td>
                        <td className="text-center">
                          <div className="custom-control custom-switch">
                            <CustomInput
                              type="switch"
                              id={`technology${technologyIdx}`}
                              checked={technology.isActive}
                              onClick={(e) => handleIsActive(e, technology)}
                            />
                          </div>
                        </td>
                        <td className="text-right">
                        <div className="action-btn">
                            <img src={require(`../../../assets/img/edit.png`)} alt="edit-icon" className="edit-icon"  onClick={() => handleUpdate(technology)} />
                            <img src={require(`../../../assets/img/trash.png`)} alt="trash-icon" className="trash-icon"  onClick={() => handlePrompt(technology.id)} />
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

export default TechnologyMaster;
