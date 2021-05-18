import React from "react"
import { Row, Col, Container } from "reactstrap"
import VerticalLinearStepper from "./Stepper"

const Step1 = ({ active }) => {
  const steps = [
    "Introduction",
    "Unique Selling Point",
    "Competitors",
    "Target Market",
    "Clients",
  ]
  return (
    <Col sm={2}>
      <div className="account-pages mt-10  pt-sm-5">
        <Container>
          <Row>
            <Col>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item active" aria-current="page">
                    <VerticalLinearStepper active={active} step={steps} />
                  </li>
                </ol>
              </nav>
            </Col>
          </Row>
        </Container>
      </div>
    </Col>
  )
}

export default Step1
