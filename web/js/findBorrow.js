function findBorrowFn(id) {

    ajax("webAPIs/getBorrowByIdAPI.jsp?id=" + id, displayBorrow, "borrowInfoHere");

    function displayBorrow(httpRequest) {
        var target = document.getElementById("borrowInfoHere");
        target.innerHTML = "";
        var obj = JSON.parse(httpRequest.responseText);
        console.log("******userRoleType returned by JSON.parse:" + obj.webUserList[0].userRoleType + "*****");
        if (obj.webUserList.length === 0) {
            target.innerHTML = "There is no Borrow transaction with id '" + id + "' in the database";
        } else if (obj.webUserList[0].errorMsg.length > 0) {
            target.innerHTML = "Error extracting the Borrow from the database: " + obj.webUserList[0].errorMsg;
        } else {
            target.innerHTML = "<h4>Borrow Transaction Details</h4>";
            target.innerHTML += "Borrow Id: " + obj.webUserList[0].borrowId;
            target.innerHTML += "<br/>Lease Date: " + obj.webUserList[0].leaseDate;
            target.innerHTML += "<br/>Due Date: " + obj.webUserList[0].dueDate;
            target.innerHTML += "<br/>Returned On: " + obj.webUserList[0].returnedOn;
            target.innerHTML += "<br/>Usr Comment: " + obj.webUserList[0].usrComment;
            target.innerHTML += "<br/>Instrument Id: " + obj.webUserList[0].instrumentId;
            target.innerHTML += "<br/>Web User Id: " + obj.webUserList[0].webUserId;
        }
    }
}