import React, { useState } from "react";
import { FormGroup, Label, Input, Button, CustomInput } from "reactstrap";
import { Card, CardHeader, CardBody, CardTitle } from "reactstrap";
const Contact = () => {
  const [presentAddressForm, setPresentAddressForm] = useState({
    streetLine1: "",
    streetLine2: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
  });

  const [permanentAddressForm, setPermenentAddressForm] = useState({
    streetLine1: "",
    streetLine2: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
  });

  const handlePresentFormChange = (e) => {
    let { id, value } = e.target;
    setPresentAddressForm((curr) => ({
      ...curr,
      [id]: value,
    }));
  };

  const handlePermenentFormChange = (e) => {
    let { id, value } = e.target;
    setPermenentAddressForm((curr) => ({
      ...curr,
      [id]: value,
    }));
  };
  const validate = (form) => {
    let values = Object.values(form).some((prop) => prop === "");
    return values;
  };

  const handlePresentForm = (e) => {
    e.preventDefault();
    let isValid = validate(presentAddressForm);
    if (!isValid) {
    } else {
    }
  };
  const handlePermenentForm = (e) => {
    e.preventDefault();
    let isValid = validate(permanentAddressForm);
    if (!isValid) {
    } else {
    }
  };
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle tag="h6">PRESENT ADRDESS</CardTitle>
        </CardHeader>
        <CardBody>
          <form onSubmit={handlePresentForm}>
            <div className="form-row">
              <FormGroup className="col-md-4">
                <Label for="streetLine1">Street Line 1</Label>
                <Input
                  type="textarea"
                  id="streetLine1"
                  placeholder="Street Line 1"
                  value={presentAddressForm.streetLine1}
                  onChange={handlePresentFormChange}
                />
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="streetLine2">Street Line 2</Label>
                <Input
                  type="textarea"
                  id="streetLine2"
                  placeholder="Street Line 1"
                  value={presentAddressForm.streetLine2}
                  onChange={handlePresentFormChange}
                />
              </FormGroup>
              <FormGroup className="col-md-3">
                <Label for="city">City</Label>
                <CustomInput
                  type="select"
                  id="city"
                  name="city"
                  onChange={handlePresentFormChange}
                >
                  <option value="">Select</option>
                  <option>Surat</option>
                  <option>Ahemdabad</option>
                  <option>Rajkot</option>
                </CustomInput>
              </FormGroup>
              <FormGroup className="col-md-3">
                <Label for="country">State</Label>
                <CustomInput
                  type="select"
                  id="state"
                  name="state"
                  onChange={handlePresentFormChange}
                >
                  <option value="">Select</option>
                  <option>Gujarat</option>
                  <option>Maharastra</option>
                  <option>Delhi</option>
                </CustomInput>
              </FormGroup>
              <FormGroup className="col-md-3">
                <Label for="country">Country</Label>
                <CustomInput
                  type="select"
                  id="country"
                  name="country"
                  onChange={handlePresentFormChange}
                >
                  <option value="">Select</option>
                  <option>India</option>
                  <option>Australia</option>
                  <option>Germany</option>
                </CustomInput>
              </FormGroup>
              <FormGroup className="col-md-3">
                <Label for="zipcode">Zipcode</Label>
                <Input
                  type="text"
                  id="zipcode"
                  placeholder="Zipcode"
                  value={presentAddressForm.zipcode}
                  onChange={handlePresentFormChange}
                />
              </FormGroup>

              <FormGroup className="col-md-3">
                <Button color="primary" className="m-0 mt-4">
                  Add
                </Button>
              </FormGroup>
            </div>
          </form>
        </CardBody>
        <CardHeader>
          <CardTitle tag="h6">PERMANENT ADDRESS</CardTitle>
        </CardHeader>
        <CardBody>
          <form onSubmit={handlePermenentForm}>
            <div className="form-row">
              <FormGroup className="col-md-4">
                <Label for="streetLine1">Street Line 1</Label>
                <Input
                  type="textarea"
                  id="streetLine1"
                  placeholder="Street Line 1"
                  value={permanentAddressForm.streetLine1}
                  onChange={handlePermenentFormChange}
                />
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="streetLine2">Street Line 2</Label>
                <Input
                  type="textarea"
                  id="streetLine2"
                  placeholder="Street Line 1"
                  value={permanentAddressForm.streetLine2}
                  onChange={handlePermenentFormChange}
                />
              </FormGroup>
              <FormGroup className="col-md-3">
                <Label for="city">City</Label>
                <CustomInput
                  type="select"
                  id="city"
                  name="city"
                  onChange={handlePermenentFormChange}
                >
                  <option value="">Select</option>
                  <option>Surat</option>
                  <option>Ahemdabad</option>
                  <option>Rajkot</option>
                </CustomInput>
              </FormGroup>
              <FormGroup className="col-md-3">
                <Label for="country">State</Label>
                <CustomInput
                  type="select"
                  id="state"
                  name="state"
                  onChange={handlePermenentFormChange}
                >
                  <option value="">Select</option>
                  <option>Gujarat</option>
                  <option>Maharastra</option>
                  <option>Delhi</option>
                </CustomInput>
              </FormGroup>
              <FormGroup className="col-md-3">
                <Label for="country">Country</Label>
                <CustomInput
                  type="select"
                  id="country"
                  name="country"
                  onChange={handlePermenentFormChange}
                >
                  <option value="">Select</option>
                  <option>India</option>
                  <option>Australia</option>
                  <option>Germany</option>
                </CustomInput>
              </FormGroup>
              <FormGroup className="col-md-3">
                <Label for="zipcode">Zipcode</Label>
                <Input
                  type="text"
                  id="zipcode"
                  placeholder="Zipcode"
                  value={permanentAddressForm.zipcode}
                  onChange={handlePermenentFormChange}
                />
              </FormGroup>

              <FormGroup className="col-md-3">
                <Button color="primary" className="m-0 mt-4">
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
