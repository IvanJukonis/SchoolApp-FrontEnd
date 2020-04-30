import "./login.css";
import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import { connect } from "react-redux";
import { logIn } from "../../redux/actions/user";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";

class Login extends Component {
  constructor(props) {
    super(props);
    this.getLogin = this.getLogin.bind(this);
  }

  //captura los datos de redux
  getLogin = (values) => {
    console.log(this.props);
    this.props.logIn(values).then((response) => {
      console.log(response);
      //si las props estan autorizadas de redux
      if (this.props.isAuth) {
        //te tira al home privado
        this.props.history.push("/home");
      }
    });
  };

  render() {
    return (
      <div className="login-container">
        <Formik
          initialValues={{ name: "", password: "" }}
          onSubmit={this.getLogin}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <div className="containerLogin">
                <h5> Sign in to SchoolApp</h5>
                <div className="login">
                  <Field
                    type="text"
                    className="user"
                    name="name"
                    placeholder="Name"
                  />
                  <Field
                    type="password"
                    className="password"
                    name="password"
                    placeholder="Password"
                  />
                  {!this.props.isLoading ? (
                    <button type="submit" className="btnLogin">
                      Log In
                    </button>
                  ) : (
                      //Barrita que carga
                      <ClipLoader size={75} color={"white"} loading />
                    )}
                  <div>
                    {this.props.failedLogin ? (
                      <div id="bad-credentials">BAD CREDENTIALS</div>
                    ) : null}
                  </div>
                </div>
                <div className="btnLinks">
                  <p><Link className="btnCreateAccount" to="/register">Create Account</Link></p>
                  <p><Link className="btnHome" to="/home">Back to home</Link></p>     
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    users: state.users,
    isLoading: state.users.isLoading,
    isAuth: state.users.isAuth,
    failedLogin: state.users.failedLogin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ logIn }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);