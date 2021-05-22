import React, { useEffect, useState } from "react"
import { Row, Col, Container } from "reactstrap"
import VerticalLinearStepper from "./Stepper"

const Step1 = ({ active }) => {
  const [services, setServices] = useState()
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      setRedirect(true)
    }
    async function fetchData() {
      try {
        const response = await formGetData(
          "/checklist",
          localStorage.getItem("token")
        )
        console.log(response)
        setServices({ ...response.data.checklist })
        // response && setServices([...response.data.checkList.services])
        console.log(data)
        // setError(null)
      } catch (error) {
        // setError(error.response)
        console.log(error)
      }
    }
    fetchData()
  }, [])
  const steps = [
    "Company Detail",
    "Services",
    "Your Offerings",
    "Posting",
    "Accounts",
    "Web Info",
    "Logo Design",
  ]
  services &&
    services.isLogoCreation &&
    services.isMarketing &&
    services.isWebDev &&
    services.isPaidAd &&
    (steps = [
      "Company Detail",
      "Website Goals",
      "Services",
      "Your Offerings",
      "Posting",
      "Accounts",
      "Web Info",
      "Logo Design",
    ])
  services &&
    services.isMarketing &&
    services.isWebDev &&
    services.isPaidAd &&
    (steps = [
      "Company Detail",
      "Website Goals",
      "Services",
      "Your Offerings",
      "Posting",
      "Accounts",
      "Web Info",
    ])
  services &&
    services.isWebDev &&
    services.isPaidAd &&
    (steps = ["Company Detail", "Website Goals", "Services", "Your Offerings"])
  services && services.isWebDev && (steps = ["Company Detail", "Website Goals"])
  services &&
    services.isWebDev &&
    services.isMarketing &&
    (steps = [
      "Company Detail",
      "Website Goals",
      "Posting",
      "Accounts",
      "Web Info",
    ])
  services &&
    services.isWebDev &&
    services.isLogoCreation &&
    (steps = ["Company Detail", "Website Goals", "Logo Design"])
  services &&
    services.isPaidAd(
      (steps = ["Company Detail", "Services", "Your Offerings"])
    )
  services &&
    services.isPaidAd &&
    services.isMarketing(
      (steps = [
        "Company Detail",
        "Services",
        "Your Offerings",
        "Posting",
        "Accounts",
        "Web Info",
      ])
    )
  services &&
    services.isPaidAd &&
    services.isMarketing &&
    services.isLogoCreation(
      (steps = [
        "Company Detail",
        "Services",
        "Your Offerings",
        "Posting",
        "Accounts",
        "Web Info",
        "Logo Design",
      ])
    )
  services &&
    services.isPaidAd &&
    services.isLogoCreation(
      (steps = ["Company Detail", "Services", "Your Offerings", "Logo Design"])
    )
  services &&
    services.isMarketing &&
    services.isLogoCreation(
      (steps = [
        "Company Detail",
        "Posting",
        "Accounts",
        "Web Info",
        "Logo Design",
      ])
    )
  services &&
    services.isMarketing((steps = ["Company Detail", "Posting", "Accounts"]))
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
