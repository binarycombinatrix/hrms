import React, { useState, useEffect } from "react";
import axios from "../../../axios/Axios";
import {
  FormGroup,
  Label,
  Input,
  Button,
  CustomInput,
  FormFeedback,
  Row,
  Col,
} from "reactstrap";
import moment from "moment";
import { Card, CardHeader, CardBody, CardTitle } from "reactstrap";
const Activity = ({ handleSetData, success, setFinalPage, handlePrv }) => {
  const [form, setForm] = useState({
    approachDate: "",
    approachBy: "",
    candidateStatusId: "",
    note: "",
  });
  const [activityData, setActivityData] = useState([]);
  const [formError, setFormError] = useState({
    approachDate: {
      inValid: false,
      errorMsg: "",
    },
    approachBy: {
      inValid: false,
      errorMsg: "",
    },
    candidateStatusId: {
      inValid: false,
      errorMsg: "",
    },
    note: {
      inValid: false,
      errorMsg: "",
    },
  });
  useEffect(() => {
    const fetchData = async () => {
      const { success, data } = await axios.get("/activityStatus");
      if (success === true) {
        setActivityData(data);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (success) {
      setForm({
        approachDate: "",
        approachBy: "",
        candidateStatusId: "",
        note: "",
      });
      setFormError({
        approachDate: {
          inValid: false,
          errorMsg: "",
        },
        approachBy: {
          inValid: false,
          errorMsg: "",
        },
        candidateStatusId: {
          inValid: false,
          errorMsg: "",
        },
        note: {
          inValid: false,
          errorMsg: "",
        },
      });
    }
  }, [success]);
  const handleErrorChange = (obj) => {
    setFormError((curr) => ({
      ...curr,
      ...obj,
    }));
  };
  const validate = () => {
    let flag = true;
    setFormError({
      approachDate: {
        inValid: false,
        errorMsg: "",
      },
      approachBy: {
        inValid: false,
        errorMsg: "",
      },
      candidateStatusId: {
        inValid: false,
        errorMsg: "",
      },
      note: {
        inValid: false,
        errorMsg: "",
      },
    });

    if (form.approachDate === "") {
      handleErrorChange({
        approachDate: {
          inValid: true,
          errorMsg: "Please select approach date",
        },
      });
      flag = false;
    }
    if (form.approachBy === "") {
      handleErrorChange({
        approachBy: {
          inValid: true,
          errorMsg: "Please select approach by",
        },
      });
      flag = false;
    }
    if (form.candidateStatusId === "") {
      handleErrorChange({
        candidateStatusId: {
          inValid: true,
          errorMsg: "Please select status",
        },
      });
      flag = false;
    }
    // if (form.note.length < 10) {
    //   handleErrorChange({
    //     note: {
    //       inValid: true,
    //       errorMsg: "Note should be more than 5 words",
    //     },
    //   });
    //   flag = false;
    // }

    return !flag;
  };

  const handleChange = (e) => {
    let { id, value } = e.target;
    setForm((curr) => ({
      ...curr,
      [id]: value,
    }));
  };
  const handleActivity = (e) => {
    e.preventDefault();
    let isValid = validate();
    if (!isValid) {
      handleSetData({ activity: form });
      setFinalPage(true);
    }
  };

  const handleBack = () => {
    // let isValid = validate();
    // if (!isValid) {
    setFinalPage(false);
    handlePrv("3");
    // }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h6">ACTIVITY</CardTitle>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleActivity}>
          <div className="form-row">
            <FormGroup className="col-md-4">
              <Label for="From">Approach Date*</Label>
              <Input
                type="date"
                id="approachDate"
                max={moment().subtract("1", "day").format("YYYY-MM-DD")}
                onChange={handleChange}
                value={form.approachDate}
                invalid={formError.approachDate.inValid}
                onKeyDown={(e) => e.preventDefault()}
              />
              <FormFeedback>{formError.approachDate.errorMsg}</FormFeedback>
            </FormGroup>

            <FormGroup className="col-md-3">
              <Label for="exampleApproachBy">Approach By*</Label>
              <CustomInput
                type="select"
                id="approachBy"
                name="ApproachBy"
                onChange={handleChange}
                value={form.approachBy}
                invalid={formError.approachBy.inValid}
              >
                <option value="">-----</option>
                <option>Lorem</option>
                <option>ipsum</option>
              </CustomInput>
              <FormFeedback>{formError.approachBy.errorMsg}</FormFeedback>
            </FormGroup>
            <FormGroup className="col-md-3">
              <Label for="candidateStatusId">Status*</Label>
              <CustomInput
                type="select"
                id="candidateStatusId"
                name="Status"
                onChange={handleChange}
                value={form.candidateStatusId}
                invalid={formError.candidateStatusId.inValid}
              >
                <option value="">-----</option>
                {activityData.length > 0 &&
                  activityData.map((activity, activityIdx) => (
                    <option key={activityIdx} value={activity.id}>
                      {activity.name}
                    </option>
                  ))}
              </CustomInput>
              <FormFeedback>
                {formError.candidateStatusId.errorMsg}
              </FormFeedback>
            </FormGroup>
            <FormGroup className="col-md-4">
              <Label for="Skype">Note</Label>
              <Input
                type="textarea"
                id="note"
                onChange={handleChange}
                value={form.note}
                invalid={formError.note.inValid}
                maxlength="40"
              />
              <FormFeedback>{formError.note.errorMsg}</FormFeedback>
            </FormGroup>
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
                  <Button color="primary" className="m-0">
                    Save
                  </Button>
                </FormGroup>
              </Col>
            </Row>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default Activity;
