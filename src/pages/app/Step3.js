import React from "react"
import { Row, Col, Container } from "reactstrap"
import VerticalLinearStepper from "./Stepper"

const Step3 = ({ active }) => {
  const steps = [
    "Websites You Like",
    "Websites You Dislike",
    "Website Color",
    "Website Style",
    "Website Content",
  ]
  return (
    <Col sm={2}>
      <div className="account-pages mt-10 my-5 pt-sm-5">
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

export default Step3
