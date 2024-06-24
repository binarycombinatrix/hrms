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
  Button,
  FormFeedback,
  CustomInput,
} from "reactstrap";
import { CKEditor } from "ckeditor4-react";
const initDocument = {
  technologyId: "",
  content: "",
};
const initDocumentError = {
  technologyId: {
    inValid: false,
    errorMsg: "",
  },
  content: {
    inValid: false,
    errorMsg: "",
  },
};
const AddContent = () => {
  const History = useHistory();
  const [technologyContent, setTechnologyContent] = useState(initDocument);
  const [technologyContentError, setTechnologyContentError] =
    useState(initDocumentError);
  const [contentError, setContentError] = useState({
    inValid: false,
    errorMsg: "",
  });
  const handleChange = (e) => {
    let { id, value } = e.target;
    setTechnologyContent((curr) => ({
      ...curr,
      [id]: value,
    }));
  };
  const handleErrorChange = (obj) => {
    setTechnologyContentError((curr) => ({
      ...curr,
      ...obj,
    }));
  };
  const validate = () => {
    let flag = true;
    setContentError({ inValid: false, errorMsg: "" });
    setTechnologyContentError(initDocumentError);
    if (technologyContent.content === "") {
      setContentError({ inValid: true, errorMsg: "Please enter content" });
      flag = false;
    }

    if (technologyContent.technologyId === "") {
      handleErrorChange({
        technologyId: {
          inValid: true,
          errorMsg: "Please select technology",
        },
      });
      flag = false;
    }
    return !flag;
  };

  const handleContent = async () => {
    let isValid = validate();
    if (!isValid) {
      const { success } = await axios.post(
        "/technologyContent",
        technologyContent
      );
      if (success === true) {
        History.push("/admin/content");
      }
    }
  };

  return (
    <div className="content">
      <div className="text-right">
      <Link to="/admin/content" className="btn bg-primary">Content List</Link>
      </div>
      <Nav tabs>
        <NavItem>
          <NavLink className={classnames({ active: true })}>
            Technology content
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
                    value={technologyContent.technologyId}
                    invalid={technologyContentError.technologyId.inValid}
                  >
                    <option value="">Select technology</option>
                    <option value="1">PHP</option>
                    <option value="3">JAVASCRIPT</option>
                  </CustomInput>
                  <FormFeedback>
                    {technologyContentError.technologyId.errorMsg}
                  </FormFeedback>
                </FormGroup>

                <FormGroup className="col-md-12">
                  <Label for="metaKeyword">
                    Content<span className="mandatory">*</span>
                  </Label>
                  <CKEditor
                    onChange={(event) => {
                      setTechnologyContent((prv) => ({
                        ...prv,
                        content: event.editor.getData(),
                      }));
                    }}
                  />
                  {contentError.inValid && (
                    <Label className="text-danger">
                      {contentError.errorMsg}
                    </Label>
                  )}
                </FormGroup>
              </div>
              <FormGroup className="col-md-12 text-right">
                <Button color="primary" className="m-0" onClick={handleContent}>
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

export default AddContent;
