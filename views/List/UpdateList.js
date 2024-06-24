import React, { useState } from "react";
import axios from "../../axios/Axios";
import classnames from "classnames";
import { useLocation } from "react-router-dom";
import { useHistory, Link } from "react-router-dom";
import { toast } from "react-toastify";

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
  FormFeedback,
} from "reactstrap";
import { CKEditor } from "ckeditor4-react";
const initDocument = {
  documentName: "",
  code: "",
  content: "",
};
const initDocumentError = {
  documentName: {
    inValid: false,
    errorMsg: "",
  },
  code: {
    inValid: false,
    errorMsg: "",
  },
  content: {
    inValid: false,
    errorMsg: "",
  },
};
const AddProjects = () => {
  const { state } = useLocation();
  const History = useHistory();
  if (!state) {
    History.push("/admin/projects");
  }
  const [document, setDocument] = useState(!state ? initDocument : state);
  const [documentError, setDocumentError] = useState(initDocumentError);
  const [contentError, setContentError] = useState({
    inValid: false,
    errorMsg: "",
  });
  const handleChange = (e) => {
    let { id, value } = e.target;
    setDocument((curr) => ({
      ...curr,
      [id]: value,
    }));
  };
  const handleErrorChange = (obj) => {
    setDocumentError((curr) => ({
      ...curr,
      ...obj,
    }));
  };
  const validate = () => {
    let flag = true;
    setContentError({ inValid: false, errorMsg: "" });
    setDocumentError(initDocumentError);
    if (document.content === "") {
      setContentError({ inValid: true, errorMsg: "Please enter content" });
      flag = false;
    }

    if (document.documentName === "") {
      handleErrorChange({
        documentName: {
          inValid: true,
          errorMsg: "Please enter document name",
        },
      });
      flag = false;
    } else if (/\d/.test(document.documentName)) {
      handleErrorChange({
        documentName: {
          inValid: true,
          errorMsg: "document name not contain numbers",
        },
      });
      flag = false;
    }

    if (document.code === "") {
      handleErrorChange({
        code: {
          inValid: true,
          errorMsg: "Please enter code",
        },
      });
      flag = false;
    }
    return !flag;
  };

  const handleDocument = async (e) => {
    e.preventDefault();
    let isValid = validate();
    if (!isValid) {
      const { success, message } = await axios.put(
        `/document/${document.id}`,
        document
      );
      if (success === true) {
        toast.success(message);
        History.push("/admin/list");
      }
    }
  };

  return (
    <div className="content">
      <div className="text-right">
        <Link to="/admin/list" className="btn bg-primary">
          Document List
        </Link>
      </div>
      <Nav tabs>
        <NavItem>
          <NavLink className={classnames({ active: true })}>
            Document template
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
                  <Label for="documentName">
                    Document Name<span className="mandatory">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="documentName"
                    value={document.documentName}
                    onChange={handleChange}
                    invalid={documentError.documentName.inValid}
                    maxlength="40"
                  />
                  <FormFeedback>
                    {documentError.documentName.errorMsg}
                  </FormFeedback>
                </FormGroup>
                <FormGroup className="col-md-6">
                  <Label for="code">
                    Code<span className="mandatory">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="code"
                    value={document.code}
                    onChange={handleChange}
                    invalid={documentError.code.inValid}
                    maxlength="40"
                  />
                  <FormFeedback>{documentError.code.errorMsg}</FormFeedback>
                </FormGroup>
                <FormGroup className="col-md-12">
                  <Label for="metaKeyword">
                    Content<span className="mandatory">*</span>
                  </Label>
                  <CKEditor
                    initData={document.content}
                    onChange={(event) => {
                      setDocument((prv) => ({
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
                <Button
                  color="primary"
                  className="m-0"
                  onClick={handleDocument}
                >
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
