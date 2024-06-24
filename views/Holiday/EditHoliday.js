import React, { useState } from "react";
import { FormGroup, Label, Input, Button, FormFeedback } from "reactstrap";
import { Card, CardHeader, CardBody, CardTitle } from "reactstrap";
import moment from "moment";
import axios from "./../../axios/Axios";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
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
  const { state } = useLocation();
  const History = useHistory();
  if (!state) {
    History.push("/admin/holiday");
  }
  const [holiday, setHoliday] = useState(
    state
      ? state
      : {
          title: "",
          startDate: "",
          endDate: "",
        }
  );

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
      const { success, message } = await axios.put(
        `/holiday/${holiday.id}`,
        holiday
      );
      if (success === true) {
        toast.success(message);
        History.push("/admin/holiday");
        setHoliday({
          title: "",
          startDate: "",
          endDate: "",
        });
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
            <CardHeader className="p-0">
              <CardTitle tag="h6">Add HOLIDAY</CardTitle>
            </CardHeader>
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
                  min={moment().add("1", "days").format("YYYY-MM-DD")}
                  value={moment(holiday.startDate).format("YYYY-MM-DD")}
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
                  min={moment().add("2", "days").format("YYYY-MM-DD")}
                  value={moment(holiday.endDate).format("YYYY-MM-DD")}
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
