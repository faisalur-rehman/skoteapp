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
import SocialAccount from "pages/app/SocialAccounts"
import FacebookUrl from "pages/app/FacebookUrl"
import AccessAccount from "pages/app/AccessAccount"
import AdAccount from "pages/app/AdAccount"
import LogoDesign from "pages/app/LogoDesign"
import WebInfo from "pages/app/WebInfo"
import SingleRecord from "pages/app/SingleRecord"
import VerifyEmail from "pages/app/VerifyEmail"
import UploadLogo from "pages/app/UploadLogo"
import FileManager from "pages/app/FileManager/index"
import EmailVerfication from "pages/app/EmailVerfication"
import StepperExample from "pages/app/Stepper"

export const publicRoutes = [
  { path: "/login", component: Login },
  { path: "/resetPassword", component: ForgotPassword },
  { path: "/register", component: Register },
  { path: "/verifyEmail", component: VerifyEmail },
  { path: "/businessInfo", component: BusinessInfo },
  { path: "/clients", component: Clients },
  { path: "/competitors", component: Competitors },
  { path: "/targetMarket", component: TargetMarket },
  { path: "/uniqueSelling", component: UniqueSelling },
  { path: "/websitesYouLike", component: WebsitesYouLike },
  { path: "/websiteColor", component: WebsiteColor },
  { path: "/websiteContent", component: WebsiteContent },
  { path: "/websiteStyle", component: WebsiteStyle },
  { path: "/websitesYouDisLike", component: WebsitesYouDisLike },
  { path: "/websiteGoals", component: WebsiteGoals },
  { path: "/services", component: Services },
  { path: "/providingService", component: ProvidingService },
  { path: "/paCompetitors", component: PACompetitors },
  { path: "/paClients", component: PAClients },
  { path: "/paGoals", component: PAGoals },
  { path: "/posting", component: Posting },

  { path: "/socialAccounts", component: SocialAccount },
  { path: "/fbUrl", component: FacebookUrl },
  { path: "/accessAccount", component: AccessAccount },
  { path: "/adAccount", component: AdAccount },
  { path: "/webInfo", component: WebInfo },

  { path: "/logoDesign", component: LogoDesign },
  { path: "/paTargetMarket", component: PATargetMarket },
  { path: "/checkList", component: CheckList },
  { path: "/objectives", component: Objectives },
  { path: "/advancedFeatures", component: AdvancedFeatures },
  { path: "/posting", component: Posting },
  { path: "/uploadLogo", component: UploadLogo },
  { path: "/aboutform", component: AboutForm },
  { path: "/account", component: AccountVerification },
  { path: "/companyDetail", component: CompanyDetail },
  { path: "/callToAction", component: CallToAction },
  { path: "/sitemap", component: Sitemap },
  { path: "/verify/:token", component: EmailVerfication },
  { path: "/stepper", component: StepperExample },
]

const userRoutes = [
  { path: "/dashboard", component: Dashboard },

  // //profile
  { path: "/profile", component: UserProfile },

  //Forms Route

  //Paid Advertising Module

  //Social Media Management

  { path: "/singleRecord", component: SingleRecord },

  { path: "/apps-filemanager", component: FileManager },

  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
]

export { userRoutes }
