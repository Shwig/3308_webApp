package model.instrument;

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

    public String instrumentId = "";
    public String modelNumber = "";
    public String instrumentType = "";
    public String imageURL = "";
    public String lateFee = "";
    public String errorMsg = "";

    // default constructor leaves all data members with empty string (Nothing null).
    public StringData() {
    }

    // overloaded constructor sets all data members by extracting from resultSet.
    public StringData(ResultSet results) {
        try {
            // plainInteger returns integer converted to string with no commas.
            this.instrumentId = FormatUtils.plainInteger(results.getObject("instrument_id"));
            this.modelNumber = FormatUtils.formatString(results.getObject("model_number"));
            this.instrumentType = FormatUtils.formatString(results.getObject("instrument_type"));
            this.imageURL = FormatUtils.formatString(results.getObject("image_url"));
            this.lateFee = FormatUtils.formatDollar(results.getObject("late_fee"));
        } catch (Exception e) {
            this.errorMsg = "Exception thrown in model.instrument.StringData (the constructor that takes a ResultSet): " + e.getMessage();
        }
    }

    public int getCharacterCount() {
        String s = this.instrumentId + this.modelNumber + this.instrumentType + this.imageURL
                + this.lateFee;
        return s.length();
    }

    public String toString() {
        return "Instrument Id:" + this.instrumentId
                + ", Model Number: " + this.modelNumber
                + ", Instrument Type: " + this.instrumentType
                + ", image URL: " + this.imageURL
                + ", Late Fee: " + this.lateFee;
    }
}
