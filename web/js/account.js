
var account = {};// define global empty object

account.logon = function (emailId, pwId, msgId) {
    console.log("emailId is " + emailId);

    // Must use “escape”to clean user input so security related errors don’tinterferewith your code functioning
    var emailUserInput = escape(document.getElementById(emailId).value);
    var pwUserInput = escape(document.getElementById(pwId).value);

    // make ajax call, specifying callback function
    ajax("webAPIs/logonAPI.jsp?email=" + emailUserInput + "&password=" + pwUserInput, processLogon, msgId);

    function processLogon(httpRequest) {// define callback function
        // ...you know what to do here: add info to the UI
        var logonObj = JSON.parse(httpRequest.responseText);

        if (logonObj === null) {
            document.getElementById(msgId).innerHTML = "<h4>The Email or Password you have enter is not valid!</h4>";
        } else if (logonObj.errorMsg.length > 0) {
            document.getElementById(msgId).innerHTML = "<h4>Error extracting the Web User from the database: </h4>" + logonObj.webUserList[0].errorMsg;
        } else {
            document.getElementById(msgId).innerHTML = "<h4>Logon Sucessful !</h4>";
            document.getElementById(msgId).innerHTML += "<h4>User Profile</h4>";
            document.getElementById(msgId).innerHTML += "Web User Id: " + logonObj.webUserId;
            document.getElementById(msgId).innerHTML += "<br/>User Email: " + logonObj.userEmail;
            document.getElementById(msgId).innerHTML += "<br/>Birthday: " + logonObj.birthday;
            document.getElementById(msgId).innerHTML += "<br/>Membership Fee: " + logonObj.membershipFee;
            document.getElementById(msgId).innerHTML += "<br/>Role Id: " + logonObj.userRoleId;
            document.getElementById(msgId).innerHTML += "<br/>Role Type: " + logonObj.userRoleType;
        }

    }
};


account.logOff = function (msgId) {

    // make ajax call, specifying callback function
    ajax("webAPIs/logoffAPI.jsp", processLogOff, msgId);

    function processLogOff(httpRequest) {// define callback function
        // ...you know what to do here: add info to the UI
        document.getElementById(msgId).innerHTML = "<h4>You are now logged off</h4>";
    }

};

account.profile = function (msgId) {
    // ...you know what to do here: add info to the UI

    // make ajax call, specifying callback function
    ajax("webAPIs/getProfileAPI.jsp", getUserProfile, msgId);

    function getUserProfile(httpRequest) {// define callback function
        // ...you know what to do here: add info to the UI
//        document.getElementById(msgId).innerHTML = "Sucessful processing of logOff API!";
        var profileObj = JSON.parse(httpRequest.responseText);

        if (profileObj === null) {
            document.getElementById(msgId).innerHTML = "<h4>Please log to view your profile</h4>";
        } else if (profileObj.errorMsg.length > 0) {
            document.getElementById(msgId).innerHTML = "<h4>Error extracting the Web User from the database: </h4>" + logonObj.webUserList[0].errorMsg;
        } else {
            document.getElementById(msgId).innerHTML = "<h4>Logon Sucessful !</h4>";
            document.getElementById(msgId).innerHTML += "<h4>Welcome</h4>";
            document.getElementById(msgId).innerHTML += "Web User Id: " + profileObj.webUserId;
            document.getElementById(msgId).innerHTML += "<br/>User Email: " + profileObj.userEmail;
            document.getElementById(msgId).innerHTML += "<br/>Birthday: " + profileObj.birthday;
            document.getElementById(msgId).innerHTML += "<br/>Membership Fee: " + profileObj.membershipFee;
            document.getElementById(msgId).innerHTML += "<br/>Role Id: " + profileObj.userRoleId;
            document.getElementById(msgId).innerHTML += "<br/>Role Type: " + profileObj.userRoleType;
        }
    }

};

