import moment from "moment";
import axios from "../../axios/Axios";
import debounce from "lodash.debounce";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  FormGroup,
  Label,
  Input,
  Button,
  CustomInput,
  Row,
  Col,
} from "reactstrap";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormFeedback,
} from "reactstrap";

const getNames = async (name, fn) => {
  if (name !== "") {
    const { success, data } = await axios.get(
      `/candidateByName?candidateName=${name}`
    );
    if (success === true) {
      fn(data);
    }
  }
};
const candidateSearch = debounce((name, fn) => getNames(name, fn), 1000);

const ScheduleInterview = () => {
  const History = useHistory();
  const [candidateName, setCandidateName] = useState("");
  useEffect(() => {
    candidateSearch(candidateName, setSearchResults);
    // debounce(getNames,1000,candidateName)
    // debounceSearch(getNames, 1000, candidate.candidateName)
    // getNames()
  }, [candidateName]);
  const [candidate, setCandidate] = useState({
    contactNo: "",
    alternateContactNo: "",
    emailId: "",
    linkedIn: "",
    referedBy: "",
    interviewdetail: [],
  });
  const [candidateError, setCandidateError] = useState({
    candidateName: {
      inValid: false,
      errorMsg: "",
    },
    contactNo: {
      inValid: false,
      errorMsg: "",
    },
    alternateContactNo: {
      inValid: false,
      errorMsg: "",
    },
    emailId: {
      inValid: false,
      errorMsg: "",
    },
    linkedIn: {
      inValid: false,
      errorMsg: "",
    },
    referedBy: {
      inValid: false,
      errorMsg: "",
    },
  });

  const [interview, setInterview] = useState([
    {
      interviewerName: "",
      interviewTypeId: "",
      date: "",
      time: "",
      interviewStatusId: "",
      technologyId: "",
      comments: "",
    },
  ]);
  const [interviewError, setInterviewError] = useState([
    {
      interviewerName: {
        inValid: false,
        errorMsg: "",
      },
      interviewTypeId: {
        inValid: false,
        errorMsg: "",
      },
      date: {
        inValid: false,
        errorMsg: "",
      },
      time: {
        inValid: false,
        errorMsg: "",
      },
      interviewStatusId: {
        inValid: false,
        errorMsg: "",
      },
      technologyId: {
        inValid: false,
        errorMsg: "",
      },
      comments: {
        inValid: false,
        errorMsg: "",
      },
    },
  ]);
  const [experienceDetails, setExperienceDetails] = useState([
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

  const [salaryDetails, setSalaryDetails] = useState({
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

  const [searchResults, setSearchResults] = useState([]);
  const handleCandidateChange = (e) => {
    let { id, value } = e.target;
    setCandidate((curr) => ({
      ...curr,
      [id]: value,
    }));
  };

  const handleSearch = (e) => {
    setCandidateName(e.target.value);
  };

  const handleInterviewChange = (e, index) => {
    const { id, value } = e.target;

    const list = [...interview];
    list[index][id] = value;

    setInterview(list);
  };

  const handleExperienceChange = (e, index) => {
    const { id, value } = e.target;

    const list = [...experienceDetails];
    list[index][id] = value;

    setExperienceDetails(list);
  };

  const handleSalaryDetailsChange = (e) => {
    let { id, value } = e.target;
    setSalaryDetails((curr) => ({
      ...curr,
      [id]: value,
    }));
  };

  const handleCandidateErrorChange = (obj) => {
    setCandidateError((curr) => ({
      ...curr,
      ...obj,
    }));
  };

  const handlesalaryDetailsError = (obj) => {
    setSalaryDetailsError((curr) => ({
      ...curr,
      ...obj,
    }));
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
    setCandidateError({
      candidateName: {
        inValid: false,
        errorMsg: "",
      },
      contactNo: {
        inValid: false,
        errorMsg: "",
      },
      alternateContactNo: {
        inValid: false,
        errorMsg: "",
      },
      emailId: {
        inValid: false,
        errorMsg: "",
      },
      linkedIn: {
        inValid: false,
        errorMsg: "",
      },
      referedBy: {
        inValid: false,
        errorMsg: "",
      },
    });
    experienceDetails.forEach((experience, idx) => {
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

    interview.forEach((interview, idx) => {
      if (interviewError[idx].interviewerName.inValid) {
        const list = [...interviewError];
        list[idx]["interviewerName"]["inValid"] = false;
        list[idx]["interviewerName"]["errorMsg"] = "";
        setInterviewError(list);
      }
      if (interviewError[idx].interviewStatusId.inValid) {
        const list = [...interviewError];
        list[idx]["interviewerName"]["inValid"] = false;
        list[idx]["interviewerName"]["errorMsg"] = "";
        setInterviewError(list);
      }
      if (interviewError[idx].date.inValid) {
        const list = [...interviewError];
        list[idx]["date"]["inValid"] = false;
        list[idx]["date"]["errorMsg"] = "";
        setInterviewError(list);
      }
      if (interviewError[idx].time.inValid) {
        const list = [...interviewError];
        list[idx]["time"]["inValid"] = false;
        list[idx]["time"]["errorMsg"] = "";
        setInterviewError(list);
      }
      if (interviewError[idx].technology.inValid) {
        const list = [...interviewError];
        list[idx]["technology"]["inValid"] = false;
        list[idx]["technology"]["errorMsg"] = "";
        setInterviewError(list);
      }
      if (interviewError[idx].comments.inValid) {
        const list = [...interviewError];
        list[idx]["comments"]["inValid"] = false;
        list[idx]["comments"]["errorMsg"] = "";
        setInterviewError(list);
      }
    });
  };
  const validate = () => {
    let flag = true;
    clearError();
    interview.forEach((interview, idx) => {
      if (interview.interviewerName === "") {
        const list = [...interviewError];
        list[idx]["interviewerName"]["inValid"] = true;
        list[idx]["interviewerName"]["errorMsg"] =
          "Please enter interviewer name";
        setInterviewError(list);
        flag = false;
      }
      if (interview.interviewStatusId === "") {
        const list = [...interviewError];
        list[idx]["interviewStatusId"]["inValid"] = true;
        list[idx]["interviewStatusId"]["errorMsg"] =
          "Please select interview status";
        setInterviewError(list);
        flag = false;
      }
      if (interview.date === "") {
        const list = [...interviewError];
        list[idx]["date"]["inValid"] = true;
        list[idx]["date"]["errorMsg"] = "Please select date";
        setInterviewError(list);
        flag = false;
      }
      if (interview.time === "") {
        const list = [...interviewError];
        list[idx]["time"]["inValid"] = true;
        list[idx]["time"]["errorMsg"] = "Please select time";
        setInterviewError(list);
        flag = false;
      }
      if (interview.technologyId === "") {
        const list = [...interviewError];
        list[idx]["technologyId"]["inValid"] = true;
        list[idx]["technologyId"]["errorMsg"] = "Please select technology";
        setInterviewError(list);
        flag = false;
      }

      if (interview.comments) {
        if (interview.comments.length < 3) {
          const list = [...interviewError];
          list[idx]["comments"]["inValid"] = true;
          list[idx]["comments"]["errorMsg"] =
            "Comments should be more than 3 characters";
          setExperienceError(list);
          flag = false;
        }
      }
    });

    experienceDetails.forEach((experience, idx) => {
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
    if (candidateName === "") {
      handleCandidateErrorChange({
        candidateName: {
          inValid: true,
          errorMsg: "Please enter candidate name.",
        },
      });
      flag = false;
    }
    if (candidate.contactNo === "") {
      handleCandidateErrorChange({
        contactNo: {
          inValid: true,
          errorMsg: "Please enter contact number.",
        },
      });
      flag = false;
    } else if (!/^[6-9]\d{9}$/.test(candidate.contactNo)) {
      handleCandidateErrorChange({
        contactNo: {
          inValid: true,
          errorMsg: "Contact should be in proper format.",
        },
      });
      flag = false;
    }
    if (candidate.alternateContactNo) {
      if (!/^[6-9]\d{9}$/.test(candidate.alternateContactNo)) {
        handleCandidateErrorChange({
          alternateContactNo: {
            inValid: true,
            errorMsg: "Alternative Contact should be in proper format.",
          },
        });
        flag = false;
      }
    }
    if (candidate.emailId === "") {
      handleCandidateErrorChange({
        emailId: {
          inValid: true,
          errorMsg: "Please enter email.",
        },
      });
      flag = false;
    } else if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        candidate.emailId
      )
    ) {
      handleCandidateErrorChange({
        emailId: {
          inValid: true,
          errorMsg: "Email should be in proper format.",
        },
      });
      flag = false;
    }
    if (candidate.referedBy) {
      if (/\d/.test(candidate.referedBy)) {
        handleCandidateErrorChange({
          referedBy: {
            inValid: true,
            errorMsg: "Refered By do not contain numbers",
          },
        });
        flag = false;
      } else if (candidate.referedBy.length < 3) {
        handleCandidateErrorChange({
          referedBy: {
            inValid: true,
            errorMsg: "Refered By should be more than 3 characters",
          },
        });
        flag = false;
      }
    }
    if (candidate.linkedIn) {
      if (candidate.linkedIn.length < 6) {
        handleCandidateErrorChange({
          linkedIn: {
            inValid: true,
            errorMsg: "Linked In should be more than 6 characters",
          },
        });
        flag = false;
      }
    }

    if (salaryDetails.lastIncrementDate === "") {
      handlesalaryDetailsError({
        lastIncrementDate: {
          inValid: true,
          errorMsg: "Please select last increment date",
        },
      });
      flag = false;
    }
    if (salaryDetails.status === "") {
      handlesalaryDetailsError({
        status: {
          inValid: true,
          errorMsg: "Please select status",
        },
      });
      flag = false;
    }
    if (salaryDetails.currentCtc === "") {
      handlesalaryDetailsError({
        currentCtc: {
          inValid: true,
          errorMsg: "Please enter current ctc",
        },
      });
      flag = false;
    } else if (!Number(salaryDetails.currentCtc)) {
      handlesalaryDetailsError({
        currentCtc: {
          inValid: true,
          errorMsg: "Current ctc do not contain character",
        },
      });
      flag = false;
    }

    if (salaryDetails.salaryBeforeIncrement === "") {
      handlesalaryDetailsError({
        salaryBeforeIncrement: {
          inValid: true,
          errorMsg: "Please enter salary before increment",
        },
      });
      flag = false;
    } else if (!Number(salaryDetails.salaryBeforeIncrement)) {
      handlesalaryDetailsError({
        salaryBeforeIncrement: {
          inValid: true,
          errorMsg: "Salary before increment do not contain characters",
        },
      });
      flag = false;
    }

    if (salaryDetails.expectedCtc === "") {
      handlesalaryDetailsError({
        expectedCtc: {
          inValid: true,
          errorMsg: "Please enter expected ctc",
        },
      });
      flag = false;
    } else if (!Number(salaryDetails.expectedCtc)) {
      handlesalaryDetailsError({
        expectedCtc: {
          inValid: true,
          errorMsg: "Expected ctc do not contain characters",
        },
      });
      flag = false;
    }

    if (salaryDetails.addNoticePeriod === "") {
      handlesalaryDetailsError({
        addNoticePeriod: {
          inValid: true,
          errorMsg: "Please enter notice period",
        },
      });
      flag = false;
    } else if (!Number(salaryDetails.addNoticePeriod)) {
      handlesalaryDetailsError({
        addNoticePeriod: {
          inValid: true,
          errorMsg: "Notice period do not contain characters",
        },
      });
      flag = false;
    } else if (salaryDetails.addNoticePeriod > 90) {
      handlesalaryDetailsError({
        addNoticePeriod: {
          inValid: true,
          errorMsg: "Notice period do not bigger than 90 days",
        },
      });
      flag = false;
    }

    if (salaryDetails.reasonForProfessionalGap === "") {
      handlesalaryDetailsError({
        reasonForProfessionalGap: {
          inValid: true,
          errorMsg: "Please enter reason for professional gap",
        },
      });
      flag = false;
    }
    return !flag;
  };

  const handleContact = (e) => {
    e.preventDefault();
    let isValid = validate();
    if (!isValid) {
    }
  };

  const handleRemoveInterviewClick = (index) => {
    setInterview((curr) => curr.filter((experiene, idx) => idx !== index));
  };

  const handleAddInterviewClick = () => {
    if (
      !(
        candidate.interviewStatusId === 1 ||
        candidate.interviewStatusId === null
      )
    )
      return;
    setInterview([
      ...interview,
      {
        interviewerName: "",
        interviewTypeId: "",
        date: "",
        time: "",
        interviewStatusId: "",
        technologyId: "",
        comments: "",
      },
    ]);
    setInterviewError([
      ...interviewError,
      {
        interviewerName: {
          inValid: false,
          errorMsg: "",
        },
        interviewTypeId: {
          inValid: false,
          errorMsg: "",
        },
        date: {
          inValid: false,
          errorMsg: "",
        },
        time: {
          inValid: false,
          errorMsg: "",
        },
        interviewStatusId: {
          inValid: false,
          errorMsg: "",
        },
        technologyId: {
          inValid: false,
          errorMsg: "",
        },
        comments: {
          inValid: false,
          errorMsg: "",
        },
      },
    ]);
  };

  const getCandidateDetails = async (id) => {
    const { success, data } = await axios.get(`candidate/${id}`);
    if (success === true) {
      setCandidate({
        ...data,
        linkedIn: data.linkedIn,
        contactNo: data.contactNumber,
        alternateContactNo: data.alternateContactNumber,
        emailId: data.email,
        id: data.id,
      });
      setCandidateName(`${data.firstName} ${data.middleName} ${data.lastName}`);
      setExperienceDetails(data.experience);
      setSalaryDetails(data.salary);
      setSearchResults([]);
    }
  };

  const handleScheduleInterview = async () => {
    let body = {
      candidateId: candidate.id,
      interviewdetail: interview,
      experiencedetail: experienceDetails,
      salarydetail: salaryDetails,
    };
    const { success } = await axios.post("/scheduleInterview", body);
    if (success === true) {
      setCandidate({});
      setExperienceDetails([]);
      setSalaryDetails([]);
      History.push("/admin/schedule-interview");
    }
  };
  return (
    <div className="content">
      <Card>
        <form onSubmit={handleContact}>
          <CardBody>
            <CardHeader className="p-0">
              <CardTitle tag="h6">CONTACT DETAILS</CardTitle>
            </CardHeader>
            <div className="form-row">
              <FormGroup className="col-md-4">
                <Label for="candidateName">Candidate Name*</Label>
                {/* <ReactSearchAutocomplete
                  items={searchResults}
                  onSelect={handleOnSelect}
                  onFocus={handleOnFocus}
                  autoFocus
                  formatResult={formatResult}
                  fuseOptions={{ keys: ["candidateName"] }}
                  //     // necessary, otherwise the results will be blank
                  resultStringKeyName="candidateName"
                /> */}
                <div className="candidate-name-part">
                  <Input
                    type="text"
                    id="candidateName"
                    value={candidateName}
                    onChange={handleSearch}
                    invalid={candidateError.candidateName.inValid}
                    // maxlength="10"
                    // onKeyUp={(e) => callSearchData(e.target.value)}
                  />
                  {searchResults.length > 0 && (
                    <div className="search-result">
                      {searchResults.map((can, index) => (
                        <div
                          key={index}
                          onClick={() => getCandidateDetails(can.id)}
                        >
                          {can.candidateName + " " + can.emailId}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <FormFeedback>
                  {candidateError.candidateName.errorMsg}
                </FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="contactNo">Contact Number*</Label>
                <Input
                  type="text"
                  id="contactNo"
                  value={candidate.contactNo}
                  onChange={handleCandidateChange}
                  invalid={candidateError.contactNo.inValid}
                  maxlength="10"
                  disabled
                />
                <FormFeedback>{candidateError.contactNo.errorMsg}</FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="alternateContactNo">Alternate Contact Number</Label>
                <Input
                  type="text"
                  id="alternateContactNo"
                  value={candidate.alternateContactNo}
                  onChange={handleCandidateChange}
                  invalid={candidateError.alternateContactNo.inValid}
                  maxlength="10"
                  disabled
                />
                <FormFeedback>
                  {candidateError.alternateContactNo.errorMsg}
                </FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="emailId">E-mail*</Label>
                <Input
                  type="email"
                  id="emailId"
                  value={candidate.emailId}
                  onChange={handleCandidateChange}
                  invalid={candidateError.emailId.inValid}
                  maxlength="64"
                  disabled
                />
                <FormFeedback>{candidateError.emailId.errorMsg}</FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="linkedIn">LinkedIn</Label>
                <Input
                  type="text"
                  id="linkedIn"
                  value={candidate.linkedIn}
                  onChange={handleCandidateChange}
                  invalid={candidateError.linkedIn.inValid}
                  maxlength="25"
                  disabled
                />
                <FormFeedback>{candidateError.linkedIn.errorMsg}</FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="referedBy">Refered By</Label>
                <Input
                  type="text"
                  id="referedBy"
                  value={candidate.referedBy}
                  onChange={handleCandidateChange}
                  invalid={candidateError.referedBy.inValid}
                  maxlength="25"
                  disabled
                />
                <FormFeedback>{candidateError.referedBy.errorMsg}</FormFeedback>
              </FormGroup>
            </div>

            <CardHeader className="p-0">
              <Row>
                <Col xs="3">
                  <CardTitle tag="h6">INTERVIEW DETAILS</CardTitle>
                </Col>
                <Col xs="9" className="text-right">
                  <Button
                    color="dark"
                    className="m-0"
                    disabled={
                      !(
                        candidate.interviewStatusId === 1 ||
                        candidate.interviewStatusId === null
                      )
                    }
                    onClick={handleAddInterviewClick}
                  >
                    <i className="fa fa-plus mr-2" aria-hidden="true"></i>Add
                    Round
                  </Button>
                  {candidate.interviewdetail?.interviewdetail?.map(
                    (interview) => (
                      <div>
                        {interview.interviewType?.title +
                          " " +
                          interview.technology?.title}
                      </div>
                    )
                  )}
                </Col>
              </Row>
            </CardHeader>
            {(candidate.interviewStatusId === 1 ||
              candidate.interviewStatusId === null) &&
              interview.map((interview, interviewIdx) => (
                <div key={interviewIdx}>
                  <FormGroup>
                    <Button
                      close
                      onClick={() => handleRemoveInterviewClick(interviewIdx)}
                      className="col-md-2 m-3"
                    />
                  </FormGroup>
                  <div className="form-row">
                    <FormGroup className="col-md-4">
                      <Label for="interviewerName">Interviewer Name*</Label>
                      <Input
                        type="text"
                        id="interviewerName"
                        value={interview.interviewerName}
                        onChange={(e) => handleInterviewChange(e, interviewIdx)}
                        invalid={
                          interviewError[interviewIdx]["interviewerName"]
                            .inValid
                        }
                        maxlength="20"
                      />
                      <FormFeedback>
                        {
                          interviewError[interviewIdx]["interviewerName"]
                            .errorMsg
                        }
                      </FormFeedback>
                    </FormGroup>
                    <FormGroup className="col-md-4">
                      <Label for="interviewType">Interview Type</Label>
                      <CustomInput
                        type="select"
                        id="interviewTypeId"
                        name="interviewTypeId"
                        onChange={(e) => handleInterviewChange(e, interviewIdx)}
                        value={interview.interviewTypeId}
                        invalid={
                          interviewError[interviewIdx]["interviewTypeId"]
                            .inValid
                        }
                      >
                        <option value="">Select interview type</option>
                        <option value="2">HR</option>
                        <option value="3">Technical</option>
                        <option value="4">Practical</option>
                      </CustomInput>
                      <FormFeedback>
                        {
                          interviewError[interviewIdx]["interviewTypeId"]
                            .errorMsg
                        }
                      </FormFeedback>
                    </FormGroup>
                    <FormGroup className="col-md-4">
                      <Label for="date">Date*</Label>
                      <Input
                        type="date"
                        id="date"
                        value={interview.date}
                        onChange={(e) => handleInterviewChange(e, interviewIdx)}
                        invalid={interviewError[interviewIdx]["date"].inValid}
                        onKeyDown={(e) => e.preventDefault()}
                        min={moment().add("1", "day").format("YYYY-MM-DD")}
                      />
                      <FormFeedback>
                        {interviewError[interviewIdx]["date"].errorMsg}
                      </FormFeedback>
                    </FormGroup>
                    <FormGroup className="col-md-4">
                      <Label for="time">time*</Label>
                      <Input
                        type="time"
                        id="time"
                        value={interview.time}
                        onChange={(e) => handleInterviewChange(e, interviewIdx)}
                        invalid={interviewError[interviewIdx]["time"].inValid}
                        onKeyDown={(e) => e.preventDefault()}
                      />
                      <FormFeedback>
                        {interviewError[interviewIdx]["time"].errorMsg}
                      </FormFeedback>
                    </FormGroup>
                    <FormGroup className="col-md-4">
                      <Label for="interviewStatusId">Interview Status*</Label>
                      <CustomInput
                        type="select"
                        id="interviewStatusId"
                        name="interviewStatusId"
                        onChange={(e) => handleInterviewChange(e, interviewIdx)}
                        value={interview.interviewStatusId}
                        invalid={
                          interviewError[interviewIdx]["interviewStatusId"]
                            .inValid
                        }
                      >
                        <option value="">Select interview status</option>
                        <option value="6">selected</option>
                        <option value="7">rejected</option>
                      </CustomInput>
                      <FormFeedback>
                        {
                          interviewError[interviewIdx]["interviewStatusId"]
                            .errorMsg
                        }
                      </FormFeedback>
                    </FormGroup>
                    <FormGroup className="col-md-4">
                      <Label for="technologyId">Technology*</Label>
                      <CustomInput
                        type="select"
                        id="technologyId"
                        name="technologyId"
                        onChange={(e) => handleInterviewChange(e, interviewIdx)}
                        value={interview.technologyId}
                        invalid={
                          interviewError[interviewIdx]["technologyId"].inValid
                        }
                      >
                        <option value="">Select technology</option>
                        <option value="1">PHP</option>
                        <option value="2">Javascript</option>
                      </CustomInput>
                      <FormFeedback>
                        {interviewError[interviewIdx]["technologyId"].errorMsg}
                      </FormFeedback>
                    </FormGroup>
                    <FormGroup className="col-md-4">
                      <Label for="comments">Comments</Label>
                      <Input
                        type="textarea"
                        id="comments"
                        value={interview.comments}
                        onChange={(e) => handleInterviewChange(e, interviewIdx)}
                        invalid={
                          interviewError[interviewIdx]["comments"].inValid
                        }
                        maxlength="60"
                      />
                      <FormFeedback>
                        {interviewError[interviewIdx]["comments"].errorMsg}
                      </FormFeedback>
                    </FormGroup>
                  </div>

                  <hr />
                </div>
              ))}
            <CardHeader className="p-0">
              <Row>
                <Col xs="3">
                  <CardTitle tag="h6">Experiecne Detail</CardTitle>
                </Col>
                <Col xs="9" className="text-right">
                  {/* <Button
                    color="dark"
                    className="m-0"
                    onClick={handleAddExperienceClick}
                  >
                    <i className="fa fa-plus mr-2" aria-hidden="true"></i>Add
                    Experiecne
                  </Button> */}
                </Col>
              </Row>
            </CardHeader>

            {experienceDetails.length > 0 &&
              experienceDetails.map((experience, experienceIndex) => (
                <div key={experienceIndex}>
                  {/* <FormGroup>
                  <Button
                    close
                    onClick={() => handleRemoveClick(experienceIndex)}
                    className="col-md-2 m-3"
                  />
                </FormGroup> */}

                  <div className="form-row">
                    <FormGroup className="col-md-4">
                      <Label for="CompanyName">Company Name*</Label>
                      <Input
                        type="text"
                        id="companyName"
                        value={experience?.companyName?.name}
                        invalid={
                          experienceError[experienceIndex]["companyName"]
                            .inValid
                        }
                        maxlength="20"
                        onChange={(e) =>
                          handleExperienceChange(e, experienceIndex)
                        }
                        disabled
                      />
                      <FormFeedback>
                        {
                          experienceError[experienceIndex]["companyName"]
                            .errorMsg
                        }
                      </FormFeedback>
                    </FormGroup>
                    <FormGroup className="col-md-4">
                      <Label for="designationId">Designation*</Label>
                      <CustomInput
                        type="select"
                        id="designationId"
                        name="Designation"
                        value={experience?.designation?.title}
                        invalid={
                          experienceError[experienceIndex]["designationId"]
                            .inValid
                        }
                        onChange={(e) =>
                          handleExperienceChange(e, experienceIndex)
                        }
                        disabled
                      >
                        <option value="">Select designation</option>
                        <option value="1">Senior Developer</option>
                        {/* <option value="2">System Analyst</option> */}
                        <option value="3">Senior Designer</option>
                        <option value="4">Project Manager</option>
                        <option value="5">Content Writer</option>
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
                        name="Technology"
                        onChange={(e) =>
                          handleExperienceChange(e, experienceIndex)
                        }
                        value={experience.technologyId}
                        invalid={
                          experienceError[experienceIndex]["technologyId"]
                            .inValid
                        }
                        disabled
                      >
                        <option value="">Select technology</option>
                        <option value="1">PHP</option>
                        <option value="2">ios</option>
                        <option value="3">ASP.net</option>
                        <option value="4">UI/UX</option>
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
                        onChange={(e) =>
                          handleExperienceChange(e, experienceIndex)
                        }
                        invalid={
                          experienceError[experienceIndex]["from"].inValid
                        }
                        max={moment().subtract("1", "month").format("YYYY-MM")}
                        onKeyDown={(e) => e.preventDefault()}
                        disabled
                      />
                      <FormFeedback>
                        {experienceError[experienceIndex]["from"].errorMsg}
                      </FormFeedback>
                    </FormGroup>
                    {experience.to === null ? (
                      <FormGroup className="col-md-4">
                        <Label>To*</Label>
                        <CustomInput
                          type="select"
                          disabled
                          value="Present"
                          disabled
                        >
                          <option>Present</option>
                          <option>Date</option>
                        </CustomInput>
                      </FormGroup>
                    ) : (
                      <FormGroup className="col-md-4">
                        <Label for="To">To*</Label>
                        <Input
                          type="month"
                          id="to"
                          value={moment(experience.to).format("YYYY-MM")}
                          onChange={(e) =>
                            handleExperienceChange(e, experienceIndex)
                          }
                          onKeyDown={(e) => e.preventDefault()}
                          disabled
                        />
                      </FormGroup>
                    )}

                    {experience.to === null && (
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
                        disabled
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
                        disabled
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
                        disabled
                      >
                        <option value="">Select reason for job change</option>
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
                        disabled
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
                </div>
              ))}

            <CardHeader className="p-0">
              <CardTitle tag="h6">Salary Detail</CardTitle>
            </CardHeader>
            <div className="form-row">
              <FormGroup className="col-md-4">
                <Label for="LastIncrementDate">Last Increment Date</Label>
                <Input
                  type="month"
                  max={moment().subtract("1", "month").format("YYYY-MM")}
                  id="lastIncrementDate"
                  value={moment(salaryDetails.lastIncrementDate).format(
                    "YYYY-MM"
                  )}
                  onChange={handleSalaryDetailsChange}
                  invalid={salaryDetailsError.lastIncrementDate.inValid}
                  onKeyDown={(e) => e.preventDefault()}
                  disabled
                />
                <FormFeedback>
                  {salaryDetailsError.lastIncrementDate.errorMsg}
                </FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="TotalExperience">Current CTC (per month)</Label>
                <Input
                  type="text"
                  id="currentCtc"
                  value={salaryDetails.currentCtc}
                  onChange={handleSalaryDetailsChange}
                  invalid={salaryDetailsError.currentCtc.inValid}
                  disabled
                />
                <FormFeedback>
                  {salaryDetailsError.currentCtc.errorMsg}
                </FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="status">Status</Label>
                <CustomInput
                  type="select"
                  id="status"
                  name="Course"
                  onChange={handleSalaryDetailsChange}
                  invalid={salaryDetailsError.status.inValid}
                  value={salaryDetails.status}
                  disabled
                >
                  <option value="">Select status</option>
                  <option>Negotiable</option>
                  <option>Non Negotible</option>
                </CustomInput>
                <FormFeedback>
                  {salaryDetailsError.status.errorMsg}
                </FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="TotalExperience">
                  Salary Before Increment (per month)
                </Label>
                <Input
                  type="text"
                  id="salaryBeforeIncrement"
                  value={salaryDetails.salaryBeforeIncrement}
                  onChange={handleSalaryDetailsChange}
                  invalid={salaryDetailsError.salaryBeforeIncrement.inValid}
                  disabled
                />
                <FormFeedback>
                  {salaryDetailsError.salaryBeforeIncrement.errorMsg}
                </FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="ExpectedCTC(per month)">
                  Expected CTC (per month)
                </Label>
                <Input
                  type="text"
                  id="expectedCtc"
                  value={salaryDetails.expectedCtc}
                  onChange={handleSalaryDetailsChange}
                  invalid={salaryDetailsError.expectedCtc.inValid}
                  disabled
                />
                <FormFeedback>
                  {salaryDetailsError.expectedCtc.errorMsg}
                </FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="AddNoticePeriod(in days)">
                  Add Notice Period (in days)
                </Label>
                <Input
                  type="text"
                  id="AddNoticePeriod"
                  value={salaryDetails.addNoticePeriod}
                  onChange={handleSalaryDetailsChange}
                  invalid={salaryDetailsError.addNoticePeriod.inValid}
                  disabled
                />
                <FormFeedback>
                  {salaryDetailsError.addNoticePeriod.errorMsg}
                </FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-12">
                <Label for="AddNoticePeriod(in days)">
                  Reason For Professional Gap(if any)
                </Label>
                <Input
                  type="textarea"
                  id="reasonForProfessionalGap"
                  value={salaryDetails.reasonForProfessionalGap}
                  onChange={handleSalaryDetailsChange}
                  invalid={salaryDetailsError.reasonForProfessionalGap.inValid}
                  disabled
                />
                <FormFeedback>
                  {salaryDetailsError.reasonForProfessionalGap.errorMsg}
                </FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-12 text-right">
                <Button
                  color="primary"
                  className="m-0"
                  onClick={handleScheduleInterview}
                >
                  Save
                </Button>
              </FormGroup>
            </div>
          </CardBody>
        </form>
      </Card>
    </div>
  );
};

export default ScheduleInterview;
