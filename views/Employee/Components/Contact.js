import React, { useState } from "react";
import { FormGroup, Label, Input, Button } from "reactstrap";
import { Card, CardHeader, CardBody, CardTitle } from "reactstrap";
const Contact = () => {
  const [form, setForm] = useState({
    contactNumber: "",
    alternateContactNumber: "",
    companyEmail: "",
    personalEmail: "",
    linkedIn: "",
    skype: "",
  });

  const [emergencyContactForm, setEmergencyContactForm] = useState({
    name: "",
    relationWithEmployee: "",
    contactNumber: "",
  });

  const handleChange = (e) => {
    let { id, value } = e.target;
    setForm((curr) => ({
      ...curr,
      [id]: value,
    }));
  };

  const handleEmergencyContactChange = (e) => {
    let { id, value } = e.target;
    setEmergencyContactForm((curr) => ({
      ...curr,
      [id]: value,
    }));
  };
  const validate = (form) => {
    let values = Object.values(form).some((prop) => prop === "");
    return values;
  };

  const handleContact = (e) => {
    e.preventDefault();
    let isValid = validate(form);
    if (!isValid) {
    } else {
      alert("Please enter all fields");
    }
  };
  const handleEmergenctContact = (e) => {
    e.preventDefault();
    let isValid = validate(emergencyContactForm);
    if (!isValid) {
    } else {
      alert("Please enter all fields");
    }
  };
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle tag="h6">CONTACT DETAILS</CardTitle>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleContact}>
            <div className="form-row">
              <FormGroup className="col-md-4">
                <Label for="contactNumber">Contact Number</Label>
                <Input
                  type="text"
                  id="contactNumber"
                  placeholder="Contact Number"
                  value={form.contactNumber}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="alternateContactNumber">
                  Alternate Contact Number
                </Label>
                <Input
                  type="text"
                  id="alternateContactNumber"
                  placeholder="Alternate Contact Number"
                  value={form.alternateContactNumber}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="companyEmail">Company Email</Label>
                <Input
                  type="email"
                  id="companyEmail"
                  placeholder="Company Email"
                  value={form.companyEmail}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="email">Personal Email</Label>
                <Input
                  type="email"
                  id="personalEmail"
                  placeholder="Personal Email"
                  value={form.personalEmail}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="linkedIn">LinkedIn</Label>
                <Input
                  type="text"
                  id="linkedIn"
                  placeholder="LinkedIn"
                  value={form.linkedIn}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="skype">Skype</Label>
                <Input
                  type="text"
                  id="skype"
                  placeholder="Skype Id"
                  value={form.skype}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup className="col-md-4">
                <Button color="primary" className="m-0">
                  Add
                </Button>
              </FormGroup>
            </div>
          </form>
        </CardBody>
        <CardHeader>
          <CardTitle tag="h6">EMERGENCY CONTACT</CardTitle>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleEmergenctContact}>
            <div className="form-row">
              <FormGroup className="col-md-4">
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Name"
                  value={emergencyContactForm.name}
                  onChange={handleEmergencyContactChange}
                />
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="relationWithEmployee">Relation With Employee</Label>
                <Input
                  type="text"
                  id="relationWithEmployee"
                  placeholder="Relation With Employee"
                  value={emergencyContactForm.relationWithEmployee}
                  onChange={handleEmergencyContactChange}
                />
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="contactNumber">Contact Number</Label>
                <Input
                  type="text"
                  id="contactNumber"
                  placeholder="Contact Number"
                  value={emergencyContactForm.contactNumber}
                  onChange={handleEmergencyContactChange}
                />
              </FormGroup>

              <FormGroup className="col-md-4">
                <Button color="primary" className="m-0">
                  Add
                </Button>
              </FormGroup>
            </div>
          </form>
        </CardBody>
      </Card>
    </>
  );
};

export default Contact;
