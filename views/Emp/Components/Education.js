import React, { useState, useEffect } from "react";
import Multiselect from "multiselect-react-dropdown";

import {
  FormGroup,
  Label,
  Input,
  CustomInput,
  Row,
  Col,
  Button,
  FormFeedback,
} from "reactstrap";

import { Card, CardHeader, CardBody, CardTitle } from "reactstrap";

const initEducationError = {
  educationTypeId: {
    inValid: false,
    errorMsg: "",
  },
  courseId: {
    inValid: false,
    errorMsg: "",
  },
  passingYear: {
    inValid: false,
    errorMsg: "",
  },
  percentage: {
    inValid: false,
    errorMsg: "",
  },
  instituteName: {
    inValid: false,
    errorMsg: "",
  },
};

const multiSelect = {
  chips: {
    background: "#ffcc00",
  },
  option: {
    color: "blue",
  },
};

const Education = ({
  handleActiveTab,
  handleSetData,
  handlePrv,
  setFinalPage,
  success,
}) => {
  const [educationForm, setEducationForm] = useState([]);
  const [educationError, setEducationError] = useState([]);
  const [courseForm, setCoursesForm] = useState([]);
  const [courseError, setCourseError] = useState([]);
  const [years, setYears] = useState([]);
  const [skills] = useState([
    { id: 1, title: "reactjs" },
    { id: 2, title: "angularjs" },
    { id: 3, title: "nodejs" },
  ]);
  const [educationAddError, setEdducationAddError] = useState({
    inValid: false,
    errorMsg: "",
  });
  const [courseAddError, setCourseAddError] = useState({
    inValid: false,
    errorMsg: "",
  });
  useEffect(() => {
    let currentYear = new Date().getFullYear();
    let yearsArray = [];
    let earliestYear = 1970;
    while (currentYear >= earliestYear) {
      yearsArray.push(currentYear);
      currentYear -= 1;
    }
    setYears(yearsArray);
  }, []);

  useEffect(() => {
    if (success) {
      setEducationForm([]);
      setEducationError([]);
      setCoursesForm([]);
      setCourseError([]);
    }
  }, [success]);
  const clearError = () => {
    educationForm.forEach((education, idx) => {
      if (educationError[idx].educationTypeId.inValid) {
        const list = [...educationError];
        list[idx]["educationTypeId"]["inValid"] = false;
        list[idx]["educationTypeId"]["errorMsg"] = "";
        setEducationError(list);
      }
      if (educationError[idx].courseId.inValid) {
        const list = [...educationError];
        list[idx]["courseId"]["inValid"] = false;
        list[idx]["courseId"]["errorMsg"] = "";
        setEducationError(list);
      }
      if (educationError[idx].instituteName.inValid) {
        const list = [...educationError];
        list[idx]["instituteName"]["inValid"] = false;
        list[idx]["instituteName"]["errorMsg"] = "";
        setEducationError(list);
      }
      if (educationError[idx].percentage.inValid) {
        const list = [...educationError];
        list[idx]["percentage"]["inValid"] = false;
        list[idx]["percentage"]["errorMsg"] = "";
        setEducationError(list);
      }
      if (educationError[idx].passingYear.inValid) {
        const list = [...educationError];
        list[idx]["passingYear"]["inValid"] = false;
        list[idx]["passingYear"]["errorMsg"] = "";
        setEducationError(list);
      }
    });

    courseForm.forEach((course, idx) => {
      if (courseError[idx].courseName.inValid) {
        const list = [...courseError];
        list[idx]["courseName"]["inValid"] = false;
        list[idx]["courseName"]["errorMsg"] = "";
        setCourseError(list);
      }
      if (courseError[idx].certificateUrl.inValid) {
        const list = [...courseError];
        list[idx]["certificateUrl"]["inValid"] = false;
        list[idx]["certificateUrl"]["errorMsg"] = "";
        setCourseError(list);
      }
      if (courseError[idx].instituteName.inValid) {
        const list = [...courseError];
        list[idx]["instituteName"]["inValid"] = false;
        list[idx]["instituteName"]["errorMsg"] = "";
        setCourseError(list);
      }
      if (courseError[idx].skills.inValid) {
        const list = [...courseError];
        list[idx]["skills"]["inValid"] = false;
        list[idx]["skills"]["errorMsg"] = "";
        setCourseError(list);
      }
    });
  };

  const validate = () => {
    let flag = true;
    setEdducationAddError({
      inValid: false,
      errorMsg: "",
    });
    setCourseAddError({
      inValid: false,
      errorMsg: "",
    });
    if (educationForm.length === 0) {
      setEdducationAddError({
        inValid: true,
        errorMsg: "Please add at least one education",
      });
      flag = false;
    }
    clearError();
    educationForm.forEach((education, idx) => {
      if (education.educationTypeId === "") {
        const list = [...educationError];
        list[idx]["educationTypeId"]["inValid"] = true;
        list[idx]["educationTypeId"]["errorMsg"] = "Please select education";
        setEducationError(list);
        flag = false;
      }
      if (education.courseId === "") {
        const list = [...educationError];
        list[idx]["courseId"]["inValid"] = true;
        list[idx]["courseId"]["errorMsg"] = "Please select course";
        setEducationError(list);
        flag = false;
      }
      if (education.instituteName === "") {
        const list = [...educationError];
        list[idx]["instituteName"]["inValid"] = true;
        list[idx]["instituteName"]["errorMsg"] = "Please enter institute name";
        setEducationError(list);
        flag = false;
      } else if (/\d/.test(education.instituteName)) {
        const list = [...educationError];
        list[idx]["instituteName"]["inValid"] = true;
        list[idx]["instituteName"]["errorMsg"] =
          "Institute Name do not contain numbers";
        setEducationError(list);
        flag = false;
      }
      if (education.percentage === "") {
        const list = [...educationError];
        list[idx]["percentage"]["inValid"] = true;
        list[idx]["percentage"]["errorMsg"] = "Please enter percentage";
        setEducationError(list);
        flag = false;
      } else if (!Number(education.percentage)) {
        const list = [...educationError];
        list[idx]["percentage"]["inValid"] = true;
        list[idx]["percentage"]["errorMsg"] =
          "Percentage do not contain characters";
        setEducationError(list);
        flag = false;
      }

      if (education.percentage > 100) {
        const list = [...educationError];
        list[idx]["percentage"]["inValid"] = true;
        list[idx]["percentage"]["errorMsg"] = "Please enter valid percentage";
        setEducationError(list);
        flag = false;
      }
      if (education.passingYear === "") {
        const list = [...educationError];
        list[idx]["passingYear"]["inValid"] = true;
        list[idx]["passingYear"]["errorMsg"] = "Please select passing year";
        setEducationError(list);
        flag = false;
      }
    });

    courseForm.forEach((course, idx) => {
      if (course.courseName === "") {
        const list = [...courseError];
        list[idx]["courseName"]["inValid"] = true;
        list[idx]["courseName"]["errorMsg"] = "Please select course name";
        setCourseError(list);
        flag = false;
      }
      let regEx =
        /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;

      if (!regEx.test(course.certificateUrl)) {
        const list = [...courseError];
        list[idx]["certificateUrl"]["inValid"] = true;
        list[idx]["certificateUrl"]["errorMsg"] =
          "Please enter proper certificate url";
        setCourseError(list);
        flag = false;
      }

      if (course.instituteName === "") {
        const list = [...courseError];
        list[idx]["instituteName"]["inValid"] = true;
        list[idx]["instituteName"]["errorMsg"] = "Please enter institute name";
        setCourseError(list);
        flag = false;
      }
      if (course.skills === "") {
        const list = [...courseError];
        list[idx]["skills"]["inValid"] = true;
        list[idx]["skills"]["errorMsg"] = "Please select skills";
        setCourseError(list);
        flag = false;
      }
    });
    return !flag;
  };

  const handleEducationchange = (e, index) => {
    const { id, value } = e.target;
    const list = [...educationForm];
    list[index][id] = value;
    setEducationForm(list);
  };

  const handleCoursechange = (e, index) => {
    const list = [...courseForm];
    if (e.target.type === "select-multiple") {
      const { id } = e.target;
      let value = Array.from(
        e.target.selectedOptions,
        (option) => option.value
      ).join();
      list[index][id] = value;
      setCoursesForm(list);
    } else {
      const { id, value } = e.target;

      list[index][id] = value;
      setCoursesForm(list);
    }
  };
  function find(arr) {
    var results = arr.map((item, index) => arr.indexOf(item) !== index && true);
    return results;
  }
  const checkDuplicate = () => {
    let flag = true;
    let educationType = educationForm.map((item) => item.educationTypeId);
    let course = educationForm.map((item) => item.courseId);
    let passingYear = educationForm.map((item) => item.passingYear);

    let resultsEducationType = find(educationType);
    let resultsCourse = find(course);
    let resultsPassingYear = find(passingYear);

    resultsEducationType.forEach((item, index) => {
      if (item) {
        const list = [...educationError];
        list[index]["educationTypeId"]["inValid"] = true;
        list[index]["educationTypeId"]["errorMsg"] =
          "Please choose diffrent education type";
        setEducationError(list);
        flag = false;
      }
    });
    resultsCourse.forEach((item, index) => {
      if (item) {
        const list = [...educationError];
        list[index]["courseId"]["inValid"] = true;
        list[index]["courseId"]["errorMsg"] = "Please choose diffrent course";
        setEducationError(list);
        flag = false;
      }
    });

    resultsPassingYear.forEach((item, index) => {
      if (item) {
        const list = [...educationError];
        list[index]["passingYear"]["inValid"] = true;
        list[index]["passingYear"]["errorMsg"] =
          "Please choose diffrent passing year";
        setEducationError(list);
        flag = false;
      }
    });

    return !flag;
  };

  const handleEducation = (e) => {
    e.preventDefault();
    let isValid = validate();
    if (!isValid) {
      if (!checkDuplicate()) {
        let data = { education: educationForm, course: courseForm };
        handleSetData(data);
        handleActiveTab("3");
      }
    }
  };

  const handleAddClick = () => {
    setEducationForm([
      ...educationForm,
      {
        educationTypeId: "",
        courseId: "",
        passingYear: "",
        percentage: "",
        instituteName: "",
      },
    ]);
    setEducationError([
      ...educationError,
      {
        educationTypeId: {
          inValid: false,
          errorMsg: "",
        },
        courseId: {
          inValid: false,
          errorMsg: "",
        },
        passingYear: {
          inValid: false,
          errorMsg: "",
        },
        percentage: {
          inValid: false,
          errorMsg: "",
        },
        instituteName: {
          inValid: false,
          errorMsg: "",
        },
      },
    ]);
  };
  const handleCourseFormAddClick = () => {
    setCoursesForm([
      ...courseForm,
      {
        courseName: "",
        instituteName: "",
        certificateUrl: "http://",
        skills: "",
        skillsArray: [],
      },
    ]);
    setCourseError([
      ...courseError,
      {
        courseName: {
          inValid: false,
          errorMsg: "",
        },
        instituteName: {
          inValid: false,
          errorMsg: "",
        },
        certificateUrl: {
          inValid: false,
          errorMsg: "",
        },
        skills: {
          inValid: false,
          errorMsg: "",
        },
      },
    ]);
  };

  const handleRemoveClick = (index) => {
    setEducationForm((curr) => curr.filter((education, idx) => idx !== index));
    setEducationError((curr) =>
      curr.filter((educationError, idx) => idx !== index)
    );
  };

  const handleCourseFormRemoveClick = (index) => {
    setCoursesForm((curr) => curr.filter((course, idx) => idx !== index));
  };

  const handleBack = () => {
    // let isValid = validate();
    // if (!isValid && educationForm.length > 0 && courseForm.length > 0) {
    // if (!checkDuplicate()) {
    let data = { education: educationForm, course: courseForm };
    handleSetData(data);
    setFinalPage(false);
    handlePrv("1");
    // }
    // }
  };
  const onSelect = (selectedList, selectedItem, index) => {
    const list = [...courseForm];
    list[index]["skillsArray"] = selectedList;
    list[index]["skills"] = selectedList.map((item) => item.title).join();
    setCoursesForm(list);
  };

  const onRemove = (selectedList, removedItem, index) => {
    const list = [...courseForm];
    list[index]["skillsArray"] = selectedList;
    list[index]["skills"] = selectedList.map((item) => item.title).join();
    setCoursesForm(list);
  };

  return (
    <>
      <Card>
        <CardHeader>
          {educationAddError.inValid && (
            <Label className="text-danger mb-0">
              {educationAddError.errorMsg}
            </Label>
          )}
          <Row>
            <Col xs="3">
              <CardTitle tag="h6" className="mt-0">
                EDUCATION DETAILS
              </CardTitle>
            </Col>
            <Col xs="9" className="text-right">
              <Button color="dark" className="m-0" onClick={handleAddClick}>
                <i className="fa fa-plus mr-2" aria-hidden="true"></i>Add
                Education
              </Button>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleEducation}>
            {educationForm.map((education, educationIndex) => (
              <>
                <div className="form-row" key={educationIndex}>
                  <FormGroup className="col-md-2">
                    <Label for="educationTypeId">
                      Education Type<span className="mandatory">*</span>
                    </Label>
                    <CustomInput
                      type="select"
                      id="educationTypeId"
                      name="educationType"
                      onChange={(e) => handleEducationchange(e, educationIndex)}
                      value={education.educationTypeId}
                      invalid={
                        educationError[educationIndex]["educationTypeId"]
                          .inValid
                      }
                    >
                      <option value="">-----</option>
                      <option value="1">HSC</option>
                      <option value="2">BE</option>
                      <option value="3">ME</option>
                      <option value="4">MCA</option>
                      <option value="5">DIPLOMA</option>
                    </CustomInput>
                    <FormFeedback>
                      {
                        educationError[educationIndex]["educationTypeId"]
                          .errorMsg
                      }
                    </FormFeedback>
                  </FormGroup>
                  <FormGroup className="col-md-2">
                    <Label for="courseId">
                      Course<span className="mandatory">*</span>
                    </Label>
                    <CustomInput
                      type="select"
                      id="courseId"
                      name="Course"
                      onChange={(e) => handleEducationchange(e, educationIndex)}
                      value={education.course}
                      invalid={
                        educationError[educationIndex]["courseId"].inValid
                      }
                    >
                      <option value="">-----</option>
                      <option value="1">IT</option>
                      <option value="2">SCIENCE</option>
                      <option value="3"> ICT</option>
                      <option value="4">HR</option>
                      <option value="5">DIPLOMA</option>
                    </CustomInput>
                    <FormFeedback>
                      {educationError[educationIndex]["courseId"].errorMsg}
                    </FormFeedback>
                  </FormGroup>
                  <FormGroup></FormGroup>
                  <FormGroup className="col-md-2">
                    <Label for="passingYear">
                      Passing Year<span className="mandatory">*</span>
                    </Label>
                    <CustomInput
                      type="select"
                      id="passingYear"
                      name="PassingYear"
                      onChange={(e) => handleEducationchange(e, educationIndex)}
                      value={education.passingYear}
                      invalid={
                        educationError[educationIndex]["passingYear"].inValid
                      }
                    >
                      <option value="">-----</option>
                      {years.map((year, idx) => (
                        <option key={idx}>{year}</option>
                      ))}
                    </CustomInput>
                    <FormFeedback>
                      {educationError[educationIndex]["passingYear"].errorMsg}
                    </FormFeedback>
                  </FormGroup>
                  <FormGroup className="col-md-2">
                    <Label for="percentage">
                      CGPA/PERCENTAGE<span className="mandatory">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="percentage"
                      value={education.cgpa}
                      onChange={(e) => handleEducationchange(e, educationIndex)}
                      invalid={
                        educationError[educationIndex]["percentage"].inValid
                      }
                      maxlength="3"
                    />
                    <FormFeedback>
                      {educationError[educationIndex]["percentage"].errorMsg}
                    </FormFeedback>
                  </FormGroup>
                  <FormGroup className="col-md-3">
                    <Label for="instituteName">
                      Institute Name<span className="mandatory">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="instituteName"
                      value={education.instituteName}
                      onChange={(e) => handleEducationchange(e, educationIndex)}
                      invalid={
                        educationError[educationIndex]["instituteName"].inValid
                      }
                    />
                    <FormFeedback>
                      {educationError[educationIndex]["instituteName"].errorMsg}
                    </FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Button
                      close
                      onClick={() => handleRemoveClick(educationIndex)}
                      className="col-md-2 m-3"
                    />
                  </FormGroup>
                </div>
                <hr />
              </>
            ))}
          </form>
        </CardBody>
        <CardHeader>
          {courseAddError.inValid && (
            <Label className="text-danger mb-0">
              {courseAddError.errorMsg}
            </Label>
          )}
          <Row>
            <Col xs="4">
              <CardTitle tag="h6" className="mt-0">
                ADDITIONAL CERTIFIED COURSES & SKILLS
              </CardTitle>
            </Col>
            <Col xs="8" className="text-right">
              <Button
                color="dark"
                className="m-0"
                onClick={handleCourseFormAddClick}
              >
                <i className="fa fa-plus mr-2" aria-hidden="true"></i>Add
                Courses
              </Button>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          {courseForm.map((course, courseIndex) => (
            <>
              <div className="form-row" key={courseIndex}>
                <FormGroup className="col-md-4">
                  <Label for="courseName">
                    Course Name<span className="mandatory">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="courseName"
                    value={course.courseName}
                    onChange={(e) => handleCoursechange(e, courseIndex)}
                    invalid={courseError[courseIndex]["courseName"].inValid}
                  />
                  <FormFeedback>
                    {courseError[courseIndex]["courseName"].errorMsg}
                  </FormFeedback>
                </FormGroup>
                <FormGroup className="col-md-4">
                  <Label for="certificateUrl">
                    Certificate Url<span className="mandatory">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="certificateUrl"
                    value={course.certificateUrl}
                    onChange={(e) => handleCoursechange(e, courseIndex)}
                    invalid={courseError[courseIndex]["certificateUrl"].inValid}
                  />
                  <FormFeedback>
                    {courseError[courseIndex]["certificateUrl"].errorMsg}
                  </FormFeedback>
                </FormGroup>
                <FormGroup className="col-md-4">
                  <Label for="instituteName">
                    Institute Name<span className="mandatory">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="instituteName"
                    value={course.instituteName}
                    onChange={(e) => handleCoursechange(e, courseIndex)}
                    invalid={courseError[courseIndex]["instituteName"].inValid}
                  />
                  <FormFeedback>
                    {courseError[courseIndex]["instituteName"].errorMsg}
                  </FormFeedback>
                </FormGroup>
                <FormGroup className="col-md-6">
                  <Label for="exampleSelectMulti">
                    Skills<span className="mandatory">*</span>
                  </Label>
                  <Multiselect
                    options={skills}
                    selectedValues={course.skillsArray}
                    onSelect={(selectedList, selectedItem) =>
                      onSelect(selectedList, selectedItem, courseIndex)
                    }
                    onRemove={(selectedList, selectedItem) =>
                      onRemove(selectedList, selectedItem, courseIndex)
                    }
                    displayValue="title"
                    showCheckbox
                    avoidHighlightFirstOption
                    hidePlaceholder
                    showArrow
                    style={multiSelect}
                  />
                  {courseError[courseIndex]["skills"].inValid && (
                    <Label className="text-danger">
                      {courseError[courseIndex]["skills"].errorMsg}
                    </Label>
                  )}
                </FormGroup>
                <FormGroup>
                  <Button
                    close
                    onClick={() => handleCourseFormRemoveClick(courseIndex)}
                    className="col-md-2 m-3"
                  />
                </FormGroup>
              </div>
              <hr />
            </>
          ))}
          <Row className="col-md-12">
            <Col className="col-md-6">
              <FormGroup className=" text-left">
                <Button color="primary" className="m-0" onClick={handleBack}>
                  Back
                </Button>
              </FormGroup>
            </Col>
            <Col className="col-md-6">
              <FormGroup className=" text-right">
                <Button
                  color="primary"
                  className="m-0"
                  onClick={handleEducation}
                >
                  Next
                </Button>
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  );
};
export default Education;
