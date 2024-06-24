import moment from "moment";
import React, { useState, useEffect } from "react";
import { FormGroup, Label, Input, Button } from "reactstrap";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormFeedback,
} from "reactstrap";

const initialState = {
  firstName: {
    inValid: false,
    errorMsg: "",
  },
  middleName: {
    inValid: false,
    errorMsg: "",
  },
  lastName: {
    inValid: false,
    errorMsg: "",
  },
  dateOfBirth: {
    inValid: false,
    errorMsg: "",
  },
  gender: {
    inValid: false,
    errorMsg: "",
  },
  maritalStatus: {
    inValid: false,
    errorMsg: "",
  },
  candidateImage: {
    inValid: false,
    errorMsg: "",
  },
  referedBy: {
    inValid: false,
    errorMsg: "",
  },
  spouseName: {
    inValid: false,
    errorMsg: "",
  },
};

const initialContactErrorState = {
  contactNumber: {
    inValid: false,
    errorMsg: "",
  },
  alternateContactNumber: {
    inValid: false,
    errorMsg: "",
  },
  email: {
    inValid: false,
    errorMsg: "",
  },
  skype: {
    inValid: false,
    errorMsg: "",
  },
  linkedIn: {
    inValid: false,
    errorMsg: "",
  },
};
const Personal = ({ handleActiveTab, handleSetData, setSuccess, success }) => {
  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    maritalStatus: "",
    candidateImage: "",
    referedBy: "",
    spouseName: "",
    wishlist: false,
    isActive: false,
  });
  const [contactForm, setContactForm] = useState({
    contactNumber: "",
    alternateContactNumber: "",
    email: "",
    skype: "",
    linkedIn: "",
  });

  const [genderError, setGenderError] = useState({
    inValid: false,
    errorMsg: "",
  });
  const [maritalStatusError, setMaritalStatusError] = useState({
    inValid: false,
    errorMsg: "",
  });

  const [error, setError] = useState(initialState);
  const [contactError, setContactError] = useState(initialContactErrorState);
  const [isMarried, setIsMarried] = useState(false);
  useEffect(() => {
    if (success) {
      setForm({
        firstName: "",
        middleName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "",
        maritalStatus: "",
        candidateImage: "",
        referedBy: "",
        spouseName: "",
        wishlist: false,
        isActive: false,
      });
      setError(initialState);
      setContactForm({
        contactNumber: "",
        alternateContactNumber: "",
        email: "",
        skype: "",
        linkedIn: "",
      });
      setContactError(initialContactErrorState);
      setSuccess(false);
    }
  }, [success]);

  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      let { id, checked } = e.target;
      setForm((curr) => ({
        ...curr,
        [id]: checked,
      }));
    } else {
      let { id, value } = e.target;
      setForm((curr) => ({
        ...curr,
        [id]: value,
      }));
    }

    if (e.target.type === "radio") {
      let { value } = e.target;
      if (value === "Married") {
        setIsMarried(true);
      } else if (value === "Single") {
        setForm((curr) => ({
          ...curr,
          ["spouseName"]: "",
        }));
        setIsMarried(false);
      }
    }
  };
  const handleContactChange = (e) => {
    let { id, value } = e.target;
    setContactForm((curr) => ({
      ...curr,
      [id]: value,
    }));
  };
  const handlePersonal = (e) => {
    e.preventDefault();
    let isValid = validate();
    if (!isValid) {
      handleSetData({ ...form, ...contactForm });
      handleActiveTab("2");
    }
  };
  const handleErrorChange = (obj) => {
    setError((curr) => ({
      ...curr,
      ...obj,
    }));
  };

  const handleContactErrorChange = (obj) => {
    setContactError((curr) => ({
      ...curr,
      ...obj,
    }));
  };
  const validate = () => {
    let flag = true;
    setError(initialState);
    setContactError(initialContactErrorState);
    setGenderError({
      inValid: false,
      errorMsg: "",
    });
    setMaritalStatusError({
      inValid: false,
      errorMsg: "",
    });
    if (/\d/.test(form.firstName)) {
      handleErrorChange({
        firstName: {
          inValid: true,
          errorMsg: "First name not contain numbers",
        },
      });
      flag = false;
    } else if (form.firstName.length < 3) {
      handleErrorChange({
        firstName: {
          inValid: true,
          errorMsg: "First name should be more than 3 characters",
        },
      });
      flag = false;
    } else if (form.firstName.includes(" ")) {
      handleErrorChange({
        firstName: {
          inValid: true,
          errorMsg: "First name do not contain space",
        },
      });
      flag = false;
    }

    if (form.spouseName) {
      if (/\d/.test(form.spouseName)) {
        handleErrorChange({
          spouseName: {
            inValid: true,
            errorMsg: "Spouse name do not contain numbers",
          },
        });
        flag = false;
      } else if (form.spouseName.length < 3) {
        handleErrorChange({
          spouseName: {
            inValid: true,
            errorMsg: "Spouse name should be more than 3 characters",
          },
        });
        flag = false;
      }
    }

    if (form.middleName) {
      if (/\d/.test(form.middleName)) {
        handleErrorChange({
          middleName: {
            inValid: true,
            errorMsg: "Middle name do not contain numbers",
          },
        });
        flag = false;
      } else if (form.middleName.length < 3) {
        handleErrorChange({
          middleName: {
            inValid: true,
            errorMsg: "Middle name should be more than 3 characters",
          },
        });
        flag = false;
      } else if (form.middleName.includes(" ")) {
        handleErrorChange({
          middleName: {
            inValid: true,
            errorMsg: "Middle name do not contain space",
          },
        });
        flag = false;
      }
    }

    if (/\d/.test(form.lastName)) {
      handleErrorChange({
        lastName: { inValid: true, errorMsg: "Last name not contain numbers" },
      });
      flag = false;
    } else if (form.lastName.length < 3) {
      handleErrorChange({
        lastName: {
          inValid: true,
          errorMsg: "Last name should be more than 3 characters",
        },
      });
      flag = false;
    } else if (form.lastName.includes(" ")) {
      handleErrorChange({
        lastName: {
          inValid: true,
          errorMsg: "Last name do not contain space",
        },
      });
      flag = false;
    }

    if (form.dateOfBirth === "") {
      handleErrorChange({
        dateOfBirth: {
          inValid: true,
          errorMsg: "Select the date.",
        },
      });
      flag = false;
    } else if (form.dateOfBirth > moment().format("YYYY-MM-DD")) {
      handleErrorChange({
        dateOfBirth: {
          inValid: true,
          errorMsg: "Please select valid date.",
        },
      });
      flag = false;
    }

    if (form.gender === "") {
      setGenderError({ inValid: true, errorMsg: "Please select gender" });

      flag = false;
    }

    if (form.maritalStatus === "") {
      setMaritalStatusError({
        inValid: true,
        errorMsg: "Please select marital status",
      });
      flag = false;
    }

    if (form.candidateImage) {
      if (!form.candidateImage.name.match(/\.(jpg|jpeg|png|gif)$/)) {
        handleErrorChange({
          candidateImage: {
            inValid: true,
            errorMsg: "Please select valid image",
          },
        });
        flag = false;
      }
    }

    if (form.referedBy) {
      if (/\d/.test(form.referedBy)) {
        handleErrorChange({
          referedBy: {
            inValid: true,
            errorMsg: "Refered by do not contain numbers",
          },
        });
        flag = false;
      } else if (form.referedBy.length < 3) {
        handleErrorChange({
          referedBy: {
            inValid: true,
            errorMsg: "Refered by should be more than 3 characters",
          },
        });
        flag = false;
      }
    }

    if (contactForm.contactNumber === "") {
      handleContactErrorChange({
        contactNumber: {
          inValid: true,
          errorMsg: "Please enter contact number.",
        },
      });
      flag = false;
    } else if (!/^[6-9]\d{9}$/.test(contactForm.contactNumber)) {
      handleContactErrorChange({
        contactNumber: {
          inValid: true,
          errorMsg: "Contact should be in proper format.",
        },
      });
      flag = false;
    }
    if (contactForm.alternateContactNumber) {
      if (!/^[6-9]\d{9}$/.test(contactForm.alternateContactNumber)) {
        handleContactErrorChange({
          alternateContactNumber: {
            inValid: true,
            errorMsg: "Alternative contact should be in proper format.",
          },
        });
        flag = false;
      }
    }
    if (contactForm.email === "") {
      handleContactErrorChange({
        email: {
          inValid: true,
          errorMsg: "Please enter email.",
        },
      });
      flag = false;
    } else if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        contactForm.email
      )
    ) {
      handleContactErrorChange({
        email: {
          inValid: true,
          errorMsg: "Email should be in proper format.",
        },
      });
      flag = false;
    }

    if (contactForm.skype) {
      if (contactForm.skype.length < 6) {
        handleContactErrorChange({
          skype: {
            inValid: true,
            errorMsg: "Skype id should be more than 6 characters",
          },
        });
        flag = false;
      }
    }

    if (contactForm.linkedIn) {
      if (contactForm.linkedIn.length < 6) {
        handleContactErrorChange({
          linkedIn: {
            inValid: true,
            errorMsg: "Linked in should be more than 6 characters",
          },
        });
        flag = false;
      }
    }
    return !flag;
  };

  return (
    <>
      <Card>
        <form onSubmit={handlePersonal}>
          <CardHeader>
            <CardTitle tag="h6"> PERSONAL DETAILS</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="form-row">
              <FormGroup className="col-md-4">
                <Label for="FirstName">
                  First Name<span className="mandatory">*</span>
                </Label>
                <Input
                  type="text"
                  id="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  invalid={error.firstName.inValid}
                  maxlength="10"
                />
                <FormFeedback>{error.firstName.errorMsg}</FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="middleName">Middle Name</Label>
                <Input
                  type="text"
                  id="middleName"
                  value={form.middleName}
                  onChange={handleChange}
                  invalid={error.middleName.inValid}
                  maxlength="10"
                />
                <FormFeedback>{error.middleName.errorMsg}</FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="lastName">
                  Last Name<span className="mandatory">*</span>
                </Label>
                <Input
                  type="text"
                  id="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  invalid={error.lastName.inValid}
                  maxlength="10"
                />
                <FormFeedback>{error.lastName.errorMsg}</FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="dateOfBirth">
                  Date of Birth<span className="mandatory">*</span>
                </Label>
                <Input
                  type="date"
                  id="dateOfBirth"
                  value={form.dateOfBirth}
                  // max={moment().subtract(18, "years").format("YYYY-MM-DD")}
                  max={moment().format("YYYY-MM-DD")}
                  min={moment().subtract(100, "years").format("YYYY-MM-DD")}
                  onChange={handleChange}
                  invalid={error.dateOfBirth.inValid}
                />
                <FormFeedback>{error.dateOfBirth.errorMsg}</FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-2" check>
                <Label>
                  Gender<span className="mandatory">*</span>
                </Label>
                <br />
                <Label check>
                  <Input
                    id="gender"
                    type="radio"
                    name="Gender"
                    value="M"
                    onChange={handleChange}
                  />
                  Male
                </Label>
                <Label check>
                  <Input
                    id="gender"
                    type="radio"
                    name="Gender"
                    value="F"
                    onChange={handleChange}
                  />
                  Female
                </Label>
                {genderError.inValid && (
                  <Label className="text-danger">{genderError.errorMsg}</Label>
                )}
              </FormGroup>
              <FormGroup className="col-md-2" check>
                <Label>
                  Marital Status<span className="mandatory">*</span>
                </Label>
                <br />
                <Label check>
                  <Input
                    id="maritalStatus"
                    type="radio"
                    name="MaritalStatus"
                    value="Single"
                    onChange={handleChange}
                  />
                  Single
                </Label>
                <Label check>
                  <Input
                    id="maritalStatus"
                    type="radio"
                    name="MaritalStatus"
                    value="Married"
                    onChange={handleChange}
                  />
                  Married
                </Label>
                {maritalStatusError.inValid && (
                  <Label className="text-danger">
                    {maritalStatusError.errorMsg}
                  </Label>
                )}
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="dob">Candidate Image</Label>
                <Input
                  type="file"
                  id="dob"
                  onChange={(e) =>
                    setForm({ ...form, candidateImage: e.target.files[0] })
                  }
                  invalid={error.candidateImage.inValid}
                />
                <FormFeedback>{error.candidateImage.errorMsg}</FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="referedBy">Refered By</Label>
                <Input
                  type="text"
                  id="referedBy"
                  value={form.referedBy}
                  onChange={handleChange}
                  invalid={error.referedBy.inValid}
                  maxlength="12"
                />
                <FormFeedback>{error.referedBy.errorMsg}</FormFeedback>
              </FormGroup>
              {isMarried && (
                <FormGroup className="col-md-4">
                  <Label for="spouseName">Spouse Name</Label>
                  <Input
                    type="text"
                    id="spouseName"
                    value={form.spouseName}
                    onChange={handleChange}
                    invalid={error.spouseName.inValid}
                    maxlength="10"
                  />
                  <FormFeedback>{error.spouseName.errorMsg}</FormFeedback>
                </FormGroup>
              )}

              <FormGroup
                className="col-md-2 d-flex justify-content-center align-items-center"
                check
              >
                <Label check>
                  <Input
                    id="wishlist"
                    type="checkbox"
                    value={form.wishlist}
                    checked={form.wishlist}
                    onChange={handleChange}
                  />
                  Wishlist
                  <span className="form-check-sign">
                    <span className="check"></span>
                  </span>
                </Label>
                <FormFeedback>{error.gender.errorMsg}</FormFeedback>
              </FormGroup>
              <FormGroup
                className="col-md-2 d-flex justify-content-center align-items-center"
                check
              >
                <Label check>
                  <Input
                    id="isActive"
                    type="checkbox"
                    value={form.isActive}
                    checked={form.isActive}
                    onChange={handleChange}
                  />
                  Is Active
                  <span className="form-check-sign">
                    <span className="check"></span>
                  </span>
                </Label>
                <FormFeedback>{error.gender.errorMsg}</FormFeedback>
              </FormGroup>
            </div>
          </CardBody>
        </form>

        <form onSubmit={() => {}}>
          <CardHeader>
            <CardTitle tag="h6"> Contact DETAILS</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="form-row">
              <FormGroup className="col-md-4">
                <Label for="contactNumber">
                  Contact Number<span className="mandatory">*</span>
                </Label>
                <Input
                  type="text"
                  id="contactNumber"
                  value={contactForm.contactNumber}
                  onChange={handleContactChange}
                  invalid={contactError.contactNumber.inValid}
                  maxlength="10"
                />
                <FormFeedback>
                  {contactError.contactNumber.errorMsg}
                </FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="alternateContactNumber">
                  Alternate Contact Number
                </Label>
                <Input
                  type="text"
                  id="alternateContactNumber"
                  value={contactForm.alternateContactNumber}
                  onChange={handleContactChange}
                  invalid={contactError.alternateContactNumber.inValid}
                  maxlength="10"
                />
                <FormFeedback>
                  {contactError.alternateContactNumber.errorMsg}
                </FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="email">
                  E-mail<span className="mandatory">*</span>
                </Label>
                <Input
                  type="email"
                  id="email"
                  value={contactForm.email}
                  onChange={handleContactChange}
                  invalid={contactError.email.inValid}
                  maxlength="64"
                />
                <FormFeedback>{contactError.email.errorMsg}</FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="skype">Skype</Label>
                <Input
                  type="text"
                  id="skype"
                  value={contactForm.skype}
                  onChange={handleContactChange}
                  invalid={contactError.skype.inValid}
                />
                <FormFeedback>{contactError.skype.errorMsg}</FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="linkedIn">LinkedIn</Label>
                <Input
                  type="text"
                  id="linkedIn"
                  value={contactForm.linkedIn}
                  onChange={handleContactChange}
                  invalid={contactError.linkedIn.inValid}
                />
                <FormFeedback>{contactError.linkedIn.errorMsg}</FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-12 text-right">
                <Button
                  color="primary"
                  className="m-0"
                  onClick={handlePersonal}
                >
                  Next
                </Button>
              </FormGroup>
            </div>
          </CardBody>
        </form>
      </Card>
    </>
  );
};

export default Personal;
