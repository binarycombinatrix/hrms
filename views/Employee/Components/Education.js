import React, { useState } from "react";
import { FormGroup, Label, Input, CustomInput, Button } from "reactstrap";

import { Card, CardHeader, CardBody, CardTitle } from "reactstrap";
const Education = () => {
  const [educationForm, setEducationForm] = useState({
    educationType: "",
    course: "",
    passingYear: "",
    cgpa: "",
    instituteName: "",
  });
  const [sscForm, setSscForm] = useState({
    schoolName: "",
    percentage: "",
    passingYear: "",
  });
  const validate = (form) => {
    let values = Object.values(form).some((prop) => prop === "");
    return values;
  };

  const handleEducationchange = (e) => {
    let { id, value } = e.target;
    setEducationForm((curr) => ({
      ...curr,
      [id]: value,
    }));
  };

  const handleSscchange = (e) => {
    let { id, value } = e.target;
    setSscForm((curr) => ({
      ...curr,
      [id]: value,
    }));
  };
  const handleEducation = (e) => {
    e.preventDefault();
    let isValid = validate(educationForm);
    if (!isValid) {
    } else {
      alert("Please enter all fields");
    }
  };
  const handleSsc = (e) => {
    e.preventDefault();
    let isValid = validate(sscForm);
    if (!isValid) {
    } else {
      alert("Please enter all fields");
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle tag="h6"> EDUCATION DETAILS</CardTitle>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleEducation}>
            <div className="form-row">
              <FormGroup className="col-md-4">
                <Label for="educationType">Education Type</Label>
                <CustomInput
                  type="select"
                  id="educationType"
                  name="educationType"
                  onChange={handleEducationchange}
                >
                  <option value="">Select</option>
                  <option>HSC</option>
                  <option>BE</option>
                  <option>ME</option>
                  <option>MCA</option>
                  <option>DIPLOMA</option>
                </CustomInput>
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="course">Course</Label>
                <CustomInput
                  type="select"
                  id="course"
                  name="Course"
                  onChange={handleEducationchange}
                >
                  <option value="">Select</option>
                  <option>IT</option>
                  <option>SCIENCE</option>
                  <option>ICT</option>
                  <option>HR</option>
                  <option>DIPLOMA</option>
                </CustomInput>
              </FormGroup>
              <FormGroup></FormGroup>
              <FormGroup className="col-md-4">
                <Label for="passingYear">Passing Year</Label>
                <CustomInput
                  type="select"
                  id="passingYear"
                  name="PassingYear"
                  onChange={handleEducationchange}
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
                <Label for="cgpa">CGPA/PERCENTAGE</Label>
                <Input
                  type="text"
                  id="cgpa"
                  placeholder="CGPA/PERCENTAGE"
                  value={educationForm.cgpa}
                  onChange={handleEducationchange}
                />
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="instituteName">Institute Name</Label>
                <Input
                  type="text"
                  id="instituteName"
                  placeholder="Institute Name"
                  value={educationForm.instituteName}
                  onChange={handleEducationchange}
                />
              </FormGroup>
              <FormGroup className="col-md-4">
                <Button color="primary" className="m-0">
                  Add
                </Button>
              </FormGroup>
            </div>
          </form>
          <form onSubmit={handleSsc}>
            <legend>SSC</legend>
            <div className="form-row">
              <FormGroup className="col-md-3">
                <Label for="schoolName">School Name</Label>
                <Input
                  type="text"
                  id="schoolName"
                  placeholder="School Name"
                  value={sscForm.schoolName}
                  onChange={handleSscchange}
                />
              </FormGroup>
              <FormGroup className="col-md-3">
                <Label for="percentage">Percentage</Label>
                <Input
                  type="text"
                  id="percentage"
                  placeholder="Percentage"
                  value={sscForm.percentage}
                  onChange={handleSscchange}
                />
              </FormGroup>
              <FormGroup className="col-md-3">
                <Label for="passingYear">Passing Year</Label>
                <CustomInput
                  type="select"
                  id="passingYear"
                  name="PassingYear"
                  onChange={handleSscchange}
                >
                  <option value="">Select</option>
                  <option>2015</option>
                  <option>2016</option>
                  <option>2017</option>
                  <option>2018</option>
                  <option>2019</option>
                </CustomInput>
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

export default Education;
