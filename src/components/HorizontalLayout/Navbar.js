import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"
import { Row, Col, Collapse } from "reactstrap"
import { Link, withRouter } from "react-router-dom"
import classname from "classnames"

//i18n
import { withTranslation } from "react-i18next"

import { connect } from "react-redux"

const Navbar = props => {
  const [dashboard, setdashboard] = useState(false)
  const [ui, setui] = useState(false)
  const [app, setapp] = useState(false)
  const [email, setemail] = useState(false)
  const [ecommerce, setecommerce] = useState(false)
  const [crypto, setcrypto] = useState(false)
  const [project, setproject] = useState(false)
  const [task, settask] = useState(false)
  const [contact, setcontact] = useState(false)
  const [blog, setBlog] = useState(false)
  const [component, setcomponent] = useState(false)
  const [form, setform] = useState(false)
  const [table, settable] = useState(false)
  const [chart, setchart] = useState(false)
  const [icon, seticon] = useState(false)
  const [map, setmap] = useState(false)
  const [extra, setextra] = useState(false)
  const [invoice, setinvoice] = useState(false)
  const [auth, setauth] = useState(false)
  const [utility, setutility] = useState(false)

  useEffect(() => {
    var matchingMenuItem = null
    var ul = document.getElementById("navigation")
    var items = ul.getElementsByTagName("a")
    for (var i = 0; i < items.length; ++i) {
      if (props.location.pathname === items[i].pathname) {
        matchingMenuItem = items[i]
        break
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem)
    }
  })
  function activateParentDropdown(item) {
    item.classList.add("active")
    const parent = item.parentElement
    if (parent) {
      parent.classList.add("active") // li
      const parent2 = parent.parentElement
      parent2.classList.add("active") // li
      const parent3 = parent2.parentElement
      if (parent3) {
        parent3.classList.add("active") // li
        const parent4 = parent3.parentElement
        if (parent4) {
          parent4.classList.add("active") // li
          const parent5 = parent4.parentElement
          if (parent5) {
            parent5.classList.add("active") // li
            const parent6 = parent5.parentElement
            if (parent6) {
              parent6.classList.add("active") // li
            }
          }
        }
      }
    }
    return false
  }

  return (
    <React.Fragment>
      <div className="topnav">
        <div className="container-fluid">
          <nav
            className="navbar navbar-light navbar-expand-lg topnav-menu"
            id="navigation"
          >
            <Collapse
              isOpen={props.leftMenu}
              className="navbar-collapse"
              id="topnav-menu-content"
            >
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle arrow-none"
                    onClick={e => {
                      e.preventDefault()
                      setdashboard(!dashboard)
                    }}
                    to="dashboard"
                  >
                    <i className="bx bx-home-circle ms-2"></i>
                    {props.t("Dashboard")} {props.menuOpen}
                    <div className="arrow-down"></div>
                  </Link>
                  <div
                    className={classname("dropdown-menu", { show: dashboard })}
                  >
                    <Link to="dashboard" className="dropdown-item">
                      {props.t("Default")}
                    </Link>
                    <Link to="dashboard-saas" className="dropdown-item">
                      {props.t("Saas")}
                    </Link>
                    <Link to="dashboard-crypto" className="dropdown-item">
                      {props.t("Crypto")}
                    </Link>
                    <Link to="blog" className="dropdown-item">
                      {props.t("Blog")}
                    </Link>
                  </div>
                </li>

                <li className="nav-item dropdown">
                  <Link
                    to="/#"
                    onClick={e => {
                      e.preventDefault()
                      setapp(!app)
                    }}
                    className="nav-link dropdown-togglez arrow-none"
                  >
                    <i className="bx bx-customize ms-2"></i>
                    {props.t("Apps")} <div className="arrow-down"></div>
                  </Link>
                  <div className={classname("dropdown-menu", { show: app })}>
                    <Link to="calendar" className="dropdown-item">
                      {props.t("Calendar")}
                    </Link>
                    <Link to="chat" className="dropdown-item">
                      {props.t("Chat")}
                    </Link>
                    <Link to="apps-filemanager" className="dropdown-item">
                      {props.t("File Manager")}
                    </Link>
                    <div className="dropdown">
                      <Link
                        to="/#"
                        className="dropdown-item dropdown-toggle arrow-none"
                        onClick={e => {
                          e.preventDefault()
                          setemail(!email)
                        }}
                      >
                        {props.t("Email")} <div className="arrow-down"></div>
                      </Link>
                      <div
                        className={classname("dropdown-menu", { show: email })}
                      >
                        <Link to="email-inbox" className="dropdown-item">
                          {props.t("Inbox")}
                        </Link>
                        <Link to="email-read" className="dropdown-item">
                          {props.t("Read Email")}
                        </Link>
                        <div className="dropdown">
                          <Link
                            className="dropdown-item dropdown-toggle arrow-none"
                            to="/#"
                            onClick={e => {
                              e.preventDefault()
                              setemail(!email)
                            }}
                          >
                            <span key="t-email-templates">Templates</span>{" "}
                            <div className="arrow-down"></div>
                          </Link>
                          <div
                            className={classname("dropdown-menu", {
                              show: email,
                            })}
                          >
                            <Link
                              to="email-template-basic"
                              className="dropdown-item"
                            >
                              {props.t("Basic Action")}
                            </Link>
                            <Link
                              to="email-template-alert"
                              className="dropdown-item"
                            >
                              {props.t("Alert Email")}
                            </Link>
                            <Link
                              to="email-template-billing"
                              className="dropdown-item"
                            >
                              {props.t("Billing Email")}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="dropdown">
                      <Link
                        to="/#"
                        className="dropdown-item dropdown-toggle arrow-none"
                        onClick={e => {
                          e.preventDefault()
                          setecommerce(!ecommerce)
                        }}
                      >
                        {props.t(" Ecommerce")}{" "}
                        <div className="arrow-down"></div>
                      </Link>
                      <div
                        className={classname("dropdown-menu", {
                          show: ecommerce,
                        })}
                      >
                        <Link to="ecommerce-products" className="dropdown-item">
                          {props.t("Products")}
                        </Link>
                        <Link
                          to="ecommerce-product-detail"
                          className="dropdown-item"
                        >
                          {props.t("Product Detail")}
                        </Link>
                        <Link to="ecommerce-orders" className="dropdown-item">
                          {props.t("Orders")}
                        </Link>
                        <Link
                          to="ecommerce-customers"
                          className="dropdown-item"
                        >
                          {props.t("Customers")}
                        </Link>
                        <Link to="ecommerce-cart" className="dropdown-item">
                          {props.t("Cart")}
                        </Link>
                        <Link to="ecommerce-checkout" className="dropdown-item">
                          {props.t("Checkout")}
                        </Link>
                        <Link to="ecommerce-shops" className="dropdown-item">
                          {props.t("Shops")}
                        </Link>
                        <Link
                          to="ecommerce-add-product"
                          className="dropdown-item"
                        >
                          {props.t("Add Product")}
                        </Link>
                      </div>
                    </div>

                    <div className="dropdown">
                      <Link
                        to="/#"
                        className="dropdown-item dropdown-toggle arrow-none"
                        onClick={e => {
                          e.preventDefault()
                          setcrypto(!crypto)
                        }}
                      >
                        {props.t("Crypto")} <div className="arrow-down"></div>
                      </Link>
                      <div
                        className={classname("dropdown-menu", { show: crypto })}
                      >
                        <Link to="crypto-wallet" className="dropdown-item">
                          {props.t("Wallet")}
                        </Link>
                        <Link to="crypto-buy-sell" className="dropdown-item">
                          {props.t("Buy/Sell")}
                        </Link>
                        <Link to="crypto-exchange" className="dropdown-item">
                          {props.t("Exchange")}
                        </Link>
                        <Link to="crypto-lending" className="dropdown-item">
                          {props.t("Lending")}
                        </Link>
                        <Link to="crypto-orders" className="dropdown-item">
                          {props.t("Orders")}
                        </Link>
                        <Link
                          to="crypto-kyc-application"
                          className="dropdown-item"
                        >
                          {props.t("KYC Application")}
                        </Link>
                        <Link to="crypto-ico-landing" className="dropdown-item">
                          {props.t("ICO Landing")}
                        </Link>
                      </div>
                    </div>

                    <div className="dropdown">
                      <Link
                        to="/#"
                        className="dropdown-item dropdown-toggle arrow-none"
                        onClick={e => {
                          e.preventDefault()
                          setproject(!project)
                        }}
                      >
                        {props.t("Projects")} <div className="arrow-down"></div>
                      </Link>
                      <div
                        className={classname("dropdown-menu", {
                          show: project,
                        })}
                      >
                        <Link to="projects-grid" className="dropdown-item">
                          {props.t("Projects Grid")}
                        </Link>
                        <Link to="projects-list" className="dropdown-item">
                          {props.t("Projects List")}
                        </Link>
                        <Link to="projects-overview" className="dropdown-item">
                          {props.t("Project Overview")}
                        </Link>
                        <Link to="projects-create" className="dropdown-item">
                          {props.t("Create New")}
                        </Link>
                      </div>
                    </div>
                    <div className="dropdown">
                      <Link
                        to="/#"
                        className="dropdown-item dropdown-toggle arrow-none"
                        onClick={e => {
                          e.preventDefault()
                          settask(!task)
                        }}
                      >
                        {props.t("Tasks")} <div className="arrow-down"></div>
                      </Link>
                      <div
                        className={classname("dropdown-menu", { show: task })}
                      >
                        <Link to="tasks-list" className="dropdown-item">
                          {props.t("Task List")}
                        </Link>
                        <Link to="tasks-kanban" className="dropdown-item">
                          {props.t("Kanban Board")}
                        </Link>
                        <Link to="tasks-create" className="dropdown-item">
                          {props.t("Create Task")}
                        </Link>
                      </div>
                    </div>
                    <div className="dropdown">
                      <Link
                        to="/#"
                        className="dropdown-item dropdown-toggle arrow-none"
                        onClick={e => {
                          e.preventDefault()
                          setcontact(!contact)
                        }}
                      >
                        {props.t("Contacts")} <div className="arrow-down"></div>
                      </Link>
                      <div
                        className={classname("dropdown-menu", {
                          show: contact,
                        })}
                      >
                        <Link to="contacts-grid" className="dropdown-item">
                          {props.t("User Grid")}
                        </Link>
                        <Link to="contacts-list" className="dropdown-item">
                          {props.t("User List")}
                        </Link>
                        <Link to="contacts-profile" className="dropdown-item">
                          {props.t("Profile")}
                        </Link>
                      </div>
                    </div>
                    <div className="dropdown">
                      <Link
                        to="/#"
                        className="dropdown-item dropdown-toggle arrow-none"
                        onClick={e => {
                          e.preventDefault()
                          setBlog(!blog)
                        }}
                      >
                        {props.t("Blog")} <div className="arrow-down" />
                      </Link>
                      <div
                        className={classname("dropdown-menu", {
                          show: blog,
                        })}
                      >
                        <Link to="blog-list" className="dropdown-item">
                          {props.t("Blog List")}
                        </Link>
                        <Link to="blog-grid" className="dropdown-item">
                          {props.t("Blog Grid")}
                        </Link>
                        <Link to="blog-details" className="dropdown-item">
                          {props.t("Blog Details")}
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </Collapse>
          </nav>
        </div>
      </div>
    </React.Fragment>
  )
}

Navbar.propTypes = {
  leftMenu: PropTypes.any,
  location: PropTypes.any,
  menuOpen: PropTypes.any,
  t: PropTypes.any,
}

const mapStatetoProps = state => {
  const { leftMenu } = state.Layout
  return { leftMenu }
}

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(Navbar))
)
