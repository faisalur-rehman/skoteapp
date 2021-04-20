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

import { getUserDataForAdmin } from "./ApiRequest"

import { Link } from "react-router-dom"
import BusinessInfo from "./BusinessInfo"
import Competitors from "./Competitors"
import TargetMarket from "./TargetMarket"
import UniqueSelling from "./UniqueSelling"
import Clients from "./Clients"
import WebsitesYouLike from "./WebsitesYouLike"
import WebsiteColor from "./WebsiteColor"
import WebsiteContent from "./WebsiteContent"
import WebsitesYouDisLike from "./WebsitesYouDisLike"
import WebsiteStyle from "./WebsiteStyle"
import CheckList from "./CheckList"
import WebsiteGoals from "./WebsiteGoals"
import Objectives from "./Objectives"
import Sitemap from "./Sitemap"
import AdvancedFeatures from "./AdvancedFeatures"
import CallToAction from "./CallToAction"

const SingleRecord = props => {
  const [userDataKeys, setUserDataKeys] = useState([])
  const [userDataValues, setUserDataValues] = useState([])

  //   console.log(props)
  //   const [endpoint, setEndpoint] = useState()
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

  async function getData(endpoint) {
    console.log(`${endpoint}?id=${props.location.state.id}`)
    try {
      const { data } = await getUserDataForAdmin(
        `${endpoint}?id=${props.location.state.id}`,
        localStorage.getItem("token")
      )
      console.log(data)
      setUserDataKeys([...Object.keys(data[`${Object.keys(data)}`])])
      setUserDataValues([...Object.values(data[`${Object.keys(data)}`])])
    } catch (error) {
      console.log(error.response)
      //   setError(error.response)
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
            <DropdownItem onClick={() => getData("/business/introduction")}>
              Introduction
            </DropdownItem>
            <DropdownItem onClick={() => getData("/business/competitor")}>
              Competitors
            </DropdownItem>
            <DropdownItem onClick={() => getData("/business/market")}>
              Target Market
            </DropdownItem>
            <DropdownItem onClick={() => getData("/business/usp")}>
              Unique Selling
            </DropdownItem>
            <DropdownItem onClick={() => getData("/business/customer")}>
              Clients
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <br />
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle caret>Design</DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => getData("/services/design/like")}>
              Websites You LIke
            </DropdownItem>
            <DropdownItem onClick={() => getData("/services/design/dislike")}>
              Websites You DisLike
            </DropdownItem>
            <DropdownItem onClick={() => getData("/services/design/color")}>
              Websites Color
            </DropdownItem>
            <DropdownItem onClick={() => getData("/services/design/style")}>
              Websites Style
            </DropdownItem>
            <DropdownItem onClick={() => getData("/services/design/content")}>
              Websites Content
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <br />
        <Dropdown isOpen={dropdownOpen2} toggle={toggle2}>
          <DropdownToggle caret>Services/Website Goals</DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => getData("/services/checklist")}>
              CheckList
            </DropdownItem>
            <DropdownItem onClick={() => getData("/services/wg-goal")}>
              Goals
            </DropdownItem>
            <DropdownItem onClick={() => getData("/services/wg-objective")}>
              Objectives
            </DropdownItem>
            <DropdownItem onClick={() => getData("/services/wg-sitemap")}>
              Sitemap
            </DropdownItem>
            <DropdownItem
              onClick={() => getData("/services/wg-advanced-feature")}
            >
              Advanced Features
            </DropdownItem>
            <DropdownItem onClick={() => getData("/services/wg-action")}>
              Actions
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <br />
        <Dropdown isOpen={dropdownOpen3} toggle={toggle3}>
          <DropdownToggle caret>Paid Advertising</DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              onClick={() => getData("/services/advertise/service")}
            >
              Services
            </DropdownItem>
            <DropdownItem
              onClick={() => getData("/services/advertise/offer-info")}
            >
              Provide Services To
            </DropdownItem>
            <DropdownItem
              onClick={() => getData("/services/advertise/offer-competitor")}
            >
              Competitors
            </DropdownItem>
            <DropdownItem
              onClick={() => getData("/services/advertise/offer-customer")}
            >
              Clients
            </DropdownItem>
            <DropdownItem
              onClick={() => getData("/services/advertise/offer-goal")}
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
              onClick={() => getData("/services/social-media/post")}
            >
              Posting
            </DropdownItem>
            <DropdownItem
              onClick={() => getData("/services/social-media/platform")}
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
                <p>{userDataValues[index]}</p>
              </>
            ))}
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default SingleRecord
