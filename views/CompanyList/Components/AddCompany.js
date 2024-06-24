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
import axios from "../../../axios/Axios";
import { Link } from "react-router-dom";
const initialState = {
  name: {
    inValid: false,
    errorMsg: "",
  },
  noOfEmployees: {
    inValid: false,
    errorMsg: "",
  },
  technologies: {
    inValid: false,
    errorMsg: "",
  },
  website: {
    inValid: false,
    errorMsg: "",
  },
  contactNumber: {
    inValid: false,
    errorMsg: "",
  },
  contactEmail: {
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
  postalCode: {
    inValid: false,
    errorMsg: "",
  },
  state: {
    inValid: false,
    errorMsg: "",
  },
  country: {
    inValid: false,
    errorMsg: "",
  },
  appraisalCycle: {
    inValid: false,
    errorMsg: "",
  },
  noticePeriod: {
    inValid: false,
    errorMsg: "",
  },
  bondDurationForExperienced: {
    inValid: false,
    errorMsg: "",
  },
  bondDurationForFreshers: {
    inValid: false,
    errorMsg: "",
  },
  weekends: {
    inValid: false,
    errorMsg: "",
  },
  notes: {
    inValid: false,
    errorMsg: "",
  },
};
const initialFormState = {
  name: "",
  noOfEmployees: "",
  technologies: "",
  website: "",
  contactNumber: "",
  contactEmail: "",
  streetLine1: "",
  streetLine2: "",
  area: "",
  city: "",
  postalCode: "",
  state: "",
  country: "",
  appraisalCycle: "",
  noticePeriod: null,
  bondDurationForExperienced: null,
  bondDurationForFreshers: null,
  weekends: "",
  notes: "",
};
const AddCompany = () => {
  const [form, setForm] = useState(initialFormState);

  const [error, setError] = useState(initialState);

  const handleChange = (e) => {
    let { id, value } = e.target;
    setForm((curr) => ({
      ...curr,
      [id]: value,
    }));
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
    if (form.name === "") {
      handleErrorChange({
        name: { inValid: true, errorMsg: "Please enter name" },
      });
      flag = false;
    }
    if (form.noOfEmployees === "") {
      handleErrorChange({
        noOfEmployees: {
          inValid: true,
          errorMsg: "Select the number of employee",
        },
      });
      flag = false;
    }

    if (form.technologies === "") {
      handleErrorChange({
        technologies: {
          inValid: true,
          errorMsg: "Select the technologies",
        },
      });
      flag = false;
    }

    if (!/^(ftp|http|https):\/\/[^ "]+$/.test(form.website)) {
      handleErrorChange({
        website: {
          inValid: true,
          errorMsg: "Website should be in proper format",
        },
      });
      flag = false;
    }

    if (!/^[6-9]\d{9}$/.test(form.contactNumber)) {
      handleErrorChange({
        contactNumber: {
          inValid: true,
          errorMsg: "Contact should be in proper format",
        },
      });
      flag = false;
    }

    if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        form.contactEmail
      )
    ) {
      handleErrorChange({
        contactEmail: {
          inValid: true,
          errorMsg: "Email should be in proper format",
        },
      });
      flag = false;
    }

    if (form.city === "") {
      handleErrorChange({
        city: {
          inValid: true,
          errorMsg: "Select city",
        },
      });
      flag = false;
    }

    if (form.state === "") {
      handleErrorChange({
        state: {
          inValid: true,
          errorMsg: "Select state",
        },
      });
      flag = false;
    }

    if (form.country === "") {
      handleErrorChange({
        country: {
          inValid: true,
          errorMsg: "Select country",
        },
      });
      flag = false;
    }

    if (!/(^\d{6}$)/.test(form.postalCode)) {
      handleErrorChange({
        postalCode: {
          inValid: true,
          errorMsg: "Zipcode should br proper",
        },
      });
      flag = false;
    }

    if (form.noticePeriod && !Number(form.noticePeriod)) {
      handleErrorChange({
        noticePeriod: {
          inValid: true,
          errorMsg: "Notice Period do not contain characters",
        },
      });
      flag = false;
    }

    if (form.bondDurationForExperienced) {
      if (!Number(form.bondDurationForExperienced)) {
        handleErrorChange({
          bondDurationForExperienced: {
            inValid: true,
            errorMsg: "Bond Duration For Experienced do not contain characters",
          },
        });
        flag = false;
      }
    }

    if (form.bondDurationForFreshers) {
      if (!Number(form.bondDurationForFreshers)) {
        handleErrorChange({
          bondDurationForFreshers: {
            inValid: true,
            errorMsg: "BondDuration For Experienced do not contain characters",
          },
        });
        flag = false;
      }
    }

    return !flag;
  };

  const handleContact = async (e) => {
    e.preventDefault();
    let isValid = validate();
    if (!isValid) {
      try {
        const res = await axios.post("/company", form);
        if (res.status) {
          setForm(initialFormState);
        }
      } catch (err) {}
    }
  };

  return (
    <div className="content">
      <div className="text-right">
        <Link to="/admin/company" className="btn bg-primary">
          Company List
        </Link>
      </div>
      <Card>
        <CardBody>
          <form onSubmit={handleContact}>
            <div className="form-row">
              <FormGroup className="col-md-4">
                <Label for="name">
                  Name<span className="mandatory">*</span>
                </Label>
                <Input
                  type="text"
                  id="name"
                  value={form.name}
                  invalid={error.name.inValid}
                  onChange={handleChange}
                  maxlength="20"
                />
                <FormFeedback>{error.name.errorMsg}</FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="noOfEmployees">
                  Number Of Employees<span className="mandatory">*</span>
                </Label>
                <CustomInput
                  type="select"
                  id="noOfEmployees"
                  name="numberOfEmployees"
                  onChange={handleChange}
                  invalid={error.noOfEmployees.inValid}
                  value={form.noOfEmployees}
                >
                  <option value="">--number of employee--</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                  <option value={200}>200</option>
                  <option value={300}>300</option>
                  <option value={400}>400</option>
                </CustomInput>
                <FormFeedback>{error.noOfEmployees.errorMsg}</FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="technologies">
                  Technology<span className="mandatory">*</span>
                </Label>
                <CustomInput
                  type="select"
                  id="technologies"
                  name="Technology"
                  onChange={handleChange}
                  invalid={error.technologies.inValid}
                  value={form.technologies}
                >
                  <option value="">Select technology</option>
                  <option>PHP</option>
                  <option>ios</option>
                  <option>ASP.net</option>
                  <option>UI/UX</option>
                </CustomInput>
                <FormFeedback>{error.technologies.errorMsg}</FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="website">
                  Website [ https://www.example.com ]
                  <span className="mandatory">*</span>
                </Label>
                <Input
                  type="text"
                  id="website"
                  value={form.website}
                  onChange={handleChange}
                  invalid={error.website.inValid}
                />
                <FormFeedback>{error.website.errorMsg}</FormFeedback>
              </FormGroup>

              <FormGroup className="col-md-4">
                <Label for="contactNumber">
                  Contact<span className="mandatory">*</span>
                </Label>
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
                <Label for="contactEmail">
                  Email<span className="mandatory">*</span>
                </Label>
                <Input
                  type="email"
                  id="contactEmail"
                  value={form.contactEmail}
                  invalid={error.contactEmail.inValid}
                  onChange={handleChange}
                />
                <FormFeedback>{error.contactEmail.errorMsg}</FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="streetLine1">Street Line 1</Label>
                <Input
                  type="text"
                  id="streetLine1"
                  value={form.streetLine1}
                  onChange={handleChange}
                  invalid={error.streetLine1.inValid}
                  maxlength="30"
                />
                <FormFeedback>{error.streetLine1.errorMsg}</FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="streetLine2">Street Line 2</Label>
                <Input
                  type="text"
                  id="streetLine2"
                  value={form.streetLine2}
                  onChange={handleChange}
                  invalid={error.streetLine2.inValid}
                  maxlength="30"
                />
                <FormFeedback>{error.streetLine2.errorMsg}</FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="area">Area</Label>
                <Input
                  type="text"
                  id="area"
                  value={form.area}
                  onChange={handleChange}
                  invalid={error.area.inValid}
                  maxlength="15"
                />
                <FormFeedback>{error.area.errorMsg}</FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="city">
                  City<span className="mandatory">*</span>
                </Label>
                <CustomInput
                  type="select"
                  id="city"
                  name="city"
                  onChange={handleChange}
                  value={form.city}
                  invalid={error.city.inValid}
                >
                  <option value="">Select city</option>
                  <option>Surat</option>
                  <option>Ahemdabad</option>
                  <option>Rajkot</option>
                  <option>Gandhinagar</option>
                </CustomInput>
                <FormFeedback>{error.city.errorMsg}</FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="postalCode">
                  Zipcode<span className="mandatory">*</span>
                </Label>
                <Input
                  type="text"
                  id="postalCode"
                  value={form.postalCode}
                  onChange={handleChange}
                  invalid={error.postalCode.inValid}
                  maxlength="6"
                />
                <FormFeedback>{error.postalCode.errorMsg}</FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="city">
                  State<span className="mandatory">*</span>
                </Label>
                <CustomInput
                  type="select"
                  id="state"
                  name="state"
                  onChange={handleChange}
                  value={form.state}
                  invalid={error.state.inValid}
                >
                  <option value="">Select state</option>
                  <option>Gujarat</option>
                  <option>Maharastra</option>
                </CustomInput>
                <FormFeedback>{error.state.errorMsg}</FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="city">
                  Country<span className="mandatory">*</span>
                </Label>
                <CustomInput
                  type="select"
                  id="country"
                  name="country"
                  onChange={handleChange}
                  value={form.country}
                  invalid={error.country.inValid}
                >
                  <option value="">Select country</option>
                  <option>India</option>
                  <option>Dubai</option>
                </CustomInput>
                <FormFeedback>{error.country.errorMsg}</FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="appraisalCycle">Appraisal Cycle</Label>
                <CustomInput
                  type="select"
                  id="appraisalCycle"
                  name="appraisalCycle"
                  onChange={handleChange}
                  value={form.appraisalCycle}
                  invalid={error.appraisalCycle.inValid}
                >
                  <option value="">Select appraisal cycle</option>
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="Octomber">Octomber</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </CustomInput>
                <FormFeedback>{error.appraisalCycle.errorMsg}</FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="noticePeriod">Notice Period</Label>
                <Input
                  type="text"
                  id="noticePeriod"
                  value={form.noticePeriod}
                  onChange={handleChange}
                  invalid={error.noticePeriod.inValid}
                />
                <FormFeedback>{error.noticePeriod.errorMsg}</FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="bondDurationForExperienced">
                  Bond Duration Experienced
                </Label>
                <Input
                  type="text"
                  id="bondDurationForExperienced"
                  value={form.bondDurationForExperienced}
                  onChange={handleChange}
                  invalid={error.bondDurationForExperienced.inValid}
                />
                <FormFeedback>
                  {error.bondDurationForExperienced.errorMsg}
                </FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="bondDurationForFreshers">
                  Bond Duration Freshers
                </Label>
                <Input
                  type="text"
                  id="bondDurationForFreshers"
                  value={form.bondDurationForFreshers}
                  onChange={handleChange}
                  invalid={error.bondDurationForFreshers.inValid}
                />
                <FormFeedback>
                  {error.bondDurationForFreshers.errorMsg}
                </FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="weekends">Weekends</Label>
                <CustomInput
                  type="select"
                  id="weekends"
                  name="weekends"
                  onChange={handleChange}
                  value={form.weekends}
                  invalid={error.weekends.inValid}
                >
                  <option value="">Select weekends</option>
                  <option>six working days</option>
                  <option>first and third saturday</option>
                  <option>five working days</option>
                  <option>second and fourth saturday</option>
                  <option>1st,3rd,5th saturday</option>
                  <option>2nd,3rd,4th saturday off</option>
                </CustomInput>
                <FormFeedback>{error.weekends.errorMsg}</FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-12">
                <Label for="notes">Note</Label>
                <Input
                  type="textarea"
                  id="notes"
                  value={form.notes}
                  onChange={handleChange}
                  invalid={error.notes.inValid}
                  maxlength="40"
                />
                <FormFeedback>{error.notes.errorMsg}</FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-12 text-right">
                <Button color="primary" className="m-0">
                  Save
                </Button>
              </FormGroup>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddCompany;
