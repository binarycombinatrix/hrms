import React, { useState, useEffect } from "react";
import classnames from "classnames";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  CardBody,
  CardHeader,
  FormGroup,
  Label,
  Input,
  Button,
  CustomInput,
  CardTitle,
  Row,
  Col,
  FormFeedback,
} from "reactstrap";
import axios from "../../axios/Axios";
import { useLocation } from "react-router-dom";
import { useHistory, Link } from "react-router-dom";
import { toast } from "react-toastify";

const initialCollegeState = {
  collegeName: "",
  streetLine1: "",
  streetLine2: "",
  area: "",
  city: "",
  state: "",
  zipcode: "",
  website: "https://",
};
const initialcollegeError = {
  collegeName: {
    inValid: false,
    errorMsg: "",
  },
  streetLine1: {
    inValid: false,
    errorMsg: "",
  },
  streetLine2: {
    inValid: false,
    errorMsg: "",
  },
  area: {
    inValid: false,
    errorMsg: "",
  },
  city: {
    inValid: false,
    errorMsg: "",
  },
  state: {
    inValid: false,
    errorMsg: "",
  },
  zipcode: {
    inValid: false,
    errorMsg: "",
  },
  website: {
    inValid: false,
    errorMsg: "",
  },
};

const initialContactError = {
  name: {
    inValid: false,
    errorMsg: "",
  },
  email: {
    inValid: false,
    errorMsg: "",
  },
  contactNumber: {
    inValid: false,
    errorMsg: "",
  },
};
const AddCompany = () => {
  const { state } = useLocation();
  const History = useHistory();
  if (!state) {
    History.push("/admin/college");
  }
  const [college, setCollege] = useState(!state ? initialCollegeState : state);

  const [collegeError, setCollegeError] = useState(initialcollegeError);

  const [contact, setContact] = useState([]);
  const [contactError, setContactError] = useState([]);
  const unwrap = ({
    id,
    collegeName,
    streetLine1,
    streetLine2,
    area,
    city,
    state,
    zipcode,
    website,
  }) => ({
    id,
    collegeName,
    streetLine1,
    streetLine2,
    area,
    city,
    state,
    zipcode,
    website,
  });
  useEffect(() => {
    let tempContactError = [];
    for (let i = 0; i < state.contact.length; i++) {
      tempContactError.push(initialContactError);
    }
    let tempCollege = unwrap(state);
    setCollege(tempCollege);
    setContact(state.contact);
    setContactError(tempContactError);
  }, [state.contact, state]);
  const handleErrorChange = (obj) => {
    setCollegeError((curr) => ({
      ...curr,
      ...obj,
    }));
  };
  const clearError = () => {
    setCollegeError(initialcollegeError);
    contact.forEach((contact, idx) => {
      if (contactError[idx].name.inValid) {
        const list = [...contactError];
        list[idx]["name"]["inValid"] = false;
        list[idx]["name"]["errorMsg"] = "";
        setContactError(list);
      }
      if (contactError[idx].email.inValid) {
        const list = [...contactError];
        list[idx]["email"]["inValid"] = false;
        list[idx]["email"]["errorMsg"] = "";
        setContactError(list);
      }
      if (contactError[idx].contactNumber.inValid) {
        const list = [...contactError];
        list[idx]["contactNumber"]["inValid"] = false;
        list[idx]["contactNumber"]["errorMsg"] = "";
        setContactError(list);
      }
    });
  };
  const validate = () => {
    let flag = true;
    clearError();
    contact.forEach((contact, idx) => {
      if (contact.name === "") {
        const list = [...contactError];

        list[idx]["name"]["inValid"] = true;
        list[idx]["name"]["errorMsg"] = "Please enter name";
        setContactError(list);
        flag = false;
      } else if (/\d/.test(contact.name)) {
        const list = [...contactError];
        list[idx]["name"]["inValid"] = true;
        list[idx]["name"]["errorMsg"] = "Name not contain numbers";
        setContactError(list);
        flag = false;
      }

      if (contact.contactNumber === "") {
        const list = [...contactError];
        list[idx]["contactNumber"]["inValid"] = true;
        list[idx]["contactNumber"]["errorMsg"] = "Please enter contact number";
        setContactError(list);
        flag = false;
      } else if (!/^[6-9]\d{9}$/.test(contact.contactNumber)) {
        const list = [...contactError];
        list[idx]["contactNumber"]["inValid"] = true;
        list[idx]["contactNumber"]["errorMsg"] =
          "Number should be in proper format";
        setContactError(list);
        flag = false;
      }

      if (contact.email === "") {
        const list = [...contactError];
        list[idx]["email"]["inValid"] = true;
        list[idx]["email"]["errorMsg"] = "Please enter email";
        setContactError(list);
        flag = false;
      } else if (
        !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          contact.email
        )
      ) {
        const list = [...contactError];
        list[idx]["email"]["inValid"] = true;
        list[idx]["email"]["errorMsg"] = "Email should be in proper format";
        setContactError(list);
        flag = false;
      }
    });

    if (college.collegeName === "") {
      handleErrorChange({
        collegeName: {
          inValid: true,
          errorMsg: "Please enter college name",
        },
      });
      flag = false;
    }

    if (college.streetLine1 === "") {
      handleErrorChange({
        streetLine1: {
          inValid: true,
          errorMsg: "Please enter street line 1",
        },
      });
      flag = false;
    }

    if (college.area === "") {
      handleErrorChange({
        area: {
          inValid: true,
          errorMsg: "Please enter area",
        },
      });
      flag = false;
    }

    if (college.city === "") {
      handleErrorChange({
        city: {
          inValid: true,
          errorMsg: "Please select city",
        },
      });
      flag = false;
    }

    if (college.state === "") {
      handleErrorChange({
        state: {
          inValid: true,
          errorMsg: "Please select state",
        },
      });
      flag = false;
    }

    if (college.zipcode === "") {
      handleErrorChange({
        zipcode: {
          inValid: true,
          errorMsg: "Please enter zipcode",
        },
      });
      flag = false;
    }
    if (!/^(ftp|http|https):\/\/[^ "]+$/.test(college.website)) {
      handleErrorChange({
        website: {
          inValid: true,
          errorMsg: "Website should be in proper format",
        },
      });
      flag = false;
    }
    return !flag;
  };
  const handleCollegeChange = (e) => {
    let { id, value } = e.target;
    setCollege((curr) => ({
      ...curr,
      [id]: value,
    }));
  };

  const handleAddContact = () => {
    setContact([
      ...contact,
      {
        name: "",
        email: "",
        contactNumber: "",
      },
    ]);
    setContactError([
      ...contactError,
      {
        name: {
          inValid: false,
          errorMsg: "",
        },
        email: {
          inValid: false,
          errorMsg: "",
        },
        contactNumber: {
          inValid: false,
          errorMsg: "",
        },
      },
    ]);
  };
  const handleContactChange = (e, index) => {
    const { id, value } = e.target;
    const list = [...contact];
    list[index][id] = value;
    setContact(list);
  };
  const handleRemoveContact = (index) => {
    setContact((curr) => curr.filter((contact, idx) => idx !== index));
  };

  const handleCollege = async (e) => {
    e.preventDefault();
    let isValid = validate();
    if (!isValid) {
      const { status, message } = await axios.put(`/college/${state.id}`, {
        ...college,
        contact,
      });
      if (status) {
        toast.success(message);
        History.push("/admin/colleges");
      }
    }
  };

  return (
    <div className="content">
      <div className="text-right">
        <Link to="/admin/colleges" className="btn bg-primary">
          Company List
        </Link>
      </div>
      <Nav tabs>
        <NavItem>
          <NavLink className={classnames({ active: true })}>College</NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab="1">
        <TabPane tabId="1">
          <Card>
            <form>
              <CardHeader>
                <CardTitle tag="h6"> COLLEGE DETAILS</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="form-row">
                  <FormGroup className="col-md-4">
                    <Label for="collegeName">
                      College Name<span className="mandatory">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="collegeName"
                      onChange={handleCollegeChange}
                      value={college.collegeName}
                      invalid={collegeError.collegeName.inValid}
                      maxlength="40"
                    />
                    <FormFeedback>
                      {collegeError.collegeName.errorMsg}
                    </FormFeedback>
                  </FormGroup>
                  <FormGroup className="col-md-4">
                    <Label for="streetLine1">
                      Street Line 1<span className="mandatory">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="streetLine1"
                      onChange={handleCollegeChange}
                      value={college.streetLine1}
                      invalid={collegeError.streetLine1.inValid}
                      maxlength="40"
                    />
                    <FormFeedback>
                      {collegeError.streetLine1.errorMsg}
                    </FormFeedback>
                  </FormGroup>
                  <FormGroup className="col-md-4">
                    <Label for="streetLine2">Street Line 2</Label>
                    <Input
                      type="text"
                      id="streetLine2"
                      onChange={handleCollegeChange}
                      value={college.streetLine2}
                      invalid={collegeError.streetLine2.inValid}
                      maxlength="40"
                    />
                    <FormFeedback>
                      {collegeError.streetLine2.errorMsg}
                    </FormFeedback>
                  </FormGroup>
                </div>
                <div className="form-row">
                  <FormGroup className="col-md-4">
                    <Label for="area">
                      Area<span className="mandatory">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="area"
                      onChange={handleCollegeChange}
                      value={college.area}
                      invalid={collegeError.area.inValid}
                      maxlength="20"
                    />
                    <FormFeedback>{collegeError.area.errorMsg}</FormFeedback>
                  </FormGroup>
                  <FormGroup className="col-md-4">
                    <Label for="city">
                      City<span className="mandatory">*</span>
                    </Label>
                    <CustomInput
                      type="select"
                      id="city"
                      name="city"
                      onChange={handleCollegeChange}
                      value={college.city}
                      invalid={collegeError.city.inValid}
                    >
                      <option value="">Select city</option>
                      <option value="surat">surat</option>
                      <option value="vapi">vapi</option>
                    </CustomInput>
                    <FormFeedback>{collegeError.city.errorMsg}</FormFeedback>
                  </FormGroup>
                  <FormGroup className="col-md-4">
                    <Label for="state">
                      State<span className="mandatory">*</span>
                    </Label>
                    <CustomInput
                      type="select"
                      id="state"
                      name="state"
                      onChange={handleCollegeChange}
                      value={college.state}
                      invalid={collegeError.state.inValid}
                    >
                      <option value="">Select state</option>
                      <option value="gujarat">gujarat</option>
                      <option value="delhi">delhi</option>
                    </CustomInput>
                    <FormFeedback>{collegeError.state.errorMsg}</FormFeedback>
                  </FormGroup>
                </div>
                <div className="form-row">
                  <FormGroup className="col-md-4">
                    <Label for="zipcode">
                      Zipcode<span className="mandatory">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="zipcode"
                      onChange={handleCollegeChange}
                      value={college.zipcode}
                      invalid={collegeError.zipcode.inValid}
                      maxlength="7"
                    />
                    <FormFeedback>{collegeError.zipcode.errorMsg}</FormFeedback>
                  </FormGroup>
                  <FormGroup className="col-md-4">
                    <Label for="website">
                      Website<span className="mandatory">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="website"
                      onChange={handleCollegeChange}
                      value={college.website}
                      invalid={collegeError.website.inValid}
                      maxlength="45"
                    />
                    <FormFeedback>{collegeError.website.errorMsg}</FormFeedback>
                  </FormGroup>
                </div>
                <br />
                <CardHeader className="p-0">
                  <Row>
                    <Col xs="3">
                      <CardTitle tag="h6"> CONTACT</CardTitle>
                    </Col>
                    <Col xs="9" className="text-right">
                      <Button
                        color="dark"
                        className="m-0"
                        onClick={handleAddContact}
                      >
                        <i className="fa fa-plus mr-2" aria-hidden="true"></i>
                        Add contact
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                {contact.map((contact, contactIdx) => (
                  <div key={contactIdx}>
                    <FormGroup>
                      <Button
                        close
                        onClick={() => handleRemoveContact(contactIdx)}
                        className="col-md-2 m-3"
                      />
                    </FormGroup>
                    <div className="form-row">
                      <FormGroup className="col-md-4">
                        <Label for="email">
                          Name<span className="mandatory">*</span>
                        </Label>
                        <Input
                          type="text"
                          id="name"
                          value={contact.name}
                          onChange={(e) => handleContactChange(e, contactIdx)}
                          invalid={contactError[contactIdx]["name"].inValid}
                          maxlength="30"
                        />
                        <FormFeedback>
                          {contactError[contactIdx]["name"].errorMsg}
                        </FormFeedback>
                      </FormGroup>
                      <FormGroup className="col-md-4">
                        <Label for="email">
                          Email<span className="mandatory">*</span>
                        </Label>
                        <Input
                          type="text"
                          id="email"
                          value={contact.email}
                          onChange={(e) => handleContactChange(e, contactIdx)}
                          invalid={contactError[contactIdx]["email"].inValid}
                          maxlength="45"
                        />
                        <FormFeedback>
                          {contactError[contactIdx]["email"].errorMsg}
                        </FormFeedback>
                      </FormGroup>
                      <FormGroup className="col-md-4">
                        <Label for="contactNumber">
                          Contact number<span className="mandatory">*</span>
                        </Label>
                        <Input
                          type="text"
                          id="contactNumber"
                          value={contact.contactNumber}
                          onChange={(e) => handleContactChange(e, contactIdx)}
                          invalid={
                            contactError[contactIdx]["contactNumber"].inValid
                          }
                          maxlength="10"
                        />
                        <FormFeedback>
                          {contactError[contactIdx]["contactNumber"].errorMsg}
                        </FormFeedback>
                      </FormGroup>
                    </div>
                    <hr />
                  </div>
                ))}
                <FormGroup className="col-md-12 text-right">
                  <Button
                    color="primary"
                    className="m-0"
                    onClick={handleCollege}
                  >
                    Save
                  </Button>
                </FormGroup>
              </CardBody>
            </form>
          </Card>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default AddCompany;
