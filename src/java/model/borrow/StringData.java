package model.borrow;

import dbUtils.FormatUtils;
import java.sql.ResultSet;


/* The purpose of this class is just to "bundle together" all the 
 * character data that the user might type in when they want to 
 * add a new Customer or edit an existing customer.  This String
 * data is "pre-validated" data, meaning they might have typed 
 * in a character string where a number was expected.
 * 
 * There are no getter or setter methods since we are not trying to
 * protect this data in any way.  We want to let the JSP page have
 * free access to put data in or take it out. */
public class StringData {

    public String borrowId = "";
    public String leaseDate = "";
    public String dueDate = "";
    public String returnedOn = "";
    public String usrComment = "";
      
    
    // addd table attributes from other and web user table and perform a
    // join in string data below
    
    // from web user table
    public String webUserId = ""; // Foreign Key
    public String userEmail = "";
    
    // from instrument table
    public String instrumentId = "";  // Foreign Key
    public String modelNumber = "";
    public String instrumentType = "";
    public String imageURL = "";
    public String lateFee = "";
    
    // form user_role table
    public String userRoleId = "";   // Foreign Key
    public String userRoleType = "";

    public String errorMsg = "";

    // default constructor leaves all data members with empty string (Nothing null).
    public StringData() {
    }

    // overloaded constructor sets all data members by extracting from resultSet.
    public StringData(ResultSet results) {
        try {
            // plainInteger returns integer converted to string with no commas.
            this.borrowId = FormatUtils.plainInteger(results.getObject("borrow_id"));
            this.leaseDate = FormatUtils.formatDate(results.getObject("lease_date"));
            this.dueDate = FormatUtils.formatDate(results.getObject("due_date"));
            this.returnedOn = FormatUtils.formatDate(results.getObject("returned_on"));
            this.usrComment = FormatUtils.formatString(results.getObject("usr_comment"));
            this.instrumentId = FormatUtils.plainInteger(results.getObject("instrument_id"));
                        
            // from web user table
            this.webUserId = FormatUtils.plainInteger(results.getObject("web_user_id"));            
            this.userEmail = FormatUtils.formatString(results.getObject("user_email"));
            
            // from instrument table
            this.modelNumber = FormatUtils.formatString(results.getObject("model_number"));
            this.instrumentType = FormatUtils.formatString(results.getObject("instrument_type"));
            this.imageURL = FormatUtils.formatString(results.getObject("image_url"));
            this.lateFee = FormatUtils.formatDollar(results.getObject("late_fee"));
            
            // from user_role table
            this.userRoleId = FormatUtils.plainInteger(results.getObject("user_role_id"));
            this.userRoleType = FormatUtils.formatString(results.getObject("user_role_type"));
            
        } catch (Exception e) {
            this.errorMsg = "Exception thrown in model.borrow.StringData (the constructor that takes a ResultSet): " + e.getMessage();
        }
    }

    public int getCharacterCount() {
        String s = this.borrowId + this.leaseDate + this.dueDate + this.returnedOn
                + this.usrComment + this.instrumentId  + this.modelNumber 
                + this.instrumentType + this.imageURL + this.lateFee + this.webUserId 
                + this.userRoleType + this.userRoleId + this.userEmail;
        return s.length();
    }

    public String toString() {
        return "Borrow Id:" + this.instrumentId
                + ", Lease Date: " + this.leaseDate
                + ", Due Date: " + this.dueDate
                + ", Returned On: " + this.returnedOn
                + ", User Comment: " + this.usrComment                
                + ", Web User Id: " + this.webUserId
                + ", User Role Type: " + this.userRoleType
                + ", User Role Id:" + this.userRoleId
                + ", User Email: " + this.userEmail
                + ", Instrument Id: " + this.instrumentId
                + ", Model Number: " + this.modelNumber
                + ", Instrument Type: " + this.instrumentType
                + ", Image URL: " + this.imageURL
                + ", Late Fee: " + this.lateFee;
    }
}
