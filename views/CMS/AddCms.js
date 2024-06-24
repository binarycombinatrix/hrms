import React, { useState } from "react";
import {
  FormGroup,
  Label,
  Input,
  Button,
  CustomInput,
  FormFeedback,
} from "reactstrap";
import { Card, CardHeader, CardBody, CardTitle } from "reactstrap";
import { CKEditor } from "ckeditor4-react";
import { Link } from "react-router-dom";
import axios from "./../../axios/Axios";

const initCmsError = {
  title: {
    inValid: false,
    errorMsg: "",
  },
  content: {
    inValid: false,
    errorMsg: "",
  },
  metaTitle: {
    inValid: false,
    errorMsg: "",
  },
  metaKeyword: {
    inValid: false,
    errorMsg: "",
  },
  metaDescription: {
    inValid: false,
    errorMsg: "",
  },
  accessKey: {
    inValid: false,
    errorMsg: "",
  },
  status: {
    inValid: false,
    errorMsg: "",
  },
};

const Index = () => {
  const [cms, setCms] = useState({
    title: "",
    content: "",
    metaTitle: "",
    metaKeyword: "",
    metaDescription: "",
    accessKey: "",
    status: "",
  });

  const [cmsError, setCmsError] = useState(initCmsError);
  const [contentError, setContentError] = useState({
    inValid: false,
    errorMsg: "",
  });
  const handleChange = (e) => {
    let { id, value } = e.target;
    setCms((curr) => ({
      ...curr,
      [id]: value,
    }));
  };
  const handleErrorChange = (obj) => {
    setCmsError((curr) => ({
      ...curr,
      ...obj,
    }));
  };
  const validate = () => {
    let flag = true;
    setCmsError(initCmsError);
    setContentError({ inValid: false, errorMsg: "" });
    if (cms.content === "") {
      setContentError({ inValid: true, errorMsg: "Please enter content" });
      flag = false;
    }
    if (cms.title === "") {
      handleErrorChange({
        title: {
          inValid: true,
          errorMsg: "Please select title",
        },
      });
      flag = false;
    }
    if (cms.metaTitle === "") {
      handleErrorChange({
        metaTitle: {
          inValid: true,
          errorMsg: "Please enter meta title",
        },
      });
      flag = false;
    }
    if (cms.metaKeyword === "") {
      handleErrorChange({
        metaKeyword: {
          inValid: true,
          errorMsg: "Please enter meta keyword",
        },
      });
      flag = false;
    }

    if (cms.metaDescription === "") {
      handleErrorChange({
        metaDescription: {
          inValid: true,
          errorMsg: "Please enter meta description",
        },
      });
      flag = false;
    }

    if (cms.accessKey === "") {
      handleErrorChange({
        accessKey: {
          inValid: true,
          errorMsg: "Please enter access key",
        },
      });
      flag = false;
    }
    if (cms.status === "") {
      handleErrorChange({
        status: {
          inValid: true,
          errorMsg: "Please select status",
        },
      });
      flag = false;
    }

    return !flag;
  };
  const handleCms = async () => {
    let isValid = validate();
    if (!isValid) {
      const { success } = await axios.post("/page", cms);
      if (success === true) {
        setCms({
          title: "",
          content: "",
          metaTitle: "",
          metaKeyword: "",
          metaDescription: "",
          accessKey: "",
          status: "",
        });
      }
    }
  };
  return (
    <div className="content">
      <div className="text-right">
      <Link to="/admin/pagemaster" className="btn bg-primary">Page Master List</Link>
      </div>
      <Card>
        <form onSubmit={() => {}}>
          <CardBody>
            <CardHeader className="p-0">
              <CardTitle tag="h6">Add Page</CardTitle>
            </CardHeader>
            <div className="form-row mt-3">
              <FormGroup className="col-md-12">
                <Label for="title">
                  Title<span className="mandatory">*</span>
                </Label>
                <Input
                  type="text"
                  id="title"
                  onChange={handleChange}
                  value={cms.title}
                  invalid={cmsError.title.inValid}
                />

                <FormFeedback>{cmsError.title.errorMsg}</FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-12">
                <Label for="metaKeyword">
                  Content<span className="mandatory">*</span>
                </Label>
                <CKEditor
                  onChange={(event) => {
                    setCms((prv) => ({
                      ...prv,
                      content: event.editor.getData(),
                    }));
                  }}
                />

                {contentError.inValid && (
                  <Label className="text-danger">{contentError.errorMsg}</Label>
                )}
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label for="metaTitle">
                  Meta Title<span className="mandatory">*</span>
                </Label>
                <Input
                  type="text"
                  id="metaTitle"
                  onChange={handleChange}
                  value={cms.metaTitle}
                  invalid={cmsError.metaTitle.inValid}
                />

                <FormFeedback>{cmsError.metaTitle.errorMsg}</FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label for="metaKeyword">
                  Meta Keyword<span className="mandatory">*</span>
                </Label>
                <Input
                  type="text"
                  id="metaKeyword"
                  onChange={handleChange}
                  value={cms.metaKeyword}
                  invalid={cmsError.metaKeyword.inValid}
                />

                <FormFeedback>{cmsError.metaKeyword.errorMsg}</FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-12">
                <Label for="metaDescription">
                  Meta Description<span className="mandatory">*</span>
                </Label>
                <Input
                  type="textarea"
                  id="metaDescription"
                  onChange={handleChange}
                  value={cms.metaDescription}
                  invalid={cmsError.metaDescription.inValid}
                />

                <FormFeedback>{cmsError.metaDescription.errorMsg}</FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label for="accessKey">
                  Access Key<span className="mandatory">*</span>
                </Label>
                <Input
                  type="text"
                  id="accessKey"
                  onChange={handleChange}
                  value={cms.accessKey}
                  invalid={cmsError.accessKey.inValid}
                />

                <FormFeedback>{cmsError.accessKey.errorMsg}</FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label for="status">
                  Status<span className="mandatory">*</span>
                </Label>
                <CustomInput
                  type="select"
                  id="status"
                  name="status"
                  onChange={handleChange}
                  value={cms.status}
                  invalid={cmsError.status.inValid}
                >
                  <option value="">select status</option>
                  <option value="Enable">Enable</option>
                  <option value="Disable">Disable</option>
                </CustomInput>
                <FormFeedback>{cmsError.status.errorMsg}</FormFeedback>
              </FormGroup>

              <FormGroup className="col-md-12 text-right">
                <Button color="primary" className="m-0" onClick={handleCms}>
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
