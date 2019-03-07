function findInstrumentFn(id) {

    ajax("webAPIs/getInstrumentByIdAPI.jsp?id=" + id, displayInstrument, "instrumentInfoHere");

    function displayInstrument(httpRequest) {
        var target = document.getElementById("instrumentInfoHere");
        target.innerHTML = "";
        var obj = JSON.parse(httpRequest.responseText);
        if (obj.webUserList.length === 0) {
            target.innerHTML = "There is no Instrument with id '" + id + "' in the database";
        } else if (obj.webUserList[0].errorMsg.length > 0) {
            target.innerHTML = "Error extracting the Instrument from the database: " + obj.webUserList[0].errorMsg;
    } else {
            target.innerHTML = "<h4>Instrument Description</h4>";
            target.innerHTML += "Instrument Id: " + obj.webUserList[0].instrumentId;
            target.innerHTML += "<br/>Model Number: " + obj.webUserList[0].modelNumber;
            target.innerHTML += "<br/>Instrument Type: " + obj.webUserList[0].instrumentType;
            target.innerHTML += "<br/>Image URL: " + obj.webUserList[0].imageUrl;
            target.innerHTML += "<br/>Late Fee: " + obj.webUserList[0].lateFee;
        }
    }
}