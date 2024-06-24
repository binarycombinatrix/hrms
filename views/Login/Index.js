import React, { useState } from "react";
import { useHistory } from "react-router";
import { userLogin } from "../../store/Auth/Action/Index";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Index = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const accessToken = useSelector((state) => state.Auth.user.accessToken);
  const [errMsg, setErrMsg] = useState({
    email: {
      inValid: false,
      errorMsg: "",
    },
    password: {
      inValid: false,
      errorMsg: "",
    },
  });

  if (accessToken) {
    history.push("/admin/dashboard");
  }

  const validate = () => {
    let flag = true;
    setErrMsg({
      email: {
        inValid: false,
        errorMsg: "",
      },
      password: {
        inValid: false,
        errorMsg: "",
      },
    });

    if (password === "") {
      handleErrorChange({
        password: {
          inValid: true,
          errorMsg: "Please enter password.",
        },
      });
      flag = false;
    }
    // else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W]).{8,}$/.test(password)) {
    //   handleErrorChange({
    //     password: {
    //       inValid: true,
    //       errorMsg: "The password should begin with alphanumeric, must be of min length 8 and contain a digit, a special character and upper case and one lower case alphabets"
    //     }
    //   });
    //   flag = false;
    // }

    if (email === "") {
      handleErrorChange({
        email: {
          inValid: true,
          errorMsg: "Please enter email.",
        },
      });
      flag = false;
    } else if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      handleErrorChange({
        email: {
          inValid: true,
          errorMsg: "Email should be in proper format.",
        },
      });
      flag = false;
    }

    return !flag;
  };
  const handleErrorChange = (obj) => {
    setErrMsg((curr) => ({
      ...curr,
      ...obj,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    let isValid = validate();
    if (!isValid) {
      dispatch(userLogin({ email, password }));
      history.push("/admin/dashboard");
    } else {
      // dispatch(userLogin({ email, password }));
    }
  };
  return (
    <div className="login-content">
      <>
        <main className="main d-flex align-items-center">
          <div className="container login-form">
            <div className="row">
              <div className="col-md-6 mx-auto">
                <div className="card-group">
                  <div className="card p-4">
                    <div className="card-body">
                      <div className="logo-img d-flex justify-content-center mb-5">
                        <img src="assets/img/logo.png" alt="logo" />
                      </div>
                      <form onSubmit={handleLogin}>
                        {/* <p className="text-center">Sign In to Your Account</p> */}
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fa fa-user"></i>
                            </span>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            formControlName="email"
                            placeholder="Email"
                            autocomplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div>
                          {errMsg.email.inValid && (
                            <span className="error-text-msg text-danger">
                              {errMsg.email.errorMsg}
                            </span>
                          )}
                        </div>
                        <div className="input-group mt-3">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fa fa-lock"></i>
                            </span>
                          </div>
                          <input
                            type="password"
                            className="form-control"
                            formControlName="password"
                            placeholder="Password"
                            autocomplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                        <div>
                          {errMsg.password.inValid && (
                            <span className="error-text-msg text-danger">
                              {errMsg.password.errorMsg}
                            </span>
                          )}
                        </div>
                        <div className="row mt-3">
                          <div className="col-12 text-center">
                            <button
                              type="submit"
                              className="btn btn-primary px-4"
                            >
                              Login
                            </button>
                          </div>

                          <div className="col-12 text-center">
                            <button type="button" className="btn-link">
                              Forgot password?
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    </div>
  );
};

export default Index;
