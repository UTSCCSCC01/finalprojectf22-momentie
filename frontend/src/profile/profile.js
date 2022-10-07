/*import React, { useState } from 'react';
import Parse from 'parse/dist/parse.min.js';
import './App.css';
import { Button, Divider, Input } from 'antd';

const doUserLogOut = async function () {
    try {
      await Parse.User.logOut();
      // To verify that current user is now empty, currentAsync can be used
      const currentUser = await Parse.User.current();
      if (currentUser === null) {
        alert('Success! No user is logged in anymore!');
      }
      // Update state variable holding current user
      getCurrentUser();
      return true;
    } catch (error) {
      alert(`Error! ${error.message}`);
      return false;
    }
  };*/
var logoutURL = "http://localhost:5000/account/logout",
  method = "POST",
  xmlhttp = new XMLHttpRequest();

function logoutUser() {
    /*
    setTimeout('location.reload(true)', 1000);
    xmlhttp = GetXmlHttpObject();
    if (xmlhttp==null) {
    return;
    }
    //alert(xmlhttp);
    */
    xmlhttp.onreadystatechange = function() {
        if (this.status == 409){
            console.error("error occurs when logout failed");
            xmlhttp.abort();
        }
        if (this.readyState == 4 && this.status == 200) {
            console.log("session ID invalidated");
          document.getElementById("logout").innerHTML = this.responseText;
        }
    };
    xmlhttp.open(method, logoutURL, true);
    xmlhttp.setRequestHeader( 'Accept', 'logout data' );   
    xmlhttp.send();
}

logoutUser();
/*
const request = () => {
    var xhr = new XMLHttpRequest();
    xhr.open(method, logoutURL, true);

    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = () => { // Call a function when the state changes.
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        // Request finished. Do processing here.
        }
    }
    xhr.send("foo=bar&lorem=ipsum");
    // xhr.send(new Int8Array());
    // xhr.send(document);
}
function logout()
{
    var xhr = new XMLHttpRequest;
    // logout.html doesn't even exist - we don't need to send this request to server.
    xhr.open("POST", logoutURL, true, "logout", "logout");
    xhr.send("");
    xhr.abort();
}


function getHTTPObject() {
    var xmlhttp = false;
  
    if (window.XMLHttpRequest) {  // code for IE7+, Firefox, Chrome, Opera, Safari
      xmlhttp = new XMLHttpRequest();
    } else {                      // code for IE6, IE5
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return xmlhttp;
}

function logout() {
    if (userAgent.indexOf("msie") != -1) {
      document.execCommand("ClearAuthenticationCache", false);
    }
    var http = getHTTPObject();
    var logout_url = "/login.html";
    http.open("get", logout_url, false);
    http.send("");
    document.location = logout_url;
    return false;
}
*/

/*
function GetXmlHttpObject(){
    if (window.XMLHttpRequest)
     {
     // code for IE7+, Firefox, Chrome, Opera, Safari
     return new XMLHttpRequest();
     }
     if (window.ActiveXObject)
    {
     // code for IE6, IE5
     return new ActiveXObject("Microsoft.XMLHTTP");
      }
      return null;
}
*/