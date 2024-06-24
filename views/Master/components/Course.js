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

const Course = () => {
  const [course, setCourse] = useState({
    title: "",
    isActive: false,
  });
  const [courseData, setCourseData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [error, setError] = useState(initialState);

  const [modal, setModal] = useState(false);
  const [id, setId] = useState("");
  const toggle = () => setModal(!modal);
  const handleErrorChange = (obj) => {
    setError((curr) => ({
      ...curr,
      ...obj,
    }));
  };
  const validate = () => {
    let flag = true;
    setError(initialState);
    if (/\d/.test(course.title)) {
      handleErrorChange({
        title: { inValid: true, errorMsg: "course do not contain numbers" },
      });
      flag = false;
    } else if (course.title > 10) {
      handleErrorChange({
        title: {
          inValid: true,
          errorMsg: "course is too long",
        },
      });
      flag = false;
    } else if (course.title === "") {
      handleErrorChange({
        title: {
          inValid: true,
          errorMsg: "Enter course",
        },
      });
      flag = false;
    }
    return !flag;
  };
  useEffect(() => {
    const fetchData = async () => {
      const { success, data } = await axios.get("/course");
      if (success === true) {
        setCourseData(data);
      }
    };
    fetchData();
  }, []);
  const handleCourse = (e) => {
    e.preventDefault();
    !isUpdate ? handleInsert() : updateMetohd();
  };

  const handlePrompt = (id) => {
    setId(id);
    toggle();
  };
  const handleDelete = async () => {
    setIsUpdate(false);
    setCourse({
      title: "",
      isActive: false,
    });
    setError(initialState);
    const { success } = await axios.delete(`/course/${id}`);
    if (success) {
      toggle();
      setCourseData((curr) => curr.filter((course) => course.id !== id));
      setId("");
    }
  };

  const handleInsert = async () => {
    let isValid = validate();
    if (!isValid) {
      const { success, data } = await axios.post("/course", course);
      if (success === true) {
        setCourseData((curr) => [...curr, { ...data }]);
        setCourse({
          title: "",
          isActive: false,
        });
      }
    }
  };

  const updateMetohd = async () => {
    let { id, title, isActive } = course;
    const { success, message } = await axios.put(`/course/${id}`, {
      title,
      isActive,
    });
    if (success) {
      toast.success(message);
      setCourseData((curr) => {
        const temp = curr.map((courseItem) => {
          if (courseItem.id === id) {
            return course;
          } else {
            return courseItem;
          }
        });
        return temp;
      });
      setCourse({
        title: "",
        isActive: false,
      });
      setIsUpdate(false);
    }
  };

  const handleIsActive = async (e, obj) => {
    let { id, isActive, title } = obj;
    let tempCourseItem = { ...obj, isActive: e.target.checked };

    const { success } = await axios.put(`/course/${id}`, {
      isActive: !isActive,
      title,
    });
    if (success) {
      setCourseData((curr) => {
        const temp = curr.map((courseItem) => {
          if (courseItem.id === id) {
            return tempCourseItem;
          } else {
            return courseItem;
          }
        });
        return temp;
      });
    }
  };

  const handleUpdate = (obj) => {
    setIsUpdate(true);
    setCourse(obj);
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
          <CardTitle tag="h6">Course Master</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col xs="12">
              <form onSubmit={handleCourse}>
                <Row className="align-items-top mb-3">
                  <Col xs="5">
                    <Label>
                      Enter Course Title<span className="mandatory">*</span>
                    </Label>
                    <Input
                      type="text"
                      value={course.title}
                      onChange={(e) =>
                        setCourse({
                          ...course,
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
                          value={course.isActive}
                          checked={course.isActive}
                          onChange={(e) =>
                            setCourse({
                              ...course,
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
              {courseData.length > 0 ? (
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Title</th>
                      <th className="status">Status</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courseData.map((course, courseIdx) => (
                      <tr key={courseIdx}>
                        <td>{course.title}</td>
                        <td className="text-center">
                          <div class="custom-control custom-switch">
                            <CustomInput
                              type="switch"
                              id={`course${courseIdx}`}
                              checked={course.isActive}
                              onClick={(e) => handleIsActive(e, course)}
                            />
                          </div>
                        </td>
                        <td className="text-right">
                        <div className="action-btn">
                            <img src={require(`../../../assets/img/edit.png`)} alt="edit-icon" className="edit-icon"  onClick={() => handleUpdate(course)}  />
                            <img src={require(`../../../assets/img/trash.png`)} alt="trash-icon" className="trash-icon"  onClick={() => handlePrompt(course.id)} />
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
export default Course;
