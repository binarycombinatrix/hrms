import React, { useState } from "react";
import axios from "../../axios/Axios";
import classnames from "classnames";
import { useHistory, Link } from "react-router-dom";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  CardBody,
  FormGroup,
  Label,
  Input,
  Button,
  CustomInput,
  FormFeedback,
} from "reactstrap";
import { CKEditor } from "ckeditor4-react";
const initProject = {
  projectName: "",
  projectManager: "",
  technologyId: "",
  year: "",
  description: "",
};
const initProjectError = {
  projectName: {
    inValid: false,
    errorMsg: "",
  },
  projectManager: {
    inValid: false,
    errorMsg: "",
  },
  technologyId: {
    inValid: false,
    errorMsg: "",
  },
  year: {
    inValid: false,
    errorMsg: "",
  },
  description: {
    inValid: false,
    errorMsg: "",
  },
};
const AddProjects = () => {
  const History = useHistory();
  const [project, setProject] = useState(initProject);
  const [projectError, setProjectError] = useState(initProjectError);
  const [descriptionError, setDescriptionError] = useState({
    inValid: false,
    errorMsg: "",
  });
  const handleChange = (e) => {
    let { id, value } = e.target;
    setProject((curr) => ({
      ...curr,
      [id]: value,
    }));
  };
  const handleErrorChange = (obj) => {
    setProjectError((curr) => ({
      ...curr,
      ...obj,
    }));
  };
  const validate = () => {
    let flag = true;
    setDescriptionError({ inValid: false, errorMsg: "" });
    setProjectError(initProjectError);
    if (project.description === "") {
      setDescriptionError({ inValid: true, errorMsg: "Please enter content" });
      flag = false;
    }
    if (project.technologyId === "") {
      handleErrorChange({
        technologyId: {
          inValid: true,
          errorMsg: "Please select technology",
        },
      });
      flag = false;
    }
    let yearArray = project.year.split("-");
    if (project.year === "") {
      handleErrorChange({
        year: {
          inValid: true,
          errorMsg: "Please enter year",
        },
      });
      flag = false;
    } else if (yearArray.length !== 2 || project.year.length !== 7) {
      handleErrorChange({
        year: {
          inValid: true,
          errorMsg: "Please enter valid year",
        },
      });
      flag = false;
    }

    if (project.projectManager === "") {
      handleErrorChange({
        projectManager: {
          inValid: true,
          errorMsg: "Please enter project manager",
        },
      });
      flag = false;
    }

    if (project.projectName === "") {
      handleErrorChange({
        projectName: {
          inValid: true,
          errorMsg: "Please enter project name",
        },
      });
      flag = false;
    }

    return !flag;
  };

  const handleProject = async () => {
    let isValid = validate();
    if (!isValid) {
      const { success } = await axios.post("/project", project);
      if (success === true) {
        History.push("/admin/projects");
      }
    }
  };

  return (
    <div className="content">
      <div className="text-right">
        <Link to="/admin/projects" className="btn bg-primary">
          Project List
        </Link>
      </div>
      <Nav tabs>
        <NavItem>
          <NavLink className={classnames({ active: true })}>
            Intern Project
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab="1">
        <TabPane tabId="1"></TabPane>
        <Card>
          <form>
            <CardBody>
              <div className="form-row">
                <FormGroup className="col-md-6">
                  <Label for="email">
                    Technology Name<span className="mandatory">*</span>
                  </Label>
                  <CustomInput
                    type="select"
                    id="technologyId"
                    name="technologyId"
                    onChange={handleChange}
                    value={project.technologyId}
                    invalid={projectError.technologyId.inValid}
                  >
                    <option value="">Select technology</option>
                    <option value="1">PHP</option>
                    <option value="3">JAVASCRIPT</option>
                  </CustomInput>
                  <FormFeedback>
                    {projectError.technologyId.errorMsg}
                  </FormFeedback>
                </FormGroup>
                <FormGroup className="col-md-6">
                  <Label for="projectManager">
                    Project Manager<span className="mandatory">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="projectManager"
                    value={project.projectManager}
                    onChange={handleChange}
                    invalid={projectError.projectManager.inValid}
                    maxlength="20"
                  />
                  <FormFeedback>
                    {projectError.projectManager.errorMsg}
                  </FormFeedback>
                </FormGroup>
              </div>
              <div className="form-row">
                <FormGroup className="col-md-6">
                  <Label for="projectName">
                    Project Name<span className="mandatory">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="projectName"
                    value={project.projectName}
                    onChange={handleChange}
                    invalid={projectError.projectName.inValid}
                    maxlength="20"
                  />
                  <FormFeedback>
                    {projectError.projectName.errorMsg}
                  </FormFeedback>
                </FormGroup>
                <FormGroup className="col-md-6">
                  <Label for="year">
                    Year [2020-21]<span className="mandatory">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="year"
                    value={project.year}
                    onChange={handleChange}
                    invalid={projectError.year.inValid}
                    maxlength="7"
                  />
                  <FormFeedback>{projectError.year.errorMsg}</FormFeedback>
                </FormGroup>
                <FormGroup className="col-md-12">
                  <Label for="metaKeyword">
                    Content<span className="mandatory">*</span>
                  </Label>
                  <CKEditor
                    onChange={(event) => {
                      setProject((prv) => ({
                        ...prv,
                        description: event.editor.getData(),
                      }));
                    }}
                  />
                  {descriptionError.inValid && (
                    <Label className="text-danger">
                      {descriptionError.errorMsg}
                    </Label>
                  )}
                </FormGroup>
              </div>
              <FormGroup className="col-md-12 text-right">
                <Button color="primary" className="m-0" onClick={handleProject}>
                  Save
                </Button>
              </FormGroup>
            </CardBody>
          </form>
        </Card>
      </TabContent>
    </div>
  );
};

export default AddProjects;
