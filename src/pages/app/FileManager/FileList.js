import React from "react"
import { Link } from "react-router-dom"
import {
  Card,
  CardBody,
  Col,
  DropdownMenu,
  DropdownToggle,
  Form,
  Row,
  UncontrolledDropdown,
} from "reactstrap"

const FileList = props => {
  return (
    <React.Fragment>
      <div>
        {/* <Row className="mb-3">
          <Col xl={3} sm={6}>
            <div className="mt-2">
              <h5>Your Data</h5>
            </div>
          </Col>
        </Row> */}
      </div>
      <div style={{ marginLeft: 30 }}>
        <Row>
          {props.dataKeys.map((key, index) => (
            <>
              <p style={{ fontWeight: "bold" }}>{key}:</p>
              <ul>
                {typeof props.dataValues[index] === "object" ? (
                  props.dataValues[index].map(value => <li>{value}</li>)
                ) : (
                  <p>{props.dataValues[index]}</p>
                )}
              </ul>
            </>
          ))}
          {props.dataKeys.length <= 0 && <p>No Data Submitted</p>}
        </Row>
      </div>
    </React.Fragment>
  )
}

export default FileList
