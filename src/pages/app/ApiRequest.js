import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:8000/api",
})

export async function postData(endpoint, data) {
  return api.post(`${endpoint}`, {
    ...data,
  })
}
export async function formPostData(endpoint, data, token) {
  return api.post(
    `${endpoint}`,
    {
      ...data,
    },
    {
      headers: {
        "x-auth-token": token,
      },
    }
  )
}

export async function formGetData(endpoint, token) {
  return api.get(`${endpoint}`, {
    headers: {
      "x-auth-token": token,
    },
  })
}
export async function patchData(endpoint, id, data, token) {
  return api.patch(
    `${endpoint}/${id}`,
    { ...data },
    {
      headers: {
        "x-auth-token": token,
      },
    }
  )
}
export async function getUsers(endpoint, token) {
  return api.get(`${endpoint}`, {
    headers: {
      "x-auth-token": token,
    },
  })
}
export async function deleteData(endpoint, id, token) {
  return api.patch(`${endpoint}/${id}`, {
    headers: {
      "x-auth-token": token,
    },
  })
}
// export async function getUserDataIntroduction(endpoint, token) {
//   return api.get(`${endpoint}`, {
//     headers: {
//       "x-auth-token": token,
//     },
//   })
// }
export async function getUserDataIntroduction(endpoint, token) {
  const data = await api.get(`${endpoint}`, {
    headers: {
      "x-auth-token": token,
    },
  })
  // console.log(data.data.introduction)
  return {
    "Business Description": data.data.introduction.bus_short_desc,
    "Your Company": data.data.introduction.company_do,
    "Your Products": data.data.introduction.products,
  }
}
export async function getUserDataCompetitor(endpoint, token) {
  const data = await api.get(`${endpoint}`, {
    headers: {
      "x-auth-token": token,
    },
  })
  console.log(data.data.competitor)
  return {
    "Competitor's Web Addresses": data.data.competitor.web_addresses,
    "Your Competitor": data.data.competitor.description,
  }
}
export async function getUserDataMarket(endpoint, token) {
  const data = await api.get(`${endpoint}`, {
    headers: {
      "x-auth-token": token,
    },
  })
  return {
    "Niche Market": data.data.targetMarket.niche_market,
    "Target Audience": data.data.targetMarket.target_audience,
  }
}
export async function getUserDataUnique(endpoint, token) {
  const data = await api.get(`${endpoint}`, {
    headers: {
      "x-auth-token": token,
    },
  })
  return {
    "Unique Selling Point": data.data.usp.description,
    "Your Strength": data.data.usp.strength,
    "Why You?": data.data.usp.reason_to_choose,
  }
}
export async function getUserDataClient(endpoint, token) {
  const data = await api.get(`${endpoint}`, {
    headers: {
      "x-auth-token": token,
    },
  })
  console.log(data.data)
  return {
    "Your Customers": data.data.customer.customers,
  }
}
export async function getUserDataLike(endpoint, token) {
  const data = await api.get(`${endpoint}`, {
    headers: {
      "x-auth-token": token,
    },
  })
  console.log(data.data)
  return {
    "Websites You Like": data.data.like.websites,
  }
}
export async function getUserDataDisLike(endpoint, token) {
  const data = await api.get(`${endpoint}`, {
    headers: {
      "x-auth-token": token,
    },
  })
  console.log(data.data)
  return {
    "Websites You DisLike": data.data.dislike.websites,
  }
}
export async function getUserDataColor(endpoint, token) {
  const data = await api.get(`${endpoint}`, {
    headers: {
      "x-auth-token": token,
    },
  })
  console.log(data.data)
  if (data.data.color.hasPreference) {
    return {
      "Has Color Preference": "Yes",
      "Color Preference": data.data.color.hasPreference,
    }
  } else {
    return {
      "Has Color Preference": "No Color Preference",
    }
  }
}
export async function getUserDataStyle(endpoint, token) {
  const data = await api.get(`${endpoint}`, {
    headers: {
      "x-auth-token": token,
    },
  })
  console.log(data.data)
  return {
    Style: data.data.style.style,
    Percieve: data.data.style.perceive,
  }
}
export async function getUserDataContent(endpoint, token) {
  const data = await api.get(`${endpoint}`, {
    headers: {
      "x-auth-token": token,
    },
  })
  console.log(data.data)
  return {
    "Is Content Ready": data.data.content.has_content_ready ? "Yes" : "No",
    "Need help for website content creation?": data.data.content.need_help
      ? "Yes"
      : "No",
  }
}
export async function getUserDataChecklist(endpoint, token) {
  const data = await api.get(`${endpoint}`, {
    headers: {
      "x-auth-token": token,
    },
  })
  console.log(data.data)
  let unique = data.data.checkList.services.filter(
    (item, i, ar) => ar.indexOf(item) === i
  )
  return {
    "Services Checklist": unique,
  }
}
export async function getUserDataGoals(endpoint, token) {
  const data = await api.get(`${endpoint}`, {
    headers: {
      "x-auth-token": token,
    },
  })
  console.log(data.data)
  return {
    Goal: data.data.goal.goal,
  }
}

