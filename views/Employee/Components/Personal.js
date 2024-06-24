import React, { useState } from "react";
import { FormGroup, Label, Input, Button, CustomInput } from "reactstrap";
import { Card, CardHeader, CardBody, CardTitle } from "reactstrap";

const Personal = () => {
  const [personalForm, setPersonalForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    maritalStatus: "",
    bloodGroup: "",
    employeeId: "",
    password: "",
  });
  const [documentForm, setDocumentForm] = useState({
    adharCard: "",
    panCard: "",
    bankName: "",
    bankAccountNumber: "",
    passPort: "",
    passportExpiry: "",
  });

  const validate = (form) => {
    let values = Object.values(form).some((prop) => prop === "");
    return values;
  };

  const handleChange = (e) => {
    let { id, value } = e.target;
    setPersonalForm((curr) => ({
      ...curr,
      [id]: value,
    }));
  };

  const handleDocumentChange = (e) => {
    let { id, value } = e.target;
    setDocumentForm((curr) => ({
      ...curr,
      [id]: value,
    }));
  };

  const handleDocumentFileChange = (e) => {
    let { id, files } = e.target;
    setDocumentForm((curr) => ({
      ...curr,
      [id]: files[0],
    }));
  };
  const handlePersonal = (e) => {
    e.preventDefault();
    let isValid = validate(personalForm);
    if (!isValid) {
    } else {
      alert("Please enter all fields");
    }
  };

  const handleDocument = (e) => {
    e.preventDefault();

    let isValid = validate(documentForm);
    if (!isValid) {
    } else {
      alert("Please enter all fields");
    }
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
                <Label for="FirstName">First Name</Label>
                <Input
                  type="text"
                  id="firstName"
                  placeholder="First Name"
                  value={personalForm.firstName}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="middleName">Middle Name</Label>
                <Input
                  type="text"
                  id="middleName"
                  placeholder="Middle Name"
                  value={personalForm.middleName}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="lastName">Last Name</Label>
                <Input
                  type="text"
                  id="lastName"
                  placeholder="Last Name"
                  value={personalForm.lastName}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="dateOfBirth">Date of Birth</Label>
                <Input
                  type="date"
                  id="dateOfBirth"
                  value={personalForm.dateOfBirth}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup className="col-md-2" check>
                <Label>Gender</Label>
                <br />
                <Label check>
                  <Input
                    id="gender"
                    type="radio"
                    name="Gender"
                    value="Male"
                    onChange={handleChange}
                  />
                  Male
                </Label>
                <Label check>
                  <Input
                    id="gender"
                    type="radio"
                    name="Gender"
                    value="Female"
                    onChange={handleChange}
                  />
                  Female
                </Label>
              </FormGroup>
              <FormGroup className="col-md-2" check>
                <Label>Marital Status</Label>
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
              </FormGroup>

              <FormGroup className="col-md-4">
                <Label for="referedBy">Blood Group</Label>
                <Input
                  type="text"
                  id="bloodGroup"
                  placeholder="Refered By"
                  value={personalForm.bloodGroup}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="employeeId">Employee Id</Label>
                <Input
                  type="text"
                  id="employeeId"
                  placeholder="Refered By"
                  value={personalForm.employeeId}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="referedBy">Password</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={personalForm.password}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup className="col-md-4">
                <Button color="primary" className="m-0 mt-4">
                  Add
                </Button>
              </FormGroup>
            </div>
          </CardBody>
        </form>
        <form onSubmit={handleDocument}>
          <CardHeader>
            <CardTitle tag="h6"> DOCUMENT</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="form-row">
              <FormGroup className="col-md-4">
                <Label for="dob">Adharcard</Label>
                <Input
                  type="file"
                  id="adharCard"
                  onChange={handleDocumentFileChange}
                />
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="dob">Pancard</Label>
                <Input
                  type="file"
                  id="panCard"
                  onChange={handleDocumentFileChange}
                />
              </FormGroup>
              <FormGroup className="col-md-3">
                <Label for="bankName">Bank Name</Label>
                <CustomInput
                  type="select"
                  id="bankName"
                  name="PassingYear"
                  onChange={handleDocumentChange}
                >
                  <option value="">Select</option>
                  <option>2015</option>
                  <option>2016</option>
                  <option>2017</option>
                  <option>2018</option>
                  <option>2019</option>
                </CustomInput>
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="bankAccountNumber">Bank Account Number</Label>
                <Input
                  placeholder="Bank Account Number"
                  type="text"
                  id="bankAccountNumber"
                  value={documentForm.bankAccountNumber}
                  onChange={handleDocumentChange}
                />
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="dob">Passport Number</Label>
                <Input
                  type="file"
                  id="passPort"
                  onChange={handleDocumentFileChange}
                />
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="dob">Passport Expiry</Label>
                <Input
                  type="file"
                  id="passportExpiry"
                  onChange={handleDocumentFileChange}
                />
              </FormGroup>
              <FormGroup className="col-md-4">
                <Button color="primary" className="m-0">
                  Add
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
