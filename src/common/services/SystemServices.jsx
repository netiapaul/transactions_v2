import axios from "axios";

// let BASE_URL = localStorage.getItem("BASE_URL");
let BASE_URL = import.meta.env.VITE_APP_LOGIN_URL_CONFIG;

/**
 *
 * TODO: HANDLE AUTHORIZATION
 *
 */
export async function HandleLogin(userData) {
  try {
    // let response = await fetch(`${this.BASE_URL}/Auth`, {
    let response = await fetch(`${import.meta.env.VITE_APP_LOGIN_URL_CONFIG}`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // 'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        userName: userData.username,
        password: userData.password,
        machineCookie: userData.machineCookie || "",
        clientPin: localStorage.getItem("clientPin") || 0,
        latt: localStorage.getItem("latitude") || "",
        long: localStorage.getItem("longitude") || "",
      }),
    });
    const data = await response.json();
    console.log(response);
    return data;
  } catch (error) {
    console.log("SYSTEM ERROR", error);
    throw new Error(`${import.meta.env.VITE_APP_DEFAULT_ERROR}`);
  }
}
