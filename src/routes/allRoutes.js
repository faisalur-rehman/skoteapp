import React from "react"
import { Redirect } from "react-router-dom"

// Profile
import UserProfile from "../pages/Authentication/user-profile"
// import images

// Dashboard
import Dashboard from "../pages/Dashboard/index"

//Forms
import AboutForm from "../pages/app/AboutForm"
import AccountVerification from "../pages/app/AccountVerification"
import BusinessInfo from "../pages/app/BusinessInfo"
import Clients from "../pages/app/Clients"
import Competitors from "../pages/app/Competitors"
import TargetMarket from "pages/app/TargetMarket"
import UniqueSelling from "pages/app/UniqueSelling"
import CompanyDetail from "pages/app/CompanyDetail"
import WebsiteColor from "pages/app/WebsiteColor"
import WebsiteContent from "pages/app/WebsiteContent"
import WebsiteStyle from "pages/app/WebsiteStyle"
import WebsitesYouDisLike from "pages/app/WebsitesYouDisLike"
import WebsitesYouLike from "pages/app/WebsitesYouLike"
import Login from "pages/app/Login"
import ForgotPassword from "pages/app/ForgotPassword"
import Register from "pages/app/Register"
import WebsiteGoals from "pages/app/WebsiteGoals"
import CallToAction from "pages/app/CallToAction"
import CheckList from "pages/app/CheckList"
import Objectives from "pages/app/Objectives"
import Sitemap from "pages/app/Sitemap"
import AdvancedFeatures from "pages/app/AdvancedFeatures"
import Services from "pages/app/Services"
import ProvidingService from "pages/app/ProvidingService"
import PACompetitors from "pages/app/PACompetitors"
import PAClients from "pages/app/PAClients"
import PAGoals from "pages/app/PAGoals"
import PATargetMarket from "pages/app/PATargetMarket"
import Posting from "pages/app/Posting"
import CantTalkAbout from "pages/app/CantTalkAbout"
import Comments from "pages/app/Comments"

export const publicRoutes = [
  { path: "/login", component: Login },
  { path: "/resetPassword", component: ForgotPassword },
  { path: "/register", component: Register },
]

const userRoutes = [
  { path: "/dashboard", component: Dashboard },

  // //profile
  { path: "/profile", component: UserProfile },

  //Forms Route

  { path: "/aboutform", component: AboutForm },
  { path: "/account", component: AccountVerification },
  { path: "/businessInfo", component: BusinessInfo },
  { path: "/clients", component: Clients },
  { path: "/competitors", component: Competitors },
  { path: "/targetMarket", component: TargetMarket },
  { path: "/uniqueSelling", component: UniqueSelling },
  { path: "/companyDetail", component: CompanyDetail },
  { path: "/websiteColor", component: WebsiteColor },
  { path: "/websiteContent", component: WebsiteContent },
  { path: "/websiteStyle", component: WebsiteStyle },
  { path: "/websitesYouDisLike", component: WebsitesYouDisLike },
  { path: "/websitesYouLike", component: WebsitesYouLike },
  { path: "/websiteGoals", component: WebsiteGoals },
  { path: "/callToAction", component: CallToAction },
  { path: "/checkList", component: CheckList },
  { path: "/objectives", component: Objectives },
  { path: "/sitemap", component: Sitemap },
  { path: "/advancedFeatures", component: AdvancedFeatures },
  { path: "/posting", component: Posting },

  //Paid Advertising Module
  { path: "/services", component: Services },
  { path: "/providingService", component: ProvidingService },
  { path: "/paCompetitors", component: PACompetitors },
  { path: "/paClients", component: PAClients },
  { path: "/paGoals", component: PAGoals },
  { path: "/paTargetMarket", component: PATargetMarket },

  //Social Media Management

  { path: "/posting", component: Posting },
  { path: "/cantTalkAbout", component: CantTalkAbout },
  { path: "/comments", component: Comments },

  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
]

export { userRoutes }