export async function getUserDataObjectives(endpoint, token) {
  const data = await api.get(`${endpoint}`, {
    headers: {
      "x-auth-token": token,
    },
  })
  console.log(data.data)
  return {
    Success: data.data.objective.success,
    Achievement: data.data.objective.achievement,
  }
}

export async function getUserDataSitemap(endpoint, token) {
  const data = await api.get(`${endpoint}`, {
    headers: {
      "x-auth-token": token,
    },
  })
  return {
    Indication: data.data.sitemap.indication,
    Outline: data.data.sitemap.outline,
  }
}
export async function getUserDataAdvance(endpoint, token) {
  const data = await api.get(`${endpoint}`, {
    headers: {
      "x-auth-token": token,
    },
  })
  console.log(data.data)
  return {
    Feature: data.data.feature.feature,
  }
}
export async function getUserDataAction(endpoint, token) {
  const data = await api.get(`${endpoint}`, {
    headers: {
      "x-auth-token": token,
    },
  })
  console.log(data.data)
  return {
    Action: data.data.action.action,
  }
}

export async function getUserDataService(endpoint, token) {
  const data = await api.get(`${endpoint}`, {
    headers: {
      "x-auth-token": token,
    },
  })
  console.log(data.data)
  return {
    Services: data.data.payload.services,
  }
}

export async function getUserDataProvide(endpoint, token) {
  const data = await api.get(`${endpoint}`, {
    headers: {
      "x-auth-token": token,
    },
  })
  console.log(data.data)
  return {
    Region: data.data.payload.region,
  }
}
export async function getUserDataPaCompetitor(endpoint, token) {
  const data = await api.get(`${endpoint}`, {
    headers: {
      "x-auth-token": token,
    },
  })
  console.log(data.data.competitor)
  return {
    "Competitor's Web Addresses": data.data.competitor.websites,
    "Your Competitor": data.data.competitor.description,
  }
}
export async function getUserDataPaClient(endpoint, token) {
  const data = await api.get(`${endpoint}`, {
    headers: {
      "x-auth-token": token,
    },
  })
  console.log(data.data)
  return {
    "Your Customers": data.data.payload.customers,
  }
}
export async function getUserDataPaGoals(endpoint, token) {
  const data = await api.get(`${endpoint}`, {
    headers: {
      "x-auth-token": token,
    },
  })
  console.log(data.data)
  return {
    Goal: data.data.payload.goal,
  }
}
export async function getUserDataPosting(endpoint, token) {
  const data = await api.get(`${endpoint}`, {
    headers: {
      "x-auth-token": token,
    },
  })
  console.log(data.data)
  return {
    POsting: data.data.payload.posting,
  }
}
export async function getUserDataAccounts(endpoint, token) {
  const data = await api.get(`${endpoint}`, {
    headers: {
      "x-auth-token": token,
    },
  })
  console.log(data.data)
  return {
    POsting: data.data.payload.posting,
  }
}
