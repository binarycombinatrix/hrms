import React from "react";
import {
  FormGroup,
  Label,
  Input,
  Button,
  CustomInput,
  FormFeedback,
} from "reactstrap";
import { Card, CardBody } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { register, updateUser } from "../../../configs";
import { toast } from "react-toastify";
import CryptoJs from "crypto-js";
import axios from "../../../axios/Axios";
import { useSelector } from "react-redux";

const RegisterUser = (props) => {
  let history = useHistory();
  const existing = props.location.state;
  const roles = useSelector((state) => state.Config.config.roles);
  const formik = useFormik({
    initialValues: {
      firstName: existing ? existing.firstName : "",
      lastName: existing ? existing.lastName : "",
      email: existing ? existing.email : "",
      mobileNumber: existing ? existing.mobileNumber : "",
      roleId: existing ? String(existing.userinroles?.roleId) : "",
      passRequire: existing ? false : true,
      password: "",
      passwordConfirmation: "",
      enable: true,
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field")
        .max(15, "Must be 15 characters or less")
        .required("Please enter first name"),
      lastName: Yup.string()
        .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field")
        .max(20, "Must be 20 characters or less")
        .required("Please enter last name"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Please enter email"),
      mobileNumber: Yup.number()
        .integer()
        .min(8, "Must be 8 digits or more")
        .typeError("Please enter a valid phone number")
        .required("Please enter phone number"),
      roleId: Yup.string().required("Please select role"),
      passRequire: Yup.boolean(),
      password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W]).{8,}$/,
          "Should be of min length 8, contain upper and lower case alphabets, a digit and a symbol."
        )
        .when("passRequire", {
          is: true,
          then: Yup.string().required("Please enter password"),
        }),
      passwordConfirmation: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords must match"
      ),
      enable: Yup.boolean(),
    }),
    onSubmit: (user) => {
      // alert(JSON.stringify(user, null, 2));
      // dispatch(UserRegister(values))
      let newUser = {};
      if (user.password !== "") {
        let pass = CryptoJs.AES.encrypt(
          user.password,
          CryptoJs.SHA256(process.env.REACT_APP_PASS_KEY),
          {
            keySize: 32,
            iv: CryptoJs.enc.Base64.parse(""), //giving empty initialization vector
            mode: CryptoJs.mode.ECB,
            padding: CryptoJs.pad.Pkcs7,
          }
        ).toString();
        newUser = {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          mobileNumber: user.mobileNumber,
          password: pass,
          roleId: user.roleId,
        };
      }
      if (!existing) {
        axios
          .post(register(), newUser)
          .then((res) => {
            if (res.data && res.data.success === false) {
              toast.error(
                res.data?.message
                  ? res.data?.message
                  : "Ops! Something went wrong please try again later"
              );
            } else {
              toast.success(
                res.data?.message
                  ? res.data?.message
                  : "User added successfully"
              );
              history.push("/admin/user/list");
            }
          })
          .catch((err) => {
            toast.error("Ops! Something went wrong please try again later");
          });
      } else {
        if (user.password === "")
          newUser = {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            mobileNumber: user.mobileNumber,
            roleId: user.roleId,
          };
        axios
          .put(updateUser(existing.id), newUser)
          .then((res) => {
            if (res.data && res.data.success === false) {
              toast.error(
                res.data?.message
                  ? res.data?.message
                  : "Ops! Something went wrong please try again later"
              );
            } else {
              toast.success(
                res.data?.message
                  ? res.data?.message
                  : "User added successfully"
              );
              history.push("/admin/user/list");
            }
          })
          .catch((err) => {
            toast.error("Ops! Something went wrong please try again later");
          });
      }
    },
  });

  const handleChange = (e) => {
    const { checked } = e.target;
    if (checked) {
      formik.setFieldValue("enable", true);
    } else {
      formik.setFieldValue("enable", false);
    }
  };

  return (
    <div className="content toggle-content">
      <div className="text-right">
        <Link to="/admin/user/list" className="btn bg-primary">
          User List
        </Link>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <Card>
          <CardBody>
            {/* <CardHeader className="p-0">
              <CardTitle tag="h6">Add User</CardTitle>
            </CardHeader> */}
            <div className="form-row mt-3">
              <FormGroup className="col-md-6">
                <Label for="firstName">
                  First Name<span className="mandatory">*</span>
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  {...formik.getFieldProps("firstName")}
                />
                <FormFeedback>
                  {formik.errors.firstName ? formik.errors.firstName : null}
                </FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label for="lastName">
                  Last Name<span className="mandatory">*</span>
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  {...formik.getFieldProps("lastName")}
                />
                <FormFeedback>
                  {formik.errors.lastName ? formik.errors.lastName : null}
                </FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label for="no">
                  Mobile Number<span className="mandatory">*</span>
                </Label>
                <Input
                  id="mobileNumber"
                  type="text"
                  {...formik.getFieldProps("mobileNumber")}
                />
                <FormFeedback>
                  {formik.errors.mobileNumber
                    ? formik.errors.mobileNumber
                    : null}
                </FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label for="email">
                  Email<span className="mandatory">*</span>
                </Label>
                <Input
                  id="email"
                  type="text"
                  {...formik.getFieldProps("email")}
                />
                <FormFeedback>
                  {formik.errors.email ? formik.errors.email : null}
                </FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label for="password">
                  Password<span className="mandatory">*</span>
                </Label>
                <Input
                  id="password"
                  type="password"
                  {...formik.getFieldProps("password")}
                />
                <FormFeedback>
                  {formik.errors.password ? formik.errors.password : null}
                </FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label for="roleId">
                  Role<span className="mandatory">*</span>
                </Label>
                <Input
                  id="roleId"
                  type="select"
                  {...formik.getFieldProps("roleId")}
                >
                  <option disabled={formik.values.roleId !== ""}>select</option>
                  {roles.map((role) => (
                    <option value={role.id}>{role.role}</option>
                  ))}
                </Input>
                <FormFeedback>
                  {formik.errors.roleId ? formik.errors.roleId : null}
                </FormFeedback>
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label for="password">
                  Confirm Password<span className="mandatory">*</span>
                </Label>
                <Input
                  id="passwordConfirmation"
                  type="password"
                  {...formik.getFieldProps("passwordConfirmation")}
                />
                <FormFeedback>
                  {formik.errors.passwordConfirmation
                    ? formik.errors.passwordConfirmation
                    : null}
                </FormFeedback>
              </FormGroup>
              {/* <FormGroup className="col-md-6">
                <Label for="action">
                  Enable<span className="mandatory">*</span>
                </Label>
                <div class="custom-control custom-switch"><div class="custom-switch custom-control">
                  <Input
                  //  id="enable"
                    type="checkbox"
                    // name="enable"
                    // checked={formik.values.tags.includes(tag)}
                    value={formik.values.enable}
                    onChange={handleChange} checked={formik.values.enable} class="custom-control-input" /><label class="custom-control-label"></label></div></div>
              </FormGroup> */}
              <FormGroup className="col-md-6">
                <Label for="action">
                  Enable<span className="mandatory">*</span>
                </Label>
                <div class="custom-control custom-switch">
                  <CustomInput
                    type="switch"
                    id="enable"
                    checked={formik.values.enable}
                    onClick={handleChange}
                  />
                </div>
              </FormGroup>
            </div>
            <FormGroup className="text-right">
              <Button type="submit" color="primary" className="m-0">
                Save
              </Button>
            </FormGroup>
          </CardBody>
        </Card>
      </form>
    </div>
  );
};

export default RegisterUser;
