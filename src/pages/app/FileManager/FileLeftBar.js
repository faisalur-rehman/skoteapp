import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Card, CardBody, Collapse } from "reactstrap"
import { formGetData } from "../ApiRequest"
import {
  getUserDataIntroduction,
  getUserDataCompetitor,
  getUserDataMarket,
  getUserDataUnique,
  getUserDataClient,
  getUserDataLike,
  getUserDataColor,
  getUserDataDisLike,
  getUserDataStyle,
  getUserDataContent,
  getUserDataService,
  getUserDataProvide,
  getUserDataPaCompetitor,
  getUserDataPaClient,
  getUserDataPaGoals,
  getUserDataPosting,
  getUserDataAccounts,
  getUserDataFbUrl,
  getUserDataAccessAccount,
  getUserDataWeb,
  getUserDataChecklist,
  getUserDataGoals,
  getUserDataObjectives,
  getUserDataSitemap,
  getUserDataAdvance,
  getUserDataAction,
} from "../ApiRequest"

const FileRightBar = ({ setUserDataKeys, setUserDataValues }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpen1, setIsOpen1] = useState(false)
  const [isOpen2, setIsOpen2] = useState(false)
  const [isOpen3, setIsOpen3] = useState(false)
  const [isOpen4, setIsOpen4] = useState(false)

  const toggle = () => setIsOpen(!isOpen)
  const toggle1 = () => setIsOpen1(!isOpen1)
  const toggle2 = () => setIsOpen2(!isOpen2)
  const toggle3 = () => setIsOpen3(!isOpen3)
  const toggle4 = () => setIsOpen4(!isOpen4)

  async function getDataIntroduction(endpoint) {
    try {
      const data = await getUserDataIntroduction(
        endpoint,
        localStorage.getItem("token")
      )
      console.log(data)
      setUserDataKeys([...Object.keys(data)])
      setUserDataValues([...Object.values(data)])
    } catch (error) {
      setError(error.response)
    }
  }

  async function getDataCompetitor(endpoint) {
    try {
      const data = await getUserDataCompetitor(
        endpoint,
        localStorage.getItem("token")
      )
      console.log(data)
      setUserDataKeys([...Object.keys(data)])
      setUserDataValues([...Object.values(data)])
    } catch (error) {
      // setError(error.response)
    }
  }

  async function getDataMarket(endpoint) {
    try {
      const data = await getUserDataMarket(
        endpoint,
        localStorage.getItem("token")
      )
      console.log(data)
      setUserDataKeys([...Object.keys(data)])
      setUserDataValues([...Object.values(data)])
    } catch (error) {
      // setError(error.response)
    }
  }
  async function getDataUnique(endpoint) {
    try {
      const data = await getUserDataUnique(
        endpoint,
        localStorage.getItem("token")
      )
      console.log(data)
      setUserDataKeys([...Object.keys(data)])
      setUserDataValues([...Object.values(data)])
    } catch (error) {
      // setError(error.response)
    }
  }

  async function getDataClient(endpoint) {
    try {
      const data = await getUserDataClient(
        endpoint,
        localStorage.getItem("token")
      )
      console.log(data)
      setUserDataKeys([...Object.keys(data)])
      setUserDataValues([...Object.values(data)])
    } catch (error) {
      // setError(error.response)
    }
  }
  async function getDataLike(endpoint) {
    try {
      const data = await getUserDataLike(
        endpoint,
        localStorage.getItem("token")
      )
      console.log(data)
      setUserDataKeys([...Object.keys(data)])
      setUserDataValues([...Object.values(data)])
    } catch (error) {
      // setError(error.response)
    }
  }
  async function getDataDisLike(endpoint) {
    try {
      const data = await getUserDataDisLike(
        endpoint,
        localStorage.getItem("token")
      )
      console.log(data)
      setUserDataKeys([...Object.keys(data)])
      setUserDataValues([...Object.values(data)])
    } catch (error) {
      // setError(error.response)
    }
  }
  async function getDataColor(endpoint) {
    try {
      const data = await getUserDataColor(
        endpoint,
        localStorage.getItem("token")
      )
      console.log(data)
      setUserDataKeys([...Object.keys(data)])
      setUserDataValues([...Object.values(data)])
    } catch (error) {
      // setError(error.response)
    }
  }
  async function getDataStyle(endpoint) {
    try {
      const data = await getUserDataStyle(
        endpoint,
        localStorage.getItem("token")
      )
      console.log(data)
      setUserDataKeys([...Object.keys(data)])
      setUserDataValues([...Object.values(data)])
    } catch (error) {
      // setError(error.response)
    }
  }
  async function getDataContent(endpoint) {
    try {
      const data = await getUserDataContent(
        endpoint,
        localStorage.getItem("token")
      )
      console.log(data)
      setUserDataKeys([...Object.keys(data)])
      setUserDataValues([...Object.values(data)])
    } catch (error) {
      // setError(error.response)
    }
  }

  async function getDataService(endpoint) {
    try {
      const data = await getUserDataService(
        endpoint,
        localStorage.getItem("token")
      )
      console.log(data)
      setUserDataKeys([...Object.keys(data)])
      setUserDataValues([...Object.values(data)])
    } catch (error) {
      // setError(error.response)
    }
  }
  async function getDataProvide(endpoint) {
    try {
      const data = await getUserDataProvide(
        endpoint,
        localStorage.getItem("token")
      )
      console.log(data)
      setUserDataKeys([...Object.keys(data)])
      setUserDataValues([...Object.values(data)])
    } catch (error) {
      // setError(error.response)
    }
  }
  async function getDataPaCompetitor(endpoint) {
    try {
      const data = await getUserDataPaCompetitor(
        endpoint,
        localStorage.getItem("token")
      )
      console.log(data)
      setUserDataKeys([...Object.keys(data)])
      setUserDataValues([...Object.values(data)])
    } catch (error) {
      // setError(error.response)
    }
  }
  async function getDataPaClients(endpoint) {
    try {
      const data = await getUserDataPaClient(
        endpoint,
        localStorage.getItem("token")
      )
      console.log(data)
      setUserDataKeys([...Object.keys(data)])
      setUserDataValues([...Object.values(data)])
    } catch (error) {
      // setError(error.response)
    }
  }
  async function getDataPaGoals(endpoint) {
    try {
      const data = await getUserDataPaGoals(
        endpoint,
        localStorage.getItem("token")
      )
      console.log(data)
      setUserDataKeys([...Object.keys(data)])
      setUserDataValues([...Object.values(data)])
    } catch (error) {
      // setError(error.response)
    }
  }

  async function getDataPaTarget(endpoint) {
    try {
      const data = await getUserDataPaTarget(
        endpoint,
        localStorage.getItem("token")
      )
      console.log(data)
      setUserDataKeys([...Object.keys(data)])
      setUserDataValues([...Object.values(data)])
    } catch (error) {
      // setError(error.response)
    }
  }

  async function getDataPosting(endpoint) {
    try {
      const data = await getUserDataPosting(
        endpoint,
        localStorage.getItem("token")
      )
      console.log(data)
      setUserDataKeys([...Object.keys(data)])
      setUserDataValues([...Object.values(data)])
    } catch (error) {
      // setError(error.response)
      console.log(error.response)
    }
  }
  async function getDataAccounts(endpoint) {
    try {
      const data = await getUserDataAccounts(
        endpoint,
        localStorage.getItem("token")
      )
      console.log(data)
      setUserDataKeys([...Object.keys(data)])
      setUserDataValues([...Object.values(data)])
    } catch (error) {
      // setError(error.response)
      console.log(error.response)
    }
  }
  async function getDataFbUrl(endpoint) {
    try {
      const data = await getUserDataFbUrl(
        endpoint,
        localStorage.getItem("token")
      )
      console.log(data)
      setUserDataKeys([...Object.keys(data)])
      setUserDataValues([...Object.values(data)])
    } catch (error) {
      // setError(error.response)
      console.log(error.response)
    }
  }

  async function getDataAccessAccount(endpoint) {
    try {
      const data = await getUserDataAccessAccount(
        endpoint,
        localStorage.getItem("token")
      )
      console.log(data)
      setUserDataKeys([...Object.keys(data)])
      setUserDataValues([...Object.values(data)])
    } catch (error) {
      // setError(error.response)
      console.log(error.response)
    }
  }
  async function getDataWeb(endpoint) {
    try {
      const data = await getUserDataWeb(endpoint, localStorage.getItem("token"))
      console.log(data)
      setUserDataKeys([...Object.keys(data)])
      setUserDataValues([...Object.values(data)])
    } catch (error) {
      // setError(error.response)
      console.log(error.response)
    }
  }
  async function getDataChecklist(endpoint) {
    try {
      const data = await getUserDataChecklist(
        endpoint,
        localStorage.getItem("token")
      )
      console.log(data)
      setUserDataKeys([...Object.keys(data)])
      setUserDataValues([...Object.values(data)])
    } catch (error) {
      // setError(error.response)
    }
  }
  async function getDataGoals(endpoint) {
    try {
      const data = await getUserDataGoals(
        endpoint,
        localStorage.getItem("token")
      )
      console.log(data)
      setUserDataKeys([...Object.keys(data)])
      setUserDataValues([...Object.values(data)])
    } catch (error) {
      // setError(error.response)
    }
  }
  async function getDataObjectives(endpoint) {
    try {
      const data = await getUserDataObjectives(
        endpoint,
        localStorage.getItem("token")
      )
      console.log(data)
      setUserDataKeys([...Object.keys(data)])
      setUserDataValues([...Object.values(data)])
    } catch (error) {
      // setError(error.response)
    }
  }
  async function getDataSitemap(endpoint) {
    try {
      const data = await getUserDataSitemap(
        endpoint,
        localStorage.getItem("token")
      )
      console.log(data)
      setUserDataKeys([...Object.keys(data)])
      setUserDataValues([...Object.values(data)])
    } catch (error) {
      // setError(error.response)
    }
  }
  async function getDataAdvance(endpoint) {
    try {
      const data = await getUserDataAdvance(
        endpoint,
        localStorage.getItem("token")
      )
      console.log(data)
      setUserDataKeys([...Object.keys(data)])
      setUserDataValues([...Object.values(data)])
    } catch (error) {
      // setError(error.response)
    }
  }
  async function getDataAction(endpoint) {
    try {
      const data = await getUserDataAction(
        endpoint,
        localStorage.getItem("token")
      )
      console.log(data)
      setUserDataKeys([...Object.keys(data)])
      setUserDataValues([...Object.values(data)])
    } catch (error) {
      // setError(error.response)
    }
  }

  return (
    <React.Fragment>
      <Card className="filemanager-sidebar me-md-2">
        <CardBody>
          <div className="d-flex flex-column h-100">
            <div className="mb-4">
              <ul className="list-unstyled categories-list">
                <li>
                  <div className="custom-accordion">
                    <Link
                      className="text-body fw-medium py-1 d-flex align-items-center"
                      onClick={toggle}
                      to="#"
                    >
                      <i className="mdi mdi-folder font-size-16 text-warning me-2"></i>
                      Business Info
                      <i
                        className={
                          isOpen
                            ? "mdi mdi-chevron-up accor-down-icon ms-auto"
                            : "mdi mdi-chevron-down accor-down-icon ms-auto"
                        }
                      />
                    </Link>
                    <Collapse isOpen={isOpen}>
                      <div className="card border-0 shadow-none ps-2 mb-0">
                        <ul className="list-unstyled mb-0">
                          <li>
                            <p
                              style={{ cursor: "pointer" }}
                              className="d-flex align-items-center"
                              onClick={() =>
                                getDataIntroduction("/business/introduction")
                              }
                            >
                              <span className="me-auto">Introduction</span>
                            </p>
                          </li>
                          <li>
                            <p
                              style={{ cursor: "pointer" }}
                              className="d-flex align-items-center"
                              onClick={() =>
                                getDataCompetitor("/business/competitor")
                              }
                            >
                              <span className="me-auto">Competitors</span>{" "}
                            </p>
                          </li>
                          <li>
                            <p
                              style={{ cursor: "pointer" }}
                              className="d-flex align-items-center"
                              onClick={() =>
                                getDataClient("/business/customer")
                              }
                            >
                              <span className="me-auto">Clients</span>{" "}
                            </p>
                          </li>
                          <li>
                            <p
                              style={{ cursor: "pointer" }}
                              className="d-flex align-items-center"
                              onClick={() => getDataMarket("/business/market")}
                            >
                              <span className="me-auto">Target Market</span>{" "}
                            </p>
                          </li>
                          <li>
                            <p
                              style={{ cursor: "pointer" }}
                              className="d-flex align-items-center"
                              onClick={() => getDataUnique("/business/usp")}
                            >
                              <span className="me-auto">
                                Unique Selling Point
                              </span>{" "}
                            </p>
                          </li>
                        </ul>
                      </div>
                    </Collapse>
                  </div>
                </li>
                <li>
                  <div className="custom-accordion">
                    <Link
                      className="text-body fw-medium py-1 d-flex align-items-center"
                      onClick={toggle1}
                      to="#"
                    >
                      <i className="mdi mdi-folder font-size-16 text-warning me-2"></i>
                      Design
                      <i
                        className={
                          isOpen1
                            ? "mdi mdi-chevron-up accor-down-icon ms-auto"
                            : "mdi mdi-chevron-down accor-down-icon ms-auto"
                        }
                      />
                    </Link>
                    <Collapse isOpen={isOpen1}>
                      <div className="card border-0 shadow-none ps-2 mb-0">
                        <ul className="list-unstyled mb-0">
                          <li>
                            <p
                              style={{ cursor: "pointer" }}
                              className="d-flex align-items-center"
                              onClick={() =>
                                getDataLike("/services/design/like")
                              }
                            >
                              <span className="me-auto">Websites You Like</span>{" "}
                            </p>
                          </li>
                          <li>
                            <p
                              style={{ cursor: "pointer" }}
                              className="d-flex align-items-center"
                              onClick={() =>
                                getDataDisLike("/services/design/dislike")
                              }
                            >
                              <span className="me-auto">
                                Websites You DisLike
                              </span>{" "}
                            </p>
                          </li>
                          <li>
                            <p
                              style={{ cursor: "pointer" }}
                              className="d-flex align-items-center"
                              onClick={() =>
                                getDataColor("/services/design/color")
                              }
                            >
                              <span className="me-auto">Website Color</span>{" "}
                            </p>
                          </li>
                          <li>
                            <p
                              style={{ cursor: "pointer" }}
                              className="d-flex align-items-center"
                              onClick={() =>
                                getDataStyle("/services/design/style")
                              }
                            >
                              <span className="me-auto">Website Style</span>{" "}
                            </p>
                          </li>
                          <li>
                            <p
                              style={{ cursor: "pointer" }}
                              className="d-flex align-items-center"
                              onClick={() =>
                                getDataContent("/services/design/content")
                              }
                            >
                              <span className="me-auto">Website Content</span>{" "}
                            </p>
                          </li>
                        </ul>
                      </div>
                    </Collapse>
                  </div>
                </li>
                <li>
                  <div className="custom-accordion">
                    <Link
                      className="text-body fw-medium py-1 d-flex align-items-center"
                      onClick={toggle2}
                      to="#"
                    >
                      <i className="mdi mdi-folder font-size-16 text-warning me-2"></i>
                      Paid Advertising
                      <i
                        className={
                          isOpen2
                            ? "mdi mdi-chevron-up accor-down-icon ms-auto"
                            : "mdi mdi-chevron-down accor-down-icon ms-auto"
                        }
                      />
                    </Link>
                    <Collapse isOpen={isOpen2}>
                      <div className="card border-0 shadow-none ps-2 mb-0">
                        <ul className="list-unstyled mb-0">
                          <li>
                            <p
                              style={{ cursor: "pointer" }}
                              className="d-flex align-items-center"
                              onClick={() =>
                                getDataService("/services/advertise/service")
                              }
                            >
                              <span className="me-auto">Services</span>{" "}
                            </p>
                          </li>
                          <li>
                            <p
                              style={{ cursor: "pointer" }}
                              className="d-flex align-items-center"
                              onClick={() =>
                                getDataProvide("/services/advertise/offer-info")
                              }
                            >
                              <span className="me-auto">
                                Provide Services To:
                              </span>{" "}
                            </p>
                          </li>
                          <li>
                            <p
                              style={{ cursor: "pointer" }}
                              className="d-flex align-items-center"
                              onClick={() =>
                                getDataPaCompetitor(
                                  "/services/advertise/offer-competitor"
                                )
                              }
                            >
                              <span className="me-auto">Competitors</span>{" "}
                            </p>
                          </li>
                          <li>
                            <p
                              style={{ cursor: "pointer" }}
                              className="d-flex align-items-center"
                              onClick={() =>
                                getDataPaGoals("/services/advertise/offer-goal")
                              }
                            >
                              <span className="me-auto">Goals</span>{" "}
                            </p>
                          </li>
                          <li>
                            <p
                              style={{ cursor: "pointer" }}
                              className="d-flex align-items-center"
                              onClick={() =>
                                getDataPaClients(
                                  "/services/advertise/offer-customer"
                                )
                              }
                            >
                              <span className="me-auto">Clients</span>{" "}
                            </p>
                          </li>
                          <li>
                            <p
                              style={{ cursor: "pointer" }}
                              className="d-flex align-items-center"
                              onClick={() =>
                                getDataTarget(
                                  "/services/advertise/offer-target"
                                )
                              }
                            >
                              <span className="me-auto">Target Market</span>{" "}
                            </p>
                          </li>
                        </ul>
                      </div>
                    </Collapse>
                  </div>
                </li>
                <li>
                  <div className="custom-accordion">
                    <Link
                      className="text-body fw-medium py-1 d-flex align-items-center"
                      onClick={toggle3}
                      to="#"
                    >
                      <i className="mdi mdi-folder font-size-16 text-warning me-2"></i>
                      Social Media Management
                      <i
                        className={
                          isOpen3
                            ? "mdi mdi-chevron-up accor-down-icon ms-auto"
                            : "mdi mdi-chevron-down accor-down-icon ms-auto"
                        }
                      />
                    </Link>
                    <Collapse isOpen={isOpen3}>
                      <div className="card border-0 shadow-none ps-2 mb-0">
                        <ul className="list-unstyled mb-0">
                          <li>
                            <p
                              style={{ cursor: "pointer" }}
                              className="d-flex align-items-center"
                              onClick={() =>
                                getDataPosting("/services/social-media/post")
                              }
                            >
                              <span className="me-auto">Posting</span>{" "}
                            </p>
                          </li>
                          <li>
                            <p
                              style={{ cursor: "pointer" }}
                              className="d-flex align-items-center"
                              onClick={() =>
                                getDataAccounts(
                                  "/services/social-media/platform"
                                )
                              }
                            >
                              <span className="me-auto">Social Accounts</span>{" "}
                            </p>
                          </li>
                          <li>
                            <p
                              style={{ cursor: "pointer" }}
                              className="d-flex align-items-center"
                              onClick={() =>
                                getDataFbUrl(
                                  "/services/social-media/fb-credential"
                                )
                              }
                            >
                              <span className="me-auto">Facebook URL</span>{" "}
                            </p>
                          </li>
                          <li>
                            <p
                              style={{ cursor: "pointer" }}
                              className="d-flex align-items-center"
                              onClick={() =>
                                getDataAccessAccount(
                                  "/services/social-media/account-info"
                                )
                              }
                            >
                              <span className="me-auto">Access Account</span>{" "}
                            </p>
                          </li>
                          <li>
                            <p
                              style={{ cursor: "pointer" }}
                              className="d-flex align-items-center"
                              onClick={() =>
                                getDataWeb("/services/social-media/web-info")
                              }
                            >
                              <span className="me-auto">Your Website</span>{" "}
                            </p>
                          </li>
                        </ul>
                      </div>
                    </Collapse>
                  </div>
                </li>
                <li>
                  <div className="custom-accordion">
                    <Link
                      className="text-body fw-medium py-1 d-flex align-items-center"
                      onClick={toggle4}
                      to="#"
                    >
                      <i className="mdi mdi-folder font-size-16 text-warning me-2"></i>
                      Services/Website Goals
                      <i
                        className={
                          isOpen4
                            ? "mdi mdi-chevron-up accor-down-icon ms-auto"
                            : "mdi mdi-chevron-down accor-down-icon ms-auto"
                        }
                      />
                    </Link>
                    <Collapse isOpen={isOpen4}>
                      <div className="card border-0 shadow-none ps-2 mb-0">
                        <ul className="list-unstyled mb-0">
                          <li>
                            <p
                              style={{ cursor: "pointer" }}
                              className="d-flex align-items-center"
                              onClick={() =>
                                getDataChecklist("/services/checklist")
                              }
                            >
                              <span className="me-auto">Checklist</span>{" "}
                            </p>
                          </li>
                          <li>
                            <p
                              style={{ cursor: "pointer" }}
                              className="d-flex align-items-center"
                              onClick={() => getDataGoals("/services/wg-goal")}
                            >
                              <span className="me-auto">Goals</span>{" "}
                            </p>
                          </li>
                          <li>
                            <p
                              style={{ cursor: "pointer" }}
                              className="d-flex align-items-center"
                              onClick={() =>
                                getDataObjectives("/services/wg-objective")
                              }
                            >
                              <span className="me-auto">Objectives</span>{" "}
                            </p>
                          </li>
                          <li>
                            <p
                              style={{ cursor: "pointer" }}
                              className="d-flex align-items-center"
                              onClick={() =>
                                getDataSitemap("/services/wg-sitemap")
                              }
                            >
                              <span className="me-auto">Sitemap</span>{" "}
                            </p>
                          </li>
                          <li>
                            <p
                              style={{ cursor: "pointer" }}
                              className="d-flex align-items-center"
                              onClick={() =>
                                getDataAdvance("/services/wg-advanced-feature")
                              }
                            >
                              <span className="me-auto">Advanced Features</span>{" "}
                            </p>
                          </li>
                          <li>
                            <p
                              style={{ cursor: "pointer" }}
                              className="d-flex align-items-center"
                              onClick={() =>
                                getDataAction("/services/wg-action")
                              }
                            >
                              <span className="me-auto">Actions</span>{" "}
                            </p>
                          </li>
                        </ul>
                      </div>
                    </Collapse>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default FileRightBar
