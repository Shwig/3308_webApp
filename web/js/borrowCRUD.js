

var borrowCRUD = {}; // globally available object

borrowCRUD.list = function (targetId) {

    var dataList = document.createElement("div");
    dataList.id = "dataList"; // set the id so it matches CSS styling rules in listStyle.css
    dataList.innerHTML = "<h2>Borrow</h2>";
    dataList.innerHTML += "<h3 id='listMsg'></h3>";

    document.getElementById(targetId).innerHTML = "";
    document.getElementById(targetId).appendChild(dataList);

    //ajax('webAPIs/listUsersAPI.jsp', setListUI, 'listMsg');
    ajax('webAPIs/getAllBorrowsAPI.jsp', setListUI, 'content');
    
    function setListUI(httpRequest) {

        console.log("starting userCRUD.list (setListUI) with this httpRequest object (next line)");
        console.log(httpRequest);

        var obj = JSON.parse(httpRequest.responseText);

        if (obj === null) {
            document.getElementById("listMsg").innerHTML = "userCRUD.list Error: JSON string evaluated to null.";
            return;
        }

        for (var i = 0; i < obj.webUserList.length; i++) {

            // how you would add a new property if you wanted to
            obj.webUserList[i].userRole = obj.webUserList[i].userRoleId + " " +
                    obj.webUserList[i].userRoleType;
            
            if (obj.webUserList[i].imageURL === ""){
                obj.webUserList[i].imageURL = "NULL";
            }
            if (obj.webUserList[i].lateFee === ""){
                obj.webUserList[i].lateFee = "NULL";
            }
            if (obj.webUserList[i].usrComment === ""){
                obj.webUserList[i].usrComment = "NULL";
            }
            if (obj.webUserList[i].returnedOn === ""){
                obj.webUserList[i].returnedOn = "NULL";
            }
            // how to delete properties
//            delete obj.webUserList[i].imageURL;
            delete obj.webUserList[i].userRoleId;
            delete obj.webUserList[i].userRoleType;
            delete obj.webUserList[i].instrumentId;
            delete obj.webUserList[i].webUserId;
//            delete obj.webUserList[i].userPassword;
        }

        // buildTable Parameters: 
        // First:  array of objects that are to be built into an HTML table.
        // Second: string that is database error (if any) or empty string if all OK.
        // Third:  reference to DOM object where built table is to be stored. 
        buildTable(obj.webUserList, obj.dbError, dataList);
    }
};



/*  This is the output of webAPIs/listUsersAPI.jsp
 * 
 {
 "dbError": "",
 "webUserList": [
 {
 "webUserId": "1",
 "userEmail": "donald.j.ott@temple.edu",
 "userPassword": "p@ssw0rd",
 "birthday": "",
 "membershipFee": "",
 "userRoleId": "2",
 "userRoleType": "View",
 "errorMsg": ""
 },
 ...
 */