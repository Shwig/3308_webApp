<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 

<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.webUser.*" %> 
<%@page language="java" import="view.WebUserView" %> 
<%@page language="java" import="com.google.gson.*" %>

<%

    // default constructor creates nice empty StringDataList with all fields "" (empty string, nothing null).
    StringDataList list = new StringDataList();
    
    StringData data = new StringData();

    String strEmail = request.getParameter("email");// would evaluate to “throwsexception@hotmail.com”
    String strPass = request.getParameter("password");// would evaluate to “abc123!”    

    if (strEmail == null || strPass == null) {
        list.dbError = "Cannot log in - Must supply valid user name and password";
    } else {

        DbConn dbc = new DbConn();
        list.dbError = dbc.getErr(); // returns "" if connection is good, else db error msg.

        if (list.dbError.length() == 0) { // if got good DB connection,

            System.out.println("*** Ready to call logonAPI");

            data = DbMods.logonFind(strEmail, strPass, dbc);

            if (data == null) {
                System.out.println("User profile not found!");
            } else {
                session.setAttribute("userData", data);
//                    list.add(data);

            }

        }

        dbc.close(); // EVERY code path that opens a db connection, must also close it - no DB Conn leaks.
    }
    // This object (from the GSON library) can to convert between JSON <-> POJO (plain old java object) 
    Gson gson = new Gson();
    out.print(gson.toJson(data).trim());
//    out.print(gson.toJson(list).trim());
%>