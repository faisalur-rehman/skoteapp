import React, { useState, useEffect } from "react"
import MetaTags from "react-meta-tags"
import { Link } from "react-router-dom"
import { Card, CardBody, Col, Container, Row } from "reactstrap"
import { Redirect, useParams } from "react-router-dom"
// import images
import logodark from "../../assets/images/logo-dark.png"
import logolight from "../../assets/images/logo-light.png"
import logo from "../../assets/images/logo1.jpg"

const EmailVerification = () => {
  const [redirect, setRedirect] = useState(false)
  // console.log(token)
  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
        <MetaTags>
          <title>
            Email Verification | Skote - Responsive Bootstrap 5 Admin Dashboard
          </title>
        </MetaTags>
        <Container>
          <Row>
            <Col lg={12}>
              <div className="text-center mb-5 text-muted">
                <Link to="dashboard" className="d-block auth-logo">
                  <img
                    src={logo}
                    alt=""
                    height="40"
                    className="auth-logo-dark mx-auto"
                  />
                </Link>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card>
                <CardBody>
                  <div className="p-2">
                    <div className="text-center">
                      <div className="avatar-md mx-auto">
                        <div className="avatar-title rounded-circle bg-light">
                          <i className="bx bxs-envelope h1 mb-0 text-primary"></i>
                        </div>
                      </div>
                      <div className="p-2 mt-4">
                        <h4>Verify your email</h4>
                        <p>
                          We have sent you verification email{" "}
                          {/* <span className="font-weight-semibold">
                            example@abc.com
                          </span> */}
                          , Please check it
                        </p>
                        {/* <div className="mt-4">
                          <button
                            onClick={() => setRedirect(true)}
                            className="btn btn-success w-md"
                          >
                            Verify email
                          </button>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </CardBody>
                {redirect && <Redirect to="/login" />}
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Did't receive an email ?{" "}
                  <a href="#" className="fw-medium text-primary">
                    {" "}
                    Resend{" "}
                  </a>{" "}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}
export default EmailVerification
