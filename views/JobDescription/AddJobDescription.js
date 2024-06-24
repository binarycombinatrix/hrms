import React, { useState } from "react";
import {
  FormGroup,
  Label,
  Input,
  Button,
  CustomInput,
  FormFeedback,
} from "reactstrap";
import { Card, CardBody } from "reactstrap";
import { CKEditor } from "ckeditor4-react";
import axios from "./../../axios/Axios";
import { useHistory, Link } from "react-router-dom";
const initJobDescriptionError = {
  technologyId: {
    inValid: false,
    errorMsg: "",
  },
  experience: {
    inValid: false,
    errorMsg: "",
  },
  content: {
    inValid: false,
    errorMsg: "",
  },
};

const Index = () => {
  const History = useHistory();
  const [jobDescription, setJobDescription] = useState({
    technologyId: "",
    experience: "",
    content: "",
  });
  const [contentError, setContentError] = useState({
    inValid: false,
    errorMsg: "",
  });
  const [jobDescriptionError, setJobDescriptionError] = useState(
    initJobDescriptionError
  );

  const handleChange = (e) => {
    let { id, value } = e.target;
    setJobDescription((curr) => ({
      ...curr,
      [id]: value,
    }));
  };
  const handleErrorChange = (obj) => {
    setJobDescriptionError((curr) => ({
      ...curr,
      ...obj,
    }));
  };
  const validate = () => {
    let flag = true;
    setJobDescriptionError(initJobDescriptionError);
    setContentError({ inValid: false, errorMsg: "" });
    if (jobDescription.content === "") {
      setContentError({ inValid: true, errorMsg: "Please enter content" });
      flag = false;
    }
    if (jobDescription.technologyId === "") {
      handleErrorChange({
        technologyId: {
          inValid: true,
          errorMsg: "Please select technology",
        },
      });
      flag = false;
    }

    if (jobDescription.experience === " ") {
      handleErrorChange({
        experience: {
          inValid: true,
          errorMsg: "Please enter experience",
        },
      });
      flag = false;
    }

    return !flag;
  };
  const handleJobDescription = async () => {
    let isValid = validate();
    if (!isValid) {
      const { success } = await axios.post("/jobDescription", jobDescription);
      if (success === true) {
        History.push("/admin/job-description");
        setJobDescription({
          technologyId: "",
          experience: "",
          content: "",
        });
      }
    }
  };
  return (
    <div className="content">
      <div className="text-right">
        <Link to="/admin/job-description" className="btn bg-primary">
          Job Description List
        </Link>
      </div>
      <Card>
        <form onSubmit={() => {}}>
          <CardBody>
            <div className="form-row">
              <FormGroup className="col-md-6">
                <Label for="technologyId">
                  Technology<span className="mandatory">*</span>
                </Label>
                <CustomInput
                  type="select"
                  id="technologyId"
                  name="technologyId"
                  onChange={handleChange}
                  value={jobDescription.technologyId}
                  invalid={jobDescriptionError.technologyId.inValid}
                >
                  <option value="">select technology</option>
                  <option value="1">PHP</option>
                  <option value="3">JAVASCRIPT</option>
                </CustomInput>
                <FormFeedback>
                  {jobDescriptionError.technologyId.errorMsg}
                </FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label for="experience">
                  Experiecne<span className="mandatory">*</span>
                </Label>
                <Input
                  type="text"
                  id="experience"
                  value={jobDescription.experience}
                  onChange={handleChange}
                  invalid={jobDescriptionError.experience.inValid}
                />
                <FormFeedback>
                  {jobDescriptionError.experience.errorMsg}
                </FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-12">
                <Label for="metaKeyword">
                  Content<span className="mandatory">*</span>
                </Label>
                <CKEditor
                  Data={jobDescription.content}
                  onChange={(event) => {
                    setJobDescription((prv) => ({
                      ...prv,
                      content: event.editor.getData(),
                    }));
                  }}
                />
                {contentError.inValid && (
                  <Label className="text-danger">{contentError.errorMsg}</Label>
                )}
              </FormGroup>
              <FormGroup className="col-md-12 text-right">
                <Button
                  color="primary"
                  className="m-0"
                  onClick={handleJobDescription}
                >
                  Save
                </Button>
              </FormGroup>
            </div>
          </CardBody>
        </form>
      </Card>
    </div>
  );
};

export default Index;
