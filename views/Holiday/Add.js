import React, { useState } from "react";
import { FormGroup, Label, Input, Button, FormFeedback } from "reactstrap";
import { Card, CardBody } from "reactstrap";
import moment from "moment";
import { useHistory } from "react-router-dom";
import axios from "./../../axios/Axios";
import { Link } from "react-router-dom";

const initHolidayError = {
  title: {
    inValid: false,
    errorMsg: "",
  },
  startDate: {
    inValid: false,
    errorMsg: "",
  },
  endDate: {
    inValid: false,
    errorMsg: "",
  },
};

const Index = () => {
  const History = useHistory();
  const [holiday, setHoliday] = useState({
    title: "",
    startDate: "",
    endDate: "",
  });

  const [holidayError, setHolidayError] = useState(initHolidayError);

  const handleChange = (e) => {
    let { id, value } = e.target;
    setHoliday((curr) => ({
      ...curr,
      [id]: value,
    }));
  };

  const handleErrorChange = (obj) => {
    setHolidayError((curr) => ({
      ...curr,
      ...obj,
    }));
  };
  const validate = () => {
    let flag = true;
    setHolidayError(initHolidayError);

    if (holiday.title === "") {
      handleErrorChange({
        title: {
          inValid: true,
          errorMsg: "Please enter title",
        },
      });
      flag = false;
    }
    if (holiday.startDate === "") {
      handleErrorChange({
        startDate: {
          inValid: true,
          errorMsg: "Please select start date",
        },
      });
      flag = false;
    }
    if (holiday.endDate === "") {
      handleErrorChange({
        endDate: {
          inValid: true,
          errorMsg: "Please select end date",
        },
      });
      flag = false;
    }

    return !flag;
  };
  const handleHoliday = async () => {
    let isValid = validate();
    if (!isValid) {
      const { success } = await axios.post("/holiday", holiday);
      if (success === true) {
        setHoliday({
          title: "",
          startDate: "",
          endDate: "",
        });
        History.push("/admin/holiday");
      }
    }
  };
  return (
    <div className="content">
      <div className="text-right">
        <Link to="/admin/holiday" className="btn bg-primary">
          Holiday List
        </Link>
      </div>
      <Card>
        <form onSubmit={() => {}}>
          <CardBody>
            <div className="form-row">
              <FormGroup className="col-md-12">
                <Label for="title">
                  Title<span className="mandatory">*</span>
                </Label>
                <Input
                  type="text"
                  id="title"
                  onChange={handleChange}
                  value={holiday.title}
                  invalid={holidayError.title.inValid}
                  maxlength="20"
                />

                <FormFeedback>{holidayError.title.errorMsg}</FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label for="startDate">
                  Start Date<span className="mandatory">*</span>
                </Label>
                <Input
                  type="date"
                  id="startDate"
                  onChange={handleChange}
                  min={moment().format("YYYY-MM-DD")}
                  value={holiday.startDate}
                  invalid={holidayError.startDate.inValid}
                  onKeyDown={(e) => e.preventDefault()}
                />

                <FormFeedback>{holidayError.startDate.errorMsg}</FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label for="endDate">
                  End Date<span className="mandatory">*</span>
                </Label>
                <Input
                  type="date"
                  id="endDate"
                  onChange={handleChange}
                  min={moment().format("YYYY-MM-DD")}
                  value={holiday.endDate}
                  invalid={holidayError.endDate.inValid}
                  onKeyDown={(e) => e.preventDefault()}
                />

                <FormFeedback>{holidayError.endDate.errorMsg}</FormFeedback>
              </FormGroup>

              <FormGroup className="col-md-12 text-right">
                <Button color="primary" className="m-0" onClick={handleHoliday}>
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

export default Index;
