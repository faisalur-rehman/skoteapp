import React, { useState, useEffect } from "react"
import { Redirect, useParams } from "react-router-dom"
import { verifyEmail } from "./ApiRequest"
import { Link } from "react-router-dom"
import { Card, CardBody, Col, Container, Row } from "reactstrap"

// import images
import logodark from "../../assets/images/logo-dark.png"
import logolight from "../../assets/images/logo-light.png"
import logo from "../../assets/images/logo1.jpg"

const EmailVerfication = () => {
  const [redirect, setRedirect] = useState(false)
  const { token } = useParams()
  useEffect(() => {
    async function verificationEmail() {
      const data = await verifyEmail("api/auth/verify-email", token)
    }
    verificationEmail()
  }, [])
  return (
    <div className="account-pages my-5 pt-sm-5">
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
              <p className="mt-3">Responsive Bootstrap 5 Admin Dashboard</p>
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
                        <i className="bx bx-mail-send h1 mb-0 text-primary"></i>
                      </div>
                    </div>
                    <div className="p-2 mt-4">
                      <h4>Congratulations!</h4>
                      <p className="text-muted">
                        Your Email has been verified successfully.
                      </p>
                      <div className="mt-4">
                        <Link to="/login" className="btn btn-success">
                          Login to continue
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default EmailVerfication
