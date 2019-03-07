<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 

<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.webUser.*" %> 
<%@page language="java" import="view.WebUserView" %> 
<%@page language="java" import="com.google.gson.*" %>


<%

    // must use same name for getAttribute as you used for setAttribute in the logon API
    // must type class the object that is extracted.
    StringData loggedOnWebUser = (StringData) session.getAttribute("userData"); 
    // This object (from the GSON library) can to convert between JSON <-> POJO (plain old java object) 
    Gson gson = new Gson();
    out.print(gson.toJson(loggedOnWebUser).trim());
%>
