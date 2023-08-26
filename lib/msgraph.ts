import * as msal from "@azure/msal-browser";
import { redirect } from "next/navigation"
const LoginMode: string = 'redirect'
const Host = process.env.NEXT_PUBLIC_HOST

const msalConfig = {
  auth: {
    clientId: `${process.env.NEXT_PUBLIC__AZURE_AD_CLIENT_ID}`,
    redirectUri: `${Host}`,
  },
  cache: {
    cacheLocation: "localStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  }
}
const graphApiRoot = "https://graph.microsoft.com/v1.0/me"

export const msalInstance: msal.PublicClientApplication = new msal.PublicClientApplication(msalConfig)

export function init() {
  return msalInstance.handleRedirectPromise()
    .then(handleResponse)
    .catch(console.error)
}

function handleResponse(resp: msal.AuthenticationResult | null) {
  if (resp !== null) {
    setAccount(resp)
  } else {
    selectAccount(account)
  }
  // return account
}

function setAccount(resp: msal.AuthenticationResult) {
  account.accessToken = resp.accessToken
  account.username = resp.account!.username
  account.name = resp.account!.name ?? ''
  account.expiresOn = resp.expiresOn
  //   account.state = resp.state
  // if (resp.state && resp.state !== Host && resp.state !== Host + '/') {
  //   redirect(resp.state)
  // }
}

export type MsAccount = {
  accessToken: string
  username: string
  name: string
  expiresOn: Date | null,
  state?: string
}

export const account: MsAccount = {
  accessToken: '',
  username: '',
  name: '',
  expiresOn: null
}

function selectAccount(account: MsAccount) {
  /**
   * See here for more info on account retrieval: 
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
   */
  const currentAccounts = msalInstance.getAllAccounts();
  if (!currentAccounts || currentAccounts.length < 1) {
    return
  } else if (currentAccounts.length > 1) {
    // Add your account choosing logic here
    console.warn("Multiple accounts detected.");
  } else if (currentAccounts.length === 1) {
    account.username = currentAccounts[0].username;
  }
}

export async function msLogin(redirectUri?: string) {
  if (!account.name) {
    await init()
  }
  if (account.expiresOn && account.expiresOn > new Date()) {
    return account
  }
  const loginRequest = {
    scopes: ['files.read.all'],// optional Array<string>
    // redirect_uri: window.location.href === Host ? Host : `${Host}/onedrive`,
    // state: window.location.href
  }
  console.log('login request', loginRequest)
  const reLogin = () => {
    if (LoginMode === 'popup') {
      return msalInstance.loginPopup({ ...loginRequest }).then(handleResponse)
    } else {
      return msalInstance.loginRedirect({ ...loginRequest, state: redirectUri })
    }
  }
  if (account.username) {
    const currentAccount = msalInstance.getAccountByUsername(account.username)
    if (!currentAccount) return reLogin()
    return msalInstance.acquireTokenSilent({ ...loginRequest, account: currentAccount }).then(resp => {
      setAccount(resp)
      return account
    }).catch(async (err) => {
      if (err instanceof msal.InteractionRequiredAuthError) {
        if (LoginMode === 'popup') {
          return msalInstance.acquireTokenPopup({ ...loginRequest, loginHint: currentAccount.username })
        }
        return msalInstance.acquireTokenRedirect({ ...loginRequest, loginHint: currentAccount.username });
      }
      throw err
    })
  } else {
    return reLogin()
  }
}

export async function reqToken() {
  if (account.accessToken) return
  return msLogin()
}

export async function logout() {
  if (LoginMode === 'popup') {
    return msalInstance.logoutPopup()
  } else {
    return msalInstance.logoutRedirect().then(() => {
      redirect('/')
    })
  }
}

function getHeaders() {
  const headers = new Headers();
  const bearer = "Bearer " + account.accessToken;
  headers.append("Authorization", bearer);
  return headers
}

export function profile() {
  const headers = new Headers();
  const bearer = "Bearer " + account.accessToken;
  headers.append("Authorization", bearer);
  const options = {
    method: "GET",
    headers: headers
  };
  return fetch(graphApiRoot, options)
}

export function myPhoto() {
  const headers = new Headers();
  const bearer = "Bearer " + account.accessToken;
  headers.append("Authorization", bearer);
  const options = {
    method: "GET",
    headers: headers
  };
  return fetch(`${graphApiRoot}/photo/$value`, options)
}

function getApiPath(path: string = '/') {
  return path === '/' ? '' : `:${path}:`
}
export async function getList(path: string) {
  const apiPath = getApiPath(path)
  const headers = new Headers();
  const bearer = "Bearer " + account.accessToken;
  headers.append("Authorization", bearer);
  const options = {
    method: "GET",
    headers: headers
  };
  return fetch(`${graphApiRoot}/drive/root${apiPath}?expand=children`, options)//.then(res => res.json())
}

export async function getItem(path: string) {
  const apiPath = getApiPath(path)
  const options = {
    method: "GET",
    headers: getHeaders()
  }
  return fetch(`${graphApiRoot}/drive/root${apiPath}?expand=children`, options).then(res => res.json())
}
