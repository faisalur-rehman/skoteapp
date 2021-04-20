import React, { useState, useEffect } from "react"
import {
  Container,
  Card,
  CardBody,
  CardTitle,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"

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
  getUserDataChecklist,
  getUserDataGoals,
  getUserDataObjectives,
  getUserDataSitemap,
  getUserDataAdvance,
  getUserDataAction,
  getUserDataService,
  getUserDataProvide,
  getUserDataPaCompetitor,
  getUserDataPaClient,
  getUserDataPaGoals,
  getUserDataPosting,
  getUserDataAccounts,
} from "./ApiRequest"

const SingleRecord = props => {
  const [userDataKeys, setUserDataKeys] = useState([])
  const [userDataValues, setUserDataValues] = useState([])

  const [dropdownOpen, setDropdownOpen] = useState(false)

  const toggle = () => setDropdownOpen(prevState => !prevState)

  const [dropdownOpen1, setDropdownOpen1] = useState(false)

  const toggle1 = () => setDropdownOpen1(prevState => !prevState)

  const [dropdownOpen2, setDropdownOpen2] = useState(false)

  const toggle2 = () => setDropdownOpen2(prevState => !prevState)

  const [dropdownOpen3, setDropdownOpen3] = useState(false)

  const toggle3 = () => setDropdownOpen3(prevState => !prevState)

  const [dropdownOpen4, setDropdownOpen4] = useState(false)

  const toggle4 = () => setDropdownOpen4(prevState => !prevState)

  async function getDataIntroduction(endpoint) {
    try {
      const data = await getUserDataIntroduction(
        `/business/introduction?id=${props.location.state.id}`,
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
        `/business/competitor?id=${props.location.state.id}`,
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
        `/business/market?id=${props.location.state.id}`,
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
        `/business/usp?id=${props.location.state.id}`,
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
        `${endpoint}?id=${props.location.state.id}`,
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
        `${endpoint}?id=${props.location.state.id}`,
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
        `${endpoint}?id=${props.location.state.id}`,
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
        `${endpoint}?id=${props.location.state.id}`,
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
        `${endpoint}?id=${props.location.state.id}`,
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
        `${endpoint}?id=${props.location.state.id}`,
        localStorage.getItem("token")
      )
      console.log(data)
      setUserDataKeys([...Object.keys(data)])
      setUserDataValues([...Object.values(data)])
    } catch (error) {
      // setError(error.response)
    }
  }
  async function getDataChecklist(endpoint) {
    try {
      const data = await getUserDataChecklist(
        `${endpoint}?id=${props.location.state.id}`,
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
        `${endpoint}?id=${props.location.state.id}`,
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
        `${endpoint}?id=${props.location.state.id}`,
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
        `${endpoint}?id=${props.location.state.id}`,
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
        `${endpoint}?id=${props.location.state.id}`,
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
        `${endpoint}?id=${props.location.state.id}`,
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
        `${endpoint}?id=${props.location.state.id}`,
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
        `${endpoint}?id=${props.location.state.id}`,
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
        `${endpoint}?id=${props.location.state.id}`,
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
        `${endpoint}?id=${props.location.state.id}`,
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
        `${endpoint}?id=${props.location.state.id}`,
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
        `${endpoint}?id=${props.location.state.id}`,
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
        `${endpoint}?id=${props.location.state.id}`,
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

  return (
    <div
      className="page-content"
      style={{ display: "flex", justifyContent: "flex-start" }}
    >
      <div style={{ height: "90vh" }}>
        <Dropdown isOpen={dropdownOpen1} toggle={toggle1}>
          <DropdownToggle caret>Business Info</DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              onClick={() => getDataIntroduction("/business/introduction")}
            >
              Introduction
            </DropdownItem>
            <DropdownItem
              onClick={() => getDataCompetitor("/business/competitor")}
            >
              Competitors
            </DropdownItem>
            <DropdownItem onClick={() => getDataMarket("/business/market")}>
              Target Market
            </DropdownItem>
            <DropdownItem onClick={() => getDataUnique("/business/usp")}>
              Unique Selling
            </DropdownItem>
            <DropdownItem onClick={() => getDataClient("/business/customer")}>
              Clients
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <br />
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle caret>Design</DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => getDataLike("/services/design/like")}>
              Websites You LIke
            </DropdownItem>
            <DropdownItem
              onClick={() => getDataDisLike("/services/design/dislike")}
            >
              Websites You DisLike
            </DropdownItem>
            <DropdownItem
              onClick={() => getDataColor("/services/design/color")}
            >
              Websites Color
            </DropdownItem>
            <DropdownItem
              onClick={() => getDataStyle("/services/design/style")}
            >
              Websites Style
            </DropdownItem>
            <DropdownItem
              onClick={() => getDataContent("/services/design/content")}
            >
              Websites Content
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <br />
        <Dropdown isOpen={dropdownOpen2} toggle={toggle2}>
          <DropdownToggle caret>Services/Website Goals</DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              onClick={() => getDataChecklist("/services/checklist")}
            >
              CheckList
            </DropdownItem>
            <DropdownItem onClick={() => getDataGoals("/services/wg-goal")}>
              Goals
            </DropdownItem>
            <DropdownItem
              onClick={() => getDataObjectives("/services/wg-objective")}
            >
              Objectives
            </DropdownItem>
            <DropdownItem
              onClick={() => getDataSitemap("/services/wg-sitemap")}
            >
              Sitemap
            </DropdownItem>
            <DropdownItem
              onClick={() => getDataAdvance("/services/wg-advanced-feature")}
            >
              Advanced Features
            </DropdownItem>
            <DropdownItem onClick={() => getDataAction("/services/wg-action")}>
              Actions
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <br />
        <Dropdown isOpen={dropdownOpen3} toggle={toggle3}>
          <DropdownToggle caret>Paid Advertising</DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              onClick={() => getDataService("/services/advertise/service")}
            >
              Services
            </DropdownItem>
            <DropdownItem
              onClick={() => getDataProvide("/services/advertise/offer-info")}
            >
              Provide Services To
            </DropdownItem>
            <DropdownItem
              onClick={() =>
                getDataPaCompetitor("/services/advertise/offer-competitor")
              }
            >
              Competitors
            </DropdownItem>
            <DropdownItem
              onClick={() =>
                getDataPaClients("/services/advertise/offer-customer")
              }
            >
              Clients
            </DropdownItem>
            <DropdownItem
              onClick={() => getDataPaGoals("/services/advertise/offer-goal")}
            >
              Goals
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <br />
        <Dropdown isOpen={dropdownOpen4} toggle={toggle4}>
          <DropdownToggle caret>Social Media Management</DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              onClick={() => getDataPosting("/services/social-media/post")}
            >
              Posting
            </DropdownItem>
            <DropdownItem
              onClick={() => getDataAccounts("/services/social-media/platform")}
            >
              Social Accounts
            </DropdownItem>
            <DropdownItem
              onClick={() => getData("/services/social-media/fb-credential")}
            >
              Facebook URL
            </DropdownItem>
            <DropdownItem
              onClick={() => getData("/services/social-media/account-info")}
            >
              Access Account
            </DropdownItem>
            <DropdownItem
              onClick={() => getData("/services/social-media/web-info")}
            >
              Your Website
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div>
        <h4 style={{ marginLeft: 100 }}>User Data</h4>
        <Card
          style={{ minWidth: "400px", minHeight: "150px", marginLeft: 100 }}
        >
          <CardBody>
            {userDataKeys.map((key, index) => (
              <>
                <p style={{ fontWeight: "bold" }}>{key}:</p>
                <ul>
                  {typeof userDataValues[index] === "object" ? (
                    userDataValues[index].map(value => <li>{value}</li>)
                  ) : (
                    <p>{userDataValues[index]}</p>
                  )}
                </ul>
              </>
            ))}
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default SingleRecord
