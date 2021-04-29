import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { getUsers } from "../app/ApiRequest"
import MetaTags from "react-meta-tags"
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardTitle,
  Badge,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Media,
  Table,
} from "reactstrap"
import { Link, Redirect } from "react-router-dom"


//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//i18n
import { withTranslation } from "react-i18next"

const Dashboard = props => {
  const [users, setUsers] = useState([])
  const [clicked, setClicked] = useState(false)
  const [index, setIndex] = useState()
  const [redirect, setRedirect] = useState(false)
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      setRedirect(true)
    }
    async function fetchData() {
      try {
        const { data } = await getUsers("/user", localStorage.getItem("token"))
        console.log(data)
        setUsers(() => [...data.users])
        console.log(users)
      } catch (error) {
        console.log(error.response)
        // setError(error.response)
      }
    }
    fetchData()
  }, [])
  function handleClick(index) {
    console.log(index)
    setClicked(true)
    setIndex(index)
  }

  const reports = [
    { title: "Orders", iconClass: "bx-copy-alt", description: "1,235" },
    { title: "Revenue", iconClass: "bx-archive-in", description: "$35, 723" },
    {
      title: "Average Price",
      iconClass: "bx-purchase-tag-alt",
      description: "$16.2",
    },
  ]
  const email = [
    { title: "Week", linkto: "#", isActive: false },
    { title: "Month", linkto: "#", isActive: false },
    { title: "Year", linkto: "#", isActive: true },
  ]

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>
            Dashboard | Skote - Responsive Bootstrap 5 Admin Dashboard
          </title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t("Dashboards")}
            breadcrumbItem={props.t("Dashboard")}
          />
          <Row>
            <Col xl="12">
              <Row>
                {/* Reports Render */}
                {reports.map((report, key) => (
                  <Col md="4" key={"_col_" + key}>
                    <Card className="mini-stats-wid">
                      <CardBody>
                        <Media>
                          <Media body>
                            <p className="text-muted fw-medium">
                              {report.title}
                            </p>
                            <h4 className="mb-0">{report.description}</h4>
                          </Media>
                          <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                            <span className="avatar-title rounded-circle bg-primary">
                              <i
                                className={
                                  "bx " + report.iconClass + " font-size-24"
                                }
                              ></i>
                            </span>
                          </div>
                        </Media>
                      </CardBody>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
          {users.length > 0 && (
            <Card>
              <CardBody>
                <CardTitle className="mb-4">All Users</CardTitle>
                <div className="table-responsive">
                  <table className="table align-middle table-nowrap mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="align-middle">Name</th>
                        <th className="align-middle">Company</th>
                        <th className="align-middle">Email</th>
                        <th className="align-middle">View Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users &&
                        users.map((user, key) => (
                          <tr key={"_tr_" + key}>
                            <td>{user.name}</td>
                            <td>{user.company}</td>
                            <td>{user.email}</td>
                            <td>
                              <Button
                                color="primary"
                                size="sm"
                                className="btn-rounded waves-effect waves-light"
                                onClick={() => handleClick(key)}
                              >
                                View Details
                              </Button>
                              {clicked && (
                                <Redirect
                                  to={{
                                    pathname: "/singleRecord",
                                    state: { id: users[index]._id },
                                  }}
                                />
                              )}
                              {redirect && <Redirect to="login" />}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </CardBody>
            </Card>
          )}
        </Container>
      </div>
    </React.Fragment>
  )
}

Dashboard.propTypes = {
  t: PropTypes.any,
}

export default withTranslation()(Dashboard)
