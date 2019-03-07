/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package view;

// classes imported from java.sql.*
import java.sql.PreparedStatement;
import java.sql.ResultSet;

// classes in my project
import dbUtils.*;
import model.borrow.*;

public class BorrowView {

    public static StringDataList getAllBorrows(DbConn dbc) {

        //PreparedStatement stmt = null;
        //ResultSet results = null;
        StringDataList sdl = new StringDataList();
        try {
            String sql = "SELECT b.borrow_id, b.lease_date, b.due_date, b.returned_on, b.usr_comment, "
                    + "i.instrument_id, i.model_number, i.instrument_type, i.image_url, i.late_fee,"
                    + " web.web_user_id, ur.user_role_type, ur.user_role_id, web.user_email "
                    + "FROM borrow b "
                    + "JOIN web_user web ON web.web_user_id = b.web_user_id "
                    + "JOIN user_role ur ON ur.user_role_id = web.user_role_id "
                    + "JOIN instrument i ON i.instrument_id = b.instrument_id "
                    + "ORDER BY borrow_id ";
            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            ResultSet results = stmt.executeQuery();
            while (results.next()) {
                sdl.add(results);
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            StringData sd = new StringData();
            sd.errorMsg = "Exception thrown in borrowView.getAllBorrowsAPI(): " + e.getMessage();
            sdl.add(sd);
        }
        return sdl;
    }

    public static StringDataList getBorrowById(DbConn dbc, String id) {

        //PreparedStatement stmt = null;
        //ResultSet results = null;
        StringDataList sdl = new StringDataList();
        try {
            String sql = "SELECT "
                    + "b.borrow_id, b.lease_date, b.due_date, b.returned_on, b.usr_comment, "
                    + "i.instrument_id, i.model_number, i.instrument_type, i.image_url, i.late_fee, "
                    + "web.web_user_id, web.user_email, "
                    + "ur.user_role_type, ur.user_role_id "
                    + "FROM borrow b "
                    + "JOIN web_user web ON web.web_user_id = b.web_user_id "
                    + "JOIN user_role ur ON ur.user_role_id = web.user_role_id "
                    + "JOIN instrument i ON i.instrument_id = b.instrument_id "
                    + "WHERE borrow_id = ?";

            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);

            // Encode the id (that the user typed in) into the select statement, into the first 
            // (and only) ? 
            stmt.setString(1, id);

            ResultSet results = stmt.executeQuery();
            if (results.next()) { // id is unique, one or zero records expected in result set
                sdl.add(results);
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            StringData sd = new StringData();
            sd.errorMsg = "Exception thrown in InstrumentView.getInstrumentById(): " + e.getMessage();
            sdl.add(sd);
        }
        return sdl;
    }

}
