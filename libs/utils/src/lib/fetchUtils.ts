export interface FetchBody {
  [key: string]: string
}

export interface FetchOptions {
  credentials?: RequestCredentials
  headers?: Headers
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  mode?: RequestMode
}

export const parseJSON = (response: Response) => {
  if (!response.ok) {
    return null
  }
  return response.json()
}

export const logError = (error: Response) => {
  console.log(error)
  throw error
}

export const checkStatus = (response: Response) => {
  if (!response.ok) {
    logError(response)
  }
}

// --------------------- ===
//  FETCH REQUEST BUILDER
// ---------------------
const generateRequest = (
  url: string,
  body: FetchBody,
  options: FetchOptions
) => {
  const defaultCredentials = 'omit'
  const defaultHeaders = new Headers()
  defaultHeaders.append('Content-Type', 'application/json')
  defaultHeaders.append('X-API-KEY', process.env.VITE_API_KEY || '')
  const defaultMethod = 'GET'
  const defaultMode = 'cors'
  const newUrl = new URL(url)

  const init: RequestInit = {
    credentials: options.credentials || defaultCredentials,
    headers: options.headers || defaultHeaders,
    method: options.method || defaultMethod,
    mode: options.mode || defaultMode,
  }

  if (init.method === 'GET' && body) {
    Object.keys(body).forEach((key) => {
      newUrl.searchParams.append(key, body[key])
    })
  } else if (body) {
    init.method = options.method || 'POST'

    init.body = JSON.stringify(body)
  }

  return new Request(newUrl.href, init)
}

export const buildRequest = (
  api: string,
  path: string,
  body = {},
  options = {}
) => {
  const url = `${api}/${path}`
  return generateRequest(url, body, options)
}

export async function handleFetch(request: Request | string) {
  const resp = await fetch(request).catch(logError)
  checkStatus(resp)
  return parseJSON(resp)
}
