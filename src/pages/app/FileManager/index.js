import React, { useState } from "react"
import { Card, CardBody, Container } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb"

// import Component
import FileLeftBar from "./FileLeftBar"
import FileList from "./FileList"

const index = () => {
  const [data, setData] = useState({})
  const [dataKeys, setUserDataKeys] = useState([])
  const [dataValues, setUserDataValues] = useState([])

  console.log(dataKeys, dataValues)
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Apps" breadcrumbItem="File Manager" />
          <div className="d-xl-flex">
            <div className="w-100">
              <div className="d-md-flex" style={{ width: "50%" }}>
                <FileLeftBar
                  setUserDataKeys={setUserDataKeys}
                  setUserDataValues={setUserDataValues}
                />
                <div className="w-100">
                  <Card>
                    <CardBody>
                      <FileList dataKeys={dataKeys} dataValues={dataValues} />
                    </CardBody>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </React.Fragment>
  )
}
export default index
