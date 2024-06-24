import React, { useState } from "react";

import { FormGroup, Label, Button, Input, CustomInput } from "reactstrap";
import { Card, CardHeader, CardBody, CardTitle } from "reactstrap";
const Experience = () => {
  const [workForm, setWorkForm] = useState({
    joiningDate: "",
    reJoiningDate: "",
    productionDate: "",
    technology: "",
    designation: "",
    teamLead: "",
    projectManager: "",
    bondDuration: "",
    noticePeriods: "",
    resignationDate: "",
    resignationAcceptanceDate: "",
    relievingDate: "",
    appraisalCycle: "",
    employeeType: "",
    currentCTC: "",
  });
  const [experienceForm, setExperienceForm] = useState({
    companyName: "",
    designation: "",
    technology: "",
    from: "",
    to: "",
    teamLead: "",
    projectManager: "",
    reasonForJobChange: "",
    reasonForProfessionalGap: "",
  });
  const validate = (form) => {
    let values = Object.values(form).some((prop) => prop === "");
    return values;
  };
  const handleExperienceChange = (e) => {
    let { id, value } = e.target;
    setExperienceForm((curr) => ({
      ...curr,
      [id]: value,
    }));
  };
  const handleWorkChange = (e) => {
    let { id, value } = e.target;
    setWorkForm((curr) => ({
      ...curr,
      [id]: value,
    }));
  };

  const handleWork = (e) => {
    e.preventDefault();
    let isValid = validate(workForm);
    if (!isValid) {
    } else {
      alert("Please enter all fields");
    }
  };

  const handleExperience = (e) => {
    e.preventDefault();
    let isValid = validate(experienceForm);
    if (!isValid) {
    } else {
      alert("Please enter all fields");
    }
  };
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle tag="h6"> Work</CardTitle>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleWork}>
            <div className="form-row">
              <FormGroup className="col-md-4">
                <Label for="joiningDate">Joining Date</Label>
                <Input
                  type="date"
                  id="joiningDate"
                  placeholder="Joining Date"
                  value={workForm.joiningDate}
                  onChange={handleWorkChange}
                />
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="reJoiningDate">Re Joining Date</Label>
                <Input
                  type="date"
                  id="reJoiningDate"
                  placeholder="Re Joining Date"
                  value={workForm.reJoiningDate}
                  onChange={handleWorkChange}
                />
              </FormGroup>

              <FormGroup className="col-md-4">
                <Label for="productionDate">Production Date</Label>
                <Input
                  type="date"
                  id="productionDate"
                  placeholder="Production Date"
                  value={workForm.productionDate}
                  onChange={handleWorkChange}
                />
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="technology">Technology</Label>
                <CustomInput
                  type="select"
                  id="technology"
                  name="technology"
                  onChange={handleWorkChange}
                >
                  <option value="">Select</option>
                  <option>PHP</option>
                  <option>HTml</option>
                  <option>CSS</option>
                  <option>.NET</option>
                  <option>JAVASCRIPT</option>
                </CustomInput>
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="exampleDesignation">Designation</Label>
                <CustomInput
                  type="select"
                  id="designation"
                  name="Designation"
                  onChange={handleWorkChange}
                >
                  <option value="">Select</option>
                  <option>Senior Developer</option>
                  <option>System Analyst</option>
                  <option>Senior Designer</option>
                  <option>Project Manager</option>
                  <option>Content Writer</option>
                </CustomInput>
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="Teamlead">Team lead</Label>
                <Input
                  type="text"
                  id="teamLead"
                  placeholder="Team lead"
                  value={workForm.teamLead}
                  onChange={handleWorkChange}
                />
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="projectManager">Project Manager</Label>
                <Input
                  type="text"
                  id="projectManager"
                  placeholder="Project Manager"
                  value={workForm.projectManager}
                  onChange={handleWorkChange}
                />
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="bondDuration">Bond Duration</Label>
                <CustomInput
                  type="select"
                  id="bondDuration"
                  name="bondDuration"
                  onChange={handleWorkChange}
                >
                  <option value="">Select</option>
                  <option>1.6</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </CustomInput>
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="noticePeriods">Notice Periods(In Months)</Label>
                <CustomInput
                  type="select"
                  id="noticePeriods"
                  name="Notice Periods"
                  onChange={handleWorkChange}
                >
                  <option value="">Select</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </CustomInput>
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="joiningDate">Resignation Date</Label>
                <Input
                  type="date"
                  id="resignationDate"
                  placeholder="Resignation Date"
                  value={workForm.resignationDate}
                  onChange={handleWorkChange}
                />
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="resignationAcceptanceDate">
                  Resignation AcceptanceDate
                </Label>
                <Input
                  type="date"
                  id="resignationAcceptanceDate"
                  placeholder="Resignation AcceptanceDate"
                  value={workForm.resignationAcceptanceDate}
                  onChange={handleWorkChange}
                />
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="relievingDate">Relieving Date</Label>
                <Input
                  type="date"
                  id="relievingDate"
                  value={workForm.relievingDate}
                  onChange={handleWorkChange}
                />
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="appraisalCycle">Appraisal Cycle</Label>
                <CustomInput
                  type="select"
                  id="appraisalCycle"
                  name="Appraisal Cycle"
                  onChange={handleWorkChange}
                >
                  <option value="">Select</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </CustomInput>
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="appraisalCycle">Employee Type</Label>
                <CustomInput
                  type="select"
                  id="employeeType"
                  name="Employee Type"
                  onChange={handleWorkChange}
                >
                  <option value="">Select</option>
                  <option>Emloyee</option>
                  <option>HR</option>
                  <option></option>
                  <option>4</option>
                  <option>5</option>
                </CustomInput>
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="currentCTC">Current CTC</Label>
                <Input
                  type="text"
                  id="currentCTC"
                  placeholder="Current CTC"
                  value={workForm.currentCTC}
                  onChange={handleWorkChange}
                />
              </FormGroup>
              <FormGroup className="col-md-4">
                <Button color="primary" className="m-0">
                  Add
                </Button>
              </FormGroup>
            </div>
          </form>
          <CardTitle tag="h6">EXPERIENCE</CardTitle>
          <form onSubmit={handleExperience}>
            <div className="form-row">
              <FormGroup className="col-md-4">
                <Label for="CompanyName">Company Name</Label>
                <Input
                  type="text"
                  id="companyName"
                  placeholder="Company Name"
                  value={experienceForm.companyName}
                  onChange={handleExperienceChange}
                />
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="exampleDesignation">Designation</Label>
                <CustomInput
                  type="select"
                  id="designation"
                  name="Designation"
                  onChange={handleExperienceChange}
                >
                  <option value="">Select</option>
                  <option>Senior Developer</option>
                  <option>System Analyst</option>
                  <option>Senior Designer</option>
                  <option>Project Manager</option>
                  <option>Content Writer</option>
                </CustomInput>
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="exampleTechnology">Technology</Label>
                <CustomInput
                  type="select"
                  id="technology"
                  name="Technology"
                  onChange={handleExperienceChange}
                >
                  <option value="">Select</option>
                  <option>PHP</option>
                  <option>ios</option>
                  <option>ASP.net</option>
                  <option>UI/UX</option>
                </CustomInput>
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="From">From</Label>
                <Input
                  type="month"
                  id="from"
                  value={experienceForm.from}
                  onChange={handleExperienceChange}
                />
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="To">To</Label>
                <Input
                  type="month"
                  id="to"
                  value={experienceForm.to}
                  onChange={handleExperienceChange}
                />
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="Teamlead">Team lead</Label>
                <Input
                  type="text"
                  id="teamLead"
                  placeholder="Team lead"
                  value={experienceForm.teamLead}
                  onChange={handleExperienceChange}
                />
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="ProjectManager">Project Manager</Label>
                <Input
                  type="text"
                  id="projectManager"
                  placeholder="Project Manager"
                  value={experienceForm.projectManager}
                  onChange={handleExperienceChange}
                />
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="exampleReasonChange">Reason For Job Change</Label>
                <CustomInput
                  type="select"
                  id="reasonForJobChange"
                  name="ReasonChange"
                  onChange={handleExperienceChange}
                >
                  <option value="">Select</option>
                  <option>Salary Growth</option>
                  <option>Better Opportunity</option>
                </CustomInput>
              </FormGroup>
              <FormGroup className="col-md-12">
                <Label for="reasonForProfessionalGap">
                  Reason For Professional Gap (if any)
                </Label>
                <Input
                  type="textarea"
                  id="reasonForProfessionalGap"
                  placeholder="Reason For Professional Gap (if any)"
                  value={experienceForm.reasonForProfessionalGap}
                  onChange={handleExperienceChange}
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

export default Experience;
