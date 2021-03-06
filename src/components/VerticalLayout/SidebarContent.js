import PropTypes from "prop-types"
import React, { useEffect, useRef } from "react"

// //Import Scrollbar
import SimpleBar from "simplebar-react"

// MetisMenu
import MetisMenu from "metismenujs"
import { withRouter } from "react-router-dom"
import { Link } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"

const SidebarContent = props => {
  const ref = useRef()
  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  useEffect(() => {
    const pathName = props.location.pathname

    const initMenu = () => {
      new MetisMenu("#side-menu")
      let matchingMenuItem = null
      const ul = document.getElementById("side-menu")
      const items = ul.getElementsByTagName("a")
      for (let i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i]
          break
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem)
      }
    }
    initMenu()
  }, [props.location.pathname])

  useEffect(() => {
    ref.current.recalculate()
  })

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300
      }
    }
  }

  function activateParentDropdown(item) {
    item.classList.add("active")
    const parent = item.parentElement
    const parent2El = parent.childNodes[1]
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show")
    }

    if (parent) {
      parent.classList.add("mm-active")
      const parent2 = parent.parentElement

      if (parent2) {
        parent2.classList.add("mm-show") // ul tag

        const parent3 = parent2.parentElement // li tag

        if (parent3) {
          parent3.classList.add("mm-active") // li
          parent3.childNodes[0].classList.add("mm-active") //a
          const parent4 = parent3.parentElement // ul
          if (parent4) {
            parent4.classList.add("mm-show") // ul
            const parent5 = parent4.parentElement
            if (parent5) {
              parent5.classList.add("mm-show") // li
              parent5.childNodes[0].classList.add("mm-active") // a tag
            }
          }
        }
      }
      scrollElement(item)
      return false
    }
    scrollElement(item)
    return false
  }

  return (
    <React.Fragment>
      <SimpleBar style={{ maxHeight: "100%" }} ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{props.t("Apps")}</li>

            <li>
              <Link to="/apps-filemanager" className=" waves-effect">
                <i className="bx bx-calendar"></i>
                <span>{props.t("File Manager")}</span>
              </Link>
            </li>
            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="bx bx-store"></i>
                <span>{props.t("Business Info")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/businessInfo">{props.t("Introduction")}</Link>
                </li>
                <li>
                  <Link to="/clients">{props.t("Clients")}</Link>
                </li>
                <li>
                  <Link to="/competitors">{props.t("Competitors")}</Link>
                </li>
                <li>
                  <Link to="/targetMarket">{props.t("TargetMarket")}</Link>
                </li>
                <li>
                  <Link to="/uniqueSelling">{props.t("UniqueSelling")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="bx bx-store"></i>
                <span>{props.t("Services")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/#" className="has-arrow waves-effect">
                    <span>{props.t("Website Goals")}</span>
                  </Link>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <Link to="/checklist">{props.t("CheckList")}</Link>
                    </li>
                    <li>
                      <Link to="/websiteGoals">{props.t("Goals")}</Link>
                    </li>

                    <li>
                      <Link to="/objectives">{props.t("Objectives")}</Link>
                    </li>
                    <li>
                      <Link to="/sitemap">{props.t("Sitemap")}</Link>
                    </li>
                    <li>
                      <Link to="/advancedFeatures">
                        {props.t("Advance Features")}
                      </Link>
                    </li>
                    <li>
                      <Link to="/callToAction">{props.t("Action")}</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="bx bx-store"></i>
                <span>{props.t("Design")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/websitesYouLike">
                    {props.t("Websites You Like")}
                  </Link>
                </li>
                <li>
                  <Link to="/websitesYouDisLike">
                    {props.t("Websites You DisLike")}
                  </Link>
                </li>
                <li>
                  <Link to="/websiteColor">{props.t("Website Color")}</Link>
                </li>
                <li>
                  <Link to="/websiteStyle">{props.t("Web Style")}</Link>
                </li>
                <li>
                  <Link to="/websiteContent">{props.t("Website Content")}</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="bx bx-store"></i>
                <span>{props.t("Paid Advertising")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/services">{props.t("Services")}</Link>
                </li>
                <li>
                  <Link to="/providingService">
                    {props.t("Provide Services to")}
                  </Link>
                </li>
                <li>
                  <Link to="/paCompetitors">{props.t("Competitors")}</Link>
                </li>
                <li>
                  <Link to="/paClients">{props.t("Clients")}</Link>
                </li>
                <li>
                  <Link to="/paGoals">{props.t("Goals")}</Link>
                </li>
                <li>
                  <Link to="/paTargetMarket">{props.t("Target Market")}</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="bx bx-store"></i>
                <span>{props.t("Social Media Management")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/posting">{props.t("Posting")}</Link>
                </li>
                <li>
                  <Link to="/socialAccounts">{props.t("Social Accounts")}</Link>
                </li>
                <li>
                  <Link to="/fbUrl">{props.t("Facebook URL")}</Link>
                </li>
                <li>
                  <Link to="/accessAccount">{props.t("Access Account")}</Link>
                </li>

                <li>
                  <Link to="/webInfo">{props.t("Your Website")}</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="bx bx-store"></i>
                <span>{props.t("Logo Design")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/logoDesign">{props.t("Logo Design")}</Link>
                </li>
                <li>
                  <Link to="/uploadLogo">{props.t("Upload Logo")}</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/companyDetail">
                <i className="bx bx-store"></i>
                <span>{props.t("Company Detail")}</span>
              </Link>
            </li>
            <li>
              <Link to="/account">
                <i className="bx bx-store"></i>
                <span>{props.t("Account Verification")}</span>
              </Link>
            </li>
            <li>
              <Link to="/aboutForm">
                <i className="bx bx-store"></i>
                <span>{props.t("About Form")}</span>
              </Link>
            </li>
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  )
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
}

export default withRouter(withTranslation()(SidebarContent))
