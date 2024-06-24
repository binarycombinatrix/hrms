import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  FormGroup,
  Label,
  Button,
  Input,
  CustomInput,
  Row,
  Col,
  FormFeedback,
} from "reactstrap";
import { Card, CardHeader, CardBody, CardTitle } from "reactstrap";
const initExperienceError = {
  companyName: {
    inValid: false,
    errorMsg: "",
  },
  designationId: {
    inValid: false,
    errorMsg: "",
  },
  technologyId: {
    inValid: false,
    errorMsg: "",
  },
  from: {
    inValid: false,
    errorMsg: "",
  },
  to: {
    inValid: false,
    errorMsg: "",
  },
  teamLead: {
    inValid: false,
    errorMsg: "",
  },
  projectManager: {
    inValid: false,
    errorMsg: "",
  },
  reasonForJobChange: {
    inValid: false,
    errorMsg: "",
  },
  totalExperience: {
    inValid: false,
    errorMsg: "",
  },
};

const initSalaryDetailError = {
  lastIncrementDate: {
    inValid: false,
    errorMsg: "",
  },
  currentCtc: {
    inValid: false,
    errorMsg: "",
  },
  status: {
    inValid: false,
    errorMsg: "",
  },
  salaryBeforeIncrement: {
    inValid: false,
    errorMsg: "",
  },
  expectedCtc: {
    inValid: false,
    errorMsg: "",
  },
  addNoticePeriod: {
    inValid: false,
    errorMsg: "",
  },
  reasonForProfessionalGap: {
    inValid: false,
    errorMsg: "",
  },
};
const Experience = ({
  handleActiveTab,
  handleSetData,
  experience,
  success,
  handlePrv,
  setFinalPage,
}) => {
  const [experienceform, setExperienceForm] = useState([
    {
      companyName: "",
      designationId: "",
      technologyId: "",
      from: "",
      to: "",
      teamLead: "",
      projectManager: "",
      reasonForJobChange: "",
      totalExperience: "",
    },
  ]);
  const [experienceError, setExperienceError] = useState([
    {
      companyName: {
        inValid: false,
        errorMsg: "",
      },
      designationId: {
        inValid: false,
        errorMsg: "",
      },
      technologyId: {
        inValid: false,
        errorMsg: "",
      },
      from: {
        inValid: false,
        errorMsg: "",
      },
      to: {
        inValid: false,
        errorMsg: "",
      },
      teamLead: {
        inValid: false,
        errorMsg: "",
      },
      projectManager: {
        inValid: false,
        errorMsg: "",
      },
      reasonForJobChange: {
        inValid: false,
        errorMsg: "",
      },
      totalExperience: {
        inValid: false,
        errorMsg: "",
      },
    },
  ]);
  const [salaryDetailsForm, setSalaryDetailsForm] = useState({
    lastIncrementDate: "",
    currentCtc: "",
    status: "",
    salaryBeforeIncrement: "",
    expectedCtc: "",
    addNoticePeriod: "",
    reasonForProfessionalGap: "",
  });

  const [salaryDetailsError, setSalaryDetailsError] = useState({
    lastIncrementDate: {
      inValid: false,
      errorMsg: "",
    },
    currentCtc: {
      inValid: false,
      errorMsg: "",
    },
    status: {
      inValid: false,
      errorMsg: "",
    },
    salaryBeforeIncrement: {
      inValid: false,
      errorMsg: "",
    },
    expectedCtc: {
      inValid: false,
      errorMsg: "",
    },
    addNoticePeriod: {
      inValid: false,
      errorMsg: "",
    },
    reasonForProfessionalGap: {
      inValid: false,
      errorMsg: "",
    },
  });

  const [isPresent, setIsPresent] = useState(false);
  useEffect(() => {
    if (experience.experience && experience.salary) {
      setExperienceForm(experience.experience);
      setSalaryDetailsForm(experience.salary);
      let tempExperiencenError = [];
      for (let i = 0; i < experience.experience.length; i++) {
        tempExperiencenError.push(initExperienceError);
      }

      setExperienceError(tempExperiencenError);
      setSalaryDetailsError(initSalaryDetailError);
    }
  }, [experience]);

  useEffect(() => {
    if (success) {
      setExperienceForm([
        {
          companyName: "",
          designationId: "",
          technologyId: "",
          from: "",
          to: "",
          teamLead: "",
          projectManager: "",
          reasonForJobChange: "",
          totalExperience: "",
        },
      ]);
      setExperienceError([
        {
          companyName: {
            inValid: false,
            errorMsg: "",
          },
          designationId: {
            inValid: false,
            errorMsg: "",
          },
          technologyId: {
            inValid: false,
            errorMsg: "",
          },
          from: {
            inValid: false,
            errorMsg: "",
          },
          to: {
            inValid: false,
            errorMsg: "",
          },
          teamLead: {
            inValid: false,
            errorMsg: "",
          },
          projectManager: {
            inValid: false,
            errorMsg: "",
          },
          reasonForJobChange: {
            inValid: false,
            errorMsg: "",
          },
          totalExperience: {
            inValid: false,
            errorMsg: "",
          },
        },
      ]);
      setSalaryDetailsForm({
        lastIncrementDate: "",
        currentCtc: "",
        status: "",
        salaryBeforeIncrement: "",
        expectedCtc: "",
        addNoticePeriod: "",
        reasonForProfessionalGap: "",
      });
      setSalaryDetailsError({
        lastIncrementDate: {
          inValid: false,
          errorMsg: "",
        },
        currentCtc: {
          inValid: false,
          errorMsg: "",
        },
        status: {
          inValid: false,
          errorMsg: "",
        },
        salaryBeforeIncrement: {
          inValid: false,
          errorMsg: "",
        },
        expectedCtc: {
          inValid: false,
          errorMsg: "",
        },
        addNoticePeriod: {
          inValid: false,
          errorMsg: "",
        },
        reasonForProfessionalGap: {
          inValid: false,
          errorMsg: "",
        },
      });
    }
  }, [success]);

  const handleTo = (e, index) => {
    if (e.target.type === "select-one") {
      e.target.value === "Present" && setIsPresent(true);
    }

    const { value } = e.target;

    const list = [...experienceform];
    if (value === "Date") {
      list[index]["isPresentVisible"] = false;
      list[index]["isDateVisible"] = true;
    } else {
      list[index]["to"] = null;
      list[index]["isDateVisible"] = false;
      list[index]["isPresentVisible"] = true;
    }

    setExperienceForm(list);
  };

  const clearError = () => {
    setSalaryDetailsError({
      lastIncrementDate: {
        inValid: false,
        errorMsg: "",
      },
      currentCtc: {
        inValid: false,
        errorMsg: "",
      },
      status: {
        inValid: false,
        errorMsg: "",
      },
      salaryBeforeIncrement: {
        inValid: false,
        errorMsg: "",
      },
      expectedCtc: {
        inValid: false,
        errorMsg: "",
      },
      addNoticePeriod: {
        inValid: false,
        errorMsg: "",
      },
      reasonForProfessionalGap: {
        inValid: false,
        errorMsg: "",
      },
    });
    experienceform.forEach((experience, idx) => {
      if (experienceError[idx].companyName.inValid) {
        const list = [...experienceError];
        list[idx]["companyName"]["inValid"] = false;
        list[idx]["companyName"]["errorMsg"] = "";
        setExperienceError(list);
      }
      if (experienceError[idx].designationId.inValid) {
        const list = [...experienceError];
        list[idx]["designationId"]["inValid"] = false;
        list[idx]["designationId"]["errorMsg"] = "";
        setExperienceError(list);
      }
      if (experienceError[idx].technologyId.inValid) {
        const list = [...experienceError];
        list[idx]["technologyId"]["inValid"] = false;
        list[idx]["technologyId"]["errorMsg"] = "";
        setExperienceError(list);
      }
      if (experienceError[idx].from.inValid) {
        const list = [...experienceError];
        list[idx]["from"]["inValid"] = false;
        list[idx]["from"]["errorMsg"] = "";
        setExperienceError(list);
      }
      if (experienceError[idx].to.inValid) {
        const list = [...experienceError];
        list[idx]["to"]["inValid"] = false;
        list[idx]["to"]["errorMsg"] = "";
        setExperienceError(list);
      }
      if (experienceError[idx].teamLead.inValid) {
        const list = [...experienceError];
        list[idx]["teamLead"]["inValid"] = false;
        list[idx]["teamLead"]["errorMsg"] = "";
        setExperienceError(list);
      }
      if (experienceError[idx].projectManager.inValid) {
        const list = [...experienceError];
        list[idx]["projectManager"]["inValid"] = false;
        list[idx]["projectManager"]["errorMsg"] = "";
        setExperienceError(list);
      }

      if (experienceError[idx].reasonForJobChange.inValid) {
        const list = [...experienceError];
        list[idx]["reasonForJobChange"]["inValid"] = false;
        list[idx]["reasonForJobChange"]["errorMsg"] = "";
        setExperienceError(list);
      }
      if (experienceError[idx].totalExperience.inValid) {
        const list = [...experienceError];
        list[idx]["totalExperience"]["inValid"] = false;
        list[idx]["totalExperience"]["errorMsg"] = "";
        setExperienceError(list);
      }
    });
  };
  const handleErrorChange = (obj) => {
    setSalaryDetailsError((curr) => ({
      ...curr,
      ...obj,
    }));
  };
  const validate = () => {
    clearError();
    let flag = true;
    experienceform.forEach((experience, idx) => {
      if (experience.companyName === "") {
        const list = [...experienceError];
        list[idx]["companyName"]["inValid"] = true;
        list[idx]["companyName"]["errorMsg"] = "Please enter company name";
        setExperienceError(list);
        flag = false;
      }
      if (experience.designationId === "") {
        const list = [...experienceError];
        list[idx]["designationId"]["inValid"] = true;
        list[idx]["designationId"]["errorMsg"] = "Please select designation";
        setExperienceError(list);
        flag = false;
      }
      if (experience.technologyId === "") {
        const list = [...experienceError];
        list[idx]["technologyId"]["inValid"] = true;
        list[idx]["technologyId"]["errorMsg"] = "Please select technology";
        setExperienceError(list);
        flag = false;
      }
      if (experience.from === "") {
        const list = [...experienceError];
        list[idx]["from"]["inValid"] = true;
        list[idx]["from"]["errorMsg"] = "Please select from date";
        setExperienceError(list);
        flag = false;
      }

      if (experience.teamLead) {
        if (/\d/.test(experience.teamLead)) {
          const list = [...experienceError];
          list[idx]["teamLead"]["inValid"] = true;
          list[idx]["teamLead"]["errorMsg"] =
            "Team lead do not contain characters";
          setExperienceError(list);
          flag = false;
        } else if (experience.teamLead.length < 3) {
          const list = [...experienceError];
          list[idx]["teamLead"]["inValid"] = true;
          list[idx]["teamLead"]["errorMsg"] =
            "Team lead name should be more than 3 characters";
          setExperienceError(list);
          flag = false;
        }
      }
      if (experience.projectManager) {
        if (/\d/.test(experience.projectManager)) {
          const list = [...experienceError];
          list[idx]["projectManager"]["inValid"] = true;
          list[idx]["projectManager"]["errorMsg"] =
            "Project manager do not contain numbers";
          setExperienceError(list);
          flag = false;
        } else if (experience.projectManager.length < 3) {
          const list = [...experienceError];
          list[idx]["projectManager"]["inValid"] = true;
          list[idx]["projectManager"]["errorMsg"] =
            "Project manager should be more than 3 character";
          setExperienceError(list);
          flag = false;
        }
      }
      if (experience.reasonForJobChange) {
        if (experience.reasonForJobChange.length < 3) {
          const list = [...experienceError];
          list[idx]["reasonForJobChange"]["inValid"] = true;
          list[idx]["reasonForJobChange"]["errorMsg"] =
            "Reason for job change should be more than 3 character";
          setExperienceError(list);
          flag = false;
        }
      }
      if (experience.totalExperience) {
        if (!Number(experience.totalExperience)) {
          const list = [...experienceError];
          list[idx]["totalExperience"]["inValid"] = true;
          list[idx]["totalExperience"]["errorMsg"] =
            "Total experience do not contain characters";
          setExperienceError(list);
          flag = false;
        }
      }
    });

    if (salaryDetailsForm.lastIncrementDate === "") {
      handleErrorChange({
        lastIncrementDate: {
          inValid: true,
          errorMsg: "Please select last increment date",
        },
      });
      flag = false;
    }
    if (salaryDetailsForm.status === "") {
      handleErrorChange({
        status: {
          inValid: true,
          errorMsg: "Please select status",
        },
      });
      flag = false;
    }
    if (salaryDetailsForm.currentCtc === "") {
      handleErrorChange({
        currentCtc: {
          inValid: true,
          errorMsg: "Please enter current ctc",
        },
      });
      flag = false;
    } else if (!Number(salaryDetailsForm.currentCtc)) {
      handleErrorChange({
        currentCtc: {
          inValid: true,
          errorMsg: "Current ctc do not contain character",
        },
      });
      flag = false;
    }

    if (salaryDetailsForm.salaryBeforeIncrement === "") {
      handleErrorChange({
        salaryBeforeIncrement: {
          inValid: true,
          errorMsg: "Please enter salary before increment",
        },
      });
      flag = false;
    } else if (!Number(salaryDetailsForm.salaryBeforeIncrement)) {
      handleErrorChange({
        salaryBeforeIncrement: {
          inValid: true,
          errorMsg: "Salary before increment do not contain characters",
        },
      });
      flag = false;
    }

    if (salaryDetailsForm.expectedCtc === "") {
      handleErrorChange({
        expectedCtc: {
          inValid: true,
          errorMsg: "Please enter expected ctc",
        },
      });
      flag = false;
    } else if (!Number(salaryDetailsForm.expectedCtc)) {
      handleErrorChange({
        expectedCtc: {
          inValid: true,
          errorMsg: "Expected ctc do not contain characters",
        },
      });
      flag = false;
    }

    if (salaryDetailsForm.addNoticePeriod === "") {
      handleErrorChange({
        addNoticePeriod: {
          inValid: true,
          errorMsg: "Please enter notice period",
        },
      });
      flag = false;
    } else if (!Number(salaryDetailsForm.addNoticePeriod)) {
      handleErrorChange({
        addNoticePeriod: {
          inValid: true,
          errorMsg: "Notice period do not contain characters",
        },
      });
      flag = false;
    } else if (salaryDetailsForm.addNoticePeriod > 90) {
      handleErrorChange({
        addNoticePeriod: {
          inValid: true,
          errorMsg: "Notice period do not bigger than 90 days",
        },
      });
      flag = false;
    }

    if (salaryDetailsForm.reasonForProfessionalGap === "") {
      handleErrorChange({
        reasonForProfessionalGap: {
          inValid: true,
          errorMsg: "Please enter reason for professional gap",
        },
      });
      flag = false;
    }

    return !flag;
  };

  const handleExperienceChange = (e, index) => {
    const { id, value } = e.target;

    const list = [...experienceform];
    list[index][id] = value;

    setExperienceForm(list);
  };
  const handlesalaryDetailsChange = (e) => {
    let { id, value } = e.target;
    setSalaryDetailsForm((curr) => ({
      ...curr,
      [id]: value,
    }));
  };
  const handleExperience = (e) => {
    e.preventDefault();
    let isValid = validate();
    if (!isValid) {
      let data = { experience: experienceform, salary: salaryDetailsForm };
      handleSetData(data);
      handleActiveTab("4");
    }
  };
  const handleRemoveClick = (index) => {
    setExperienceForm((curr) => curr.filter((experiene, idx) => idx !== index));
  };

  const handleAddClick = () => {
    setExperienceForm([
      ...experienceform,
      {
        companyName: "",
        designationId: "",
        technologyId: "",
        from: "",
        to: "",
        teamLead: "",
        projectManager: "",
        reasonForJobChange: "",
        totalExperience: "",
      },
    ]);
    setExperienceError([
      ...experienceError,
      {
        companyName: {
          inValid: false,
          errorMsg: "",
        },
        designationId: {
          inValid: false,
          errorMsg: "",
        },
        technologyId: {
          inValid: false,
          errorMsg: "",
        },
        from: {
          inValid: false,
          errorMsg: "",
        },
        to: {
          inValid: false,
          errorMsg: "",
        },
        teamLead: {
          inValid: false,
          errorMsg: "",
        },
        projectManager: {
          inValid: false,
          errorMsg: "",
        },
        reasonForJobChange: {
          inValid: false,
          errorMsg: "",
        },
        totalExperience: {
          inValid: false,
          errorMsg: "",
        },
      },
    ]);
  };
  const handleBack = () => {
    // let isValid = validate();
    // if (!isValid) {
    let data = { experience: experienceform, salary: salaryDetailsForm };
    handleSetData(data);
    setFinalPage(false);
    handlePrv("2");
    // }
  };
  return (
    <>
      <Card>
        <CardHeader>
          <Row>
            <Col xs="3">
              <CardTitle tag="h6"> EXPERIENCE DETAILS</CardTitle>
            </Col>
            <Col xs="9" className="text-right">
              <Button color="dark" className="m-0" onClick={handleAddClick}>
                <i className="fa fa-plus mr-2" aria-hidden="true"></i>Add
                Experience
              </Button>
            </Col>
          </Row>
        </CardHeader>

        <CardBody>
          <form onSubmit={handleExperience}>
            {experienceform.map((experience, experienceIndex) => (
              <>
                <FormGroup>
                  <Button
                    close
                    onClick={() => handleRemoveClick(experienceIndex)}
                    className="col-md-2 m-3"
                  />
                </FormGroup>
                <div className="form-row" key={experienceIndex}>
                  <FormGroup className="col-md-4">
                    <Label for="CompanyName">Company Name*</Label>
                    <Input
                      type="text"
                      id="companyName"
                      value={experience.companyName}
                      onChange={(e) =>
                        handleExperienceChange(e, experienceIndex)
                      }
                      invalid={
                        experienceError[experienceIndex]["companyName"].inValid
                      }
                      maxlength="20"
                    />
                    <FormFeedback>
                      {experienceError[experienceIndex]["companyName"].errorMsg}
                    </FormFeedback>
                  </FormGroup>
                  <FormGroup className="col-md-4">
                    <Label for="designationId">Designation*</Label>
                    <CustomInput
                      type="select"
                      id="designationId"
                      name="designationId"
                      onChange={(e) =>
                        handleExperienceChange(e, experienceIndex)
                      }
                      value={experience.designationId}
                      invalid={
                        experienceError[experienceIndex]["designationId"]
                          .inValid
                      }
                    >
                      <option value="">select designation</option>
                      <option value="1">Senior Developer</option>
                      <option value="2">System Analyst</option>
                      <option value="3">Senior Designer</option>
                      <option value="4">Project Manager</option>
                      <option value="5">Content Writer</option>
                      <option value="6">Content Writer</option>
                      <option value="7">Content Writer</option>
                    </CustomInput>
                    <FormFeedback>
                      {
                        experienceError[experienceIndex]["designationId"]
                          .errorMsg
                      }
                    </FormFeedback>
                  </FormGroup>
                  <FormGroup className="col-md-4">
                    <Label for="technologyId">Technology*</Label>
                    <CustomInput
                      type="select"
                      id="technologyId"
                      name="TechnologyId"
                      onChange={(e) =>
                        handleExperienceChange(e, experienceIndex)
                      }
                      value={experience.technologyId}
                      invalid={
                        experienceError[experienceIndex]["technologyId"].inValid
                      }
                    >
                      <option value="">select technology</option>
                      <option value="1">PHP</option>
                      <option value="2">ios</option>
                      <option value="3">ASP.net</option>
                      <option value="4">UI/UX</option>
                      <option value="5">UI/UX</option>
                      <option value="6">UI/UX</option>
                      <option value="7">UI/UX</option>
                      <option value="8">UI/UX</option>
                    </CustomInput>
                    <FormFeedback>
                      {
                        experienceError[experienceIndex]["technologyId"]
                          .errorMsg
                      }
                    </FormFeedback>
                  </FormGroup>
                  <FormGroup className="col-md-4">
                    <Label for="From">From*</Label>
                    <Input
                      type="month"
                      id="from"
                      value={moment(experience.from).format("YYYY-MM")}
                      max={moment().subtract("1", "month").format("YYYY-MM")}
                      onChange={(e) =>
                        handleExperienceChange(e, experienceIndex)
                      }
                      invalid={experienceError[experienceIndex]["from"].inValid}
                      onKeyDown={(e) => e.preventDefault()}
                    />
                    <FormFeedback>
                      {experienceError[experienceIndex]["from"].errorMsg}
                    </FormFeedback>
                  </FormGroup>
                  <FormGroup className="col-md-4">
                    <Label>To*</Label>
                    <CustomInput
                      type="select"
                      onChange={(e) => handleTo(e, experienceIndex)}
                    >
                      <option value="">select to</option>
                      {!isPresent && <option>Present</option>}
                      <option>Date</option>
                    </CustomInput>
                  </FormGroup>
                  {experience.isDateVisible && (
                    <FormGroup className="col-md-4">
                      <Label for="To">To*</Label>
                      <Input
                        type="month"
                        id="to"
                        value={experience.to}
                        min={moment(experience.from)
                          .add("1", "month")
                          .format("YYYY-MM")}
                        onChange={(e) =>
                          handleExperienceChange(e, experienceIndex)
                        }
                        invalid={experienceError[experienceIndex]["to"].inValid}
                        onKeyDown={(e) => e.preventDefault()}
                      />
                      <FormFeedback>
                        {experienceError[experienceIndex]["to"].errorMsg}
                      </FormFeedback>
                    </FormGroup>
                  )}
                  {experience.isPresentVisible && (
                    <FormGroup className="col-md-4">
                      <Label for="Teamlead">To</Label>
                      <Input type="text" disabled value="Present" />
                    </FormGroup>
                  )}

                  <FormGroup className="col-md-4">
                    <Label for="Teamlead">Team lead</Label>
                    <Input
                      type="text"
                      id="teamLead"
                      value={experience.teamLead}
                      onChange={(e) =>
                        handleExperienceChange(e, experienceIndex)
                      }
                      invalid={
                        experienceError[experienceIndex]["teamLead"].inValid
                      }
                      maxlength="15"
                    />
                    <FormFeedback>
                      {experienceError[experienceIndex]["teamLead"].errorMsg}
                    </FormFeedback>
                  </FormGroup>
                  <FormGroup className="col-md-4">
                    <Label for="ProjectManager">Project Manager</Label>
                    <Input
                      type="text"
                      id="projectManager"
                      value={experience.projectManager}
                      onChange={(e) =>
                        handleExperienceChange(e, experienceIndex)
                      }
                      invalid={
                        experienceError[experienceIndex]["projectManager"]
                          .inValid
                      }
                      maxlength="15"
                    />
                    <FormFeedback>
                      {
                        experienceError[experienceIndex]["projectManager"]
                          .errorMsg
                      }
                    </FormFeedback>
                  </FormGroup>
                  <FormGroup className="col-md-4">
                    <Label for="exampleReasonChange">
                      Reason For Job Change
                    </Label>
                    <CustomInput
                      type="select"
                      id="reasonForJobChange"
                      name="ReasonChange"
                      onChange={(e) =>
                        handleExperienceChange(e, experienceIndex)
                      }
                      value={experience.reasonForJobChange}
                      invalid={
                        experienceError[experienceIndex]["reasonForJobChange"]
                          .inValid
                      }
                    >
                      <option value="">-----</option>
                      <option>Salary Growth</option>
                      <option>Better Opportunity</option>
                    </CustomInput>
                    <FormFeedback>
                      {
                        experienceError[experienceIndex]["reasonForJobChange"]
                          .errorMsg
                      }
                    </FormFeedback>
                  </FormGroup>
                  <FormGroup className="col-md-4">
                    <Label for="TotalExperience">Total Experience</Label>
                    <Input
                      type="text"
                      id="totalExperience"
                      value={experience.totalExperience}
                      onChange={(e) =>
                        handleExperienceChange(e, experienceIndex)
                      }
                      invalid={
                        experienceError[experienceIndex]["totalExperience"]
                          .inValid
                      }
                    />
                    <FormFeedback>
                      {
                        experienceError[experienceIndex]["totalExperience"]
                          .errorMsg
                      }
                    </FormFeedback>
                  </FormGroup>
                </div>
                <hr />
              </>
            ))}
          </form>
          <CardTitle tag="h6"> SALARY</CardTitle>
          <form>
            <div className="form-row">
              <FormGroup className="col-md-4">
                <Label for="LastIncrementDate">Last Increment Date*</Label>
                <Input
                  type="month"
                  max={moment().subtract("1", "month").format("YYYY-MM")}
                  id="lastIncrementDate"
                  value={moment(salaryDetailsForm.lastIncrementDate).format(
                    "YYYY-MM"
                  )}
                  onChange={handlesalaryDetailsChange}
                  invalid={salaryDetailsError.lastIncrementDate.inValid}
                  onKeyDown={(e) => e.preventDefault()}
                />
                <FormFeedback>
                  {salaryDetailsError.lastIncrementDate.errorMsg}
                </FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="currentCtc">Current CTC (per month)*</Label>
                <Input
                  type="text"
                  id="currentCtc"
                  value={salaryDetailsForm.currentCtc}
                  onChange={handlesalaryDetailsChange}
                  invalid={salaryDetailsError.currentCtc.inValid}
                />
                <FormFeedback>
                  {salaryDetailsError.currentCtc.errorMsg}
                </FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="status">Status*</Label>
                <CustomInput
                  type="select"
                  id="status"
                  name="Course"
                  onChange={handlesalaryDetailsChange}
                  invalid={salaryDetailsError.status.inValid}
                  value={salaryDetailsForm.status}
                >
                  <option value="">------</option>
                  <option>Negotiable</option>
                  <option>Non Negotible</option>
                </CustomInput>
                <FormFeedback>
                  {salaryDetailsError.status.errorMsg}
                </FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="TotalExperience">
                  Salary Before Increment (per month)*
                </Label>
                <Input
                  type="text"
                  id="salaryBeforeIncrement"
                  value={salaryDetailsForm.salaryBeforeIncrement}
                  onChange={handlesalaryDetailsChange}
                  invalid={salaryDetailsError.salaryBeforeIncrement.inValid}
                />
                <FormFeedback>
                  {salaryDetailsError.salaryBeforeIncrement.errorMsg}
                </FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="expectedCtc">Expected CTC (per month)*</Label>
                <Input
                  type="text"
                  id="expectedCtc"
                  value={salaryDetailsForm.expectedCtc}
                  onChange={handlesalaryDetailsChange}
                  invalid={salaryDetailsError.expectedCtc.inValid}
                />
                <FormFeedback>
                  {salaryDetailsError.expectedCtc.errorMsg}
                </FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="AddNoticePeriod(in days)">
                  Add Notice Period (in days)*
                </Label>
                <Input
                  type="text"
                  id="addNoticePeriod"
                  value={salaryDetailsForm.addNoticePeriod}
                  onChange={handlesalaryDetailsChange}
                  invalid={salaryDetailsError.addNoticePeriod.inValid}
                />
                <FormFeedback>
                  {salaryDetailsError.addNoticePeriod.errorMsg}
                </FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-12">
                <Label for="reasonForProfessionalGap">
                  Reason For Professional Gap*
                </Label>
                <Input
                  type="textarea"
                  id="reasonForProfessionalGap"
                  value={salaryDetailsForm.reasonForProfessionalGap}
                  onChange={handlesalaryDetailsChange}
                  invalid={salaryDetailsError.reasonForProfessionalGap.inValid}
                  maxlength="40"
                />
                <FormFeedback>
                  {salaryDetailsError.reasonForProfessionalGap.errorMsg}
                </FormFeedback>
              </FormGroup>

              <Row className="col-md-12">
                <Col className="col-md-6">
                  <FormGroup className=" text-left">
                    <Button
                      color="primary"
                      className="m-0"
                      onClick={handleBack}
                    >
                      Back
                    </Button>
                  </FormGroup>
                </Col>
                <Col className="col-md-6">
                  <FormGroup className=" text-right">
                    <Button
                      color="primary"
                      className="m-0"
                      onClick={handleExperience}
                    >
                      Next
                    </Button>
                  </FormGroup>
                </Col>
              </Row>
            </div>
          </form>
        </CardBody>
      </Card>
    </>
  );
};

export default Experience;
