import React, { useState, useEffect } from "react";
import { FormGroup, Label, Input, Button } from "reactstrap";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormFeedback,
} from "reactstrap";
import moment from "moment";
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

const initPersonal = {
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
  contactNumber: "",
  alternateContactNumber: "",
  email: "",
  skype: "",
  linkedIn: "",
};

const Personal = ({ handleActiveTab, handleSetData, personal, success }) => {
  const [form, setForm] = useState(initPersonal);
  const [isMarried, setIsMarried] = useState(false);
  const [genderError, setGenderError] = useState({
    inValid: false,
    errorMsg: "",
  });

  const [maritalStatusError, setMaritalStatusError] = useState({
    inValid: false,
    errorMsg: "",
  });
  const [error, setError] = useState(initialState);
  useEffect(() => {
    if (personal) {
      setForm(personal);
    }
  }, [personal]);
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
      // setContactForm({
      //   contactNumber: "",
      //   alternateContactNumber: "",
      //   email: "",
      //   skype: "",
      //   linkedIn: "",
      // });
      // setContactError(initialContactErrorState);
    }
  }, [success]);

  useEffect(() => {
    form.maritalStatus === "Married" && setIsMarried(true);
  }, [form.maritalStatus]);

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

  const handlePersonal = (e) => {
    e.preventDefault();
    let isValid = validate();
    if (!isValid) {
      handleSetData({ ...form });
      handleActiveTab("2");
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
          errorMsg: "First Name not contain numbers",
        },
      });
      flag = false;
    } else if (form.firstName.length < 3) {
      handleErrorChange({
        firstName: {
          inValid: true,
          errorMsg: "First Name should be more than 3 characters",
        },
      });
      flag = false;
    } else if (form.firstName.includes(" ")) {
      handleErrorChange({
        firstName: {
          inValid: true,
          errorMsg: "First Name do not contain space",
        },
      });
      flag = false;
    }

    if (form.spouseName) {
      if (/\d/.test(form.spouseName)) {
        handleErrorChange({
          spouseName: {
            inValid: true,
            errorMsg: "Spouse Name do not contain numbers",
          },
        });
        flag = false;
      } else if (form.spouseName.length < 3) {
        handleErrorChange({
          spouseName: {
            inValid: true,
            errorMsg: "Spouse Name should be more than 3 characters",
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
            errorMsg: "Middle Name do not contain numbers",
          },
        });
        flag = false;
      } else if (form.middleName.length < 3) {
        handleErrorChange({
          middleName: {
            inValid: true,
            errorMsg: "Middle Name should be more than 3 characters",
          },
        });
        flag = false;
      } else if (form.middleName.includes(" ")) {
        handleErrorChange({
          middleName: {
            inValid: true,
            errorMsg: "Middle Name do not contain space",
          },
        });
        flag = false;
      }
    }

    if (/\d/.test(form.lastName)) {
      handleErrorChange({
        lastName: { inValid: true, errorMsg: "Last Name not contain numbers" },
      });
      flag = false;
    } else if (form.lastName.length < 3) {
      handleErrorChange({
        lastName: {
          inValid: true,
          errorMsg: "Last Name should be more than 3 characters",
        },
      });
      flag = false;
    } else if (form.lastName.includes(" ")) {
      handleErrorChange({
        lastName: {
          inValid: true,
          errorMsg: "Last Name do not contain space",
        },
      });
      flag = false;
    }

    if (form.dateOfBirth === "") {
      handleErrorChange({
        dateOfBirth: {
          inValid: true,
          errorMsg: "Select the Date.",
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

    if (form.candidateImage !== null) {
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
            errorMsg: "Refered By do not contain numbers",
          },
        });
        flag = false;
      } else if (form.referedBy.length < 3) {
        handleErrorChange({
          referedBy: {
            inValid: true,
            errorMsg: "Refered By should be more than 3 characters",
          },
        });
        flag = false;
      }
    }

    if (form.contactNumber === "") {
      handleErrorChange({
        contactNumber: {
          inValid: true,
          errorMsg: "Please enter contact number.",
        },
      });
      flag = false;
    } else if (!/^[6-9]\d{9}$/.test(form.contactNumber)) {
      handleErrorChange({
        contactNumber: {
          inValid: true,
          errorMsg: "Contact should be in proper format.",
        },
      });
      flag = false;
    }
    if (form.alternateContactNumber) {
      if (!/^[6-9]\d{9}$/.test(form.alternateContactNumber)) {
        handleErrorChange({
          alternateContactNumber: {
            inValid: true,
            errorMsg: "Alternative Contact should be in proper format.",
          },
        });
        flag = false;
      }
    }
    if (form.email === "") {
      handleErrorChange({
        email: {
          inValid: true,
          errorMsg: "Please enter email.",
        },
      });
      flag = false;
    } else if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        form.email
      )
    ) {
      handleErrorChange({
        email: {
          inValid: true,
          errorMsg: "Email should be in proper format.",
        },
      });
      flag = false;
    }

    if (form.skype) {
      if (form.skype.length < 6) {
        handleErrorChange({
          skype: {
            inValid: true,
            errorMsg: "Skype id should be more than 6 characters",
          },
        });
        flag = false;
      }
    }

    if (form.linkedIn) {
      if (form.linkedIn.length < 6) {
        handleErrorChange({
          linkedIn: {
            inValid: true,
            errorMsg: "Linked In should be more than 6 characters",
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
                <Label for="FirstName">First Name*</Label>
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
                <Label for="lastName">Last Name*</Label>
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
                <Label for="dateOfBirth">Date of Birth*</Label>
                <Input
                  type="date"
                  id="dateOfBirth"
                  value={moment(form.dateOfBirth).format("YYYY-MM-DD")}
                  max={moment().subtract(18, "years").format("YYYY-MM-DD")}
                  onChange={handleChange}
                  invalid={error.dateOfBirth.inValid}
                  onkeydown="return false"
                />
                <FormFeedback>{error.dateOfBirth.errorMsg}</FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-2" check>
                <Label>Gender*</Label>
                <br />
                <Label check>
                  <Input
                    id="gender"
                    type="radio"
                    name="Gender"
                    value="M"
                    onChange={handleChange}
                    checked={form.gender === "M"}
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
                    checked={form.gender === "F"}
                  />
                  Female
                </Label>
                {genderError.inValid && (
                  <Label className="text-danger">{genderError.errorMsg}</Label>
                )}
              </FormGroup>
              <FormGroup className="col-md-2" check>
                <Label>Marital Status*</Label>
                <br />
                <Label check>
                  <Input
                    id="maritalStatus"
                    type="radio"
                    name="MaritalStatus"
                    value="Single"
                    onChange={handleChange}
                    checked={form.maritalStatus === "Single"}
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
                    checked={form.maritalStatus === "Married"}
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
                <Label for="contactNumber">Contact Number*</Label>
                <Input
                  type="text"
                  id="contactNumber"
                  value={form.contactNumber}
                  onChange={handleChange}
                  invalid={error.contactNumber.inValid}
                  maxlength="10"
                />
                <FormFeedback>{error.contactNumber.errorMsg}</FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="alternateContactNumber">
                  Alternate Contact Number
                </Label>
                <Input
                  type="text"
                  id="alternateContactNumber"
                  value={form.alternateContactNumber}
                  onChange={handleChange}
                  invalid={error.alternateContactNumber.inValid}
                  maxlength="10"
                />
                <FormFeedback>
                  {error.alternateContactNumber.errorMsg}
                </FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="email">E-mail*</Label>
                <Input
                  type="email"
                  id="email"
                  value={form.email}
                  onChange={handleChange}
                  invalid={error.email.inValid}
                />
                <FormFeedback>{error.email.errorMsg}</FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="skype">Skype</Label>
                <Input
                  type="text"
                  id="skype"
                  value={form.skype}
                  onChange={handleChange}
                  invalid={error.skype.inValid}
                />
                <FormFeedback>{error.skype.errorMsg}</FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="linkedIn">LinkedIn</Label>
                <Input
                  type="text"
                  id="linkedIn"
                  value={form.linkedIn}
                  onChange={handleChange}
                  invalid={error.linkedIn.inValid}
                />
                <FormFeedback>{error.linkedIn.errorMsg}</FormFeedback>
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
