

var userCRUD = {}; // globally available object

userCRUD.list = function (targetId) {

    var dataList = document.createElement("div");
    dataList.id = "dataList"; // set the id so it matches CSS styling rules in listStyle.css
    dataList.innerHTML = "<h2>Web Users</h2>";
    dataList.innerHTML += "<h3 id='listMsg'></h3>";

    document.getElementById(targetId).innerHTML = "";
    document.getElementById(targetId).appendChild(dataList);

    //ajax('webAPIs/listUsersAPI.jsp', setListUI, 'listMsg');
    ajax('webAPIs/getAllUsersAPI.jsp', setListUI, 'content');
    
    function setListUI(httpRequest) {

        console.log("starting userCRUD.list (setListUI) with this httpRequest object (next line)");
        console.log(httpRequest);

        var obj = JSON.parse(httpRequest.responseText);

        if (obj === null) {
            document.getElementById("listMsg").innerHTML = "userCRUD.list Error: JSON string evaluated to null.";
            return;
        }
        
//        var newUserList = [];

        for (var i = 0; i < obj.webUserList.length; i++) {
//            newUserList[i] = {};
//            newUserList[i].newBirthday = obj.webUserList[i].birthday;
//            newUserList[i].newRole = obj.webUserList[i].userRoleType;
//            newUserList[i].silly = "HI";

            // how you would add a new property if you wanted to
            obj.webUserList[i].userRole = obj.webUserList[i].userRoleId + " " +
                    obj.webUserList[i].userRoleType; 
                     
//            if (obj.webUserList[i].birthday === ""){
//                obj.webUserList[i].birthday = "NULL";
//            }
//            if (obj.webUserList[i].membershipFee === ""){
//                obj.webUserList[i].membershipFee = "NULL";
//            }
            // how to delete properties
            delete obj.webUserList[i].userRoleId;
            delete obj.webUserList[i].userRoleType;
            delete obj.webUserList[i].userPassword;
            delete obj.webUserList[i].userPassword2;
            
            
        }

        // buildTable Parameters: 
        // First:  array of objects that are to be built into an HTML table.
        // Second: string that is database error (if any) or empty string if all OK.
        // Third:  reference to DOM object where built table is to be stored. 
        buildTable(obj.webUserList, obj.dbError, dataList);
//        buildTable(newUserList, obj.dbError, dataList);
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