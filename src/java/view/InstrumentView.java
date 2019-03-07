package view;

// classes imported from java.sql.*
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import model.instrument.*;

// classes in my project
import dbUtils.*;

public class InstrumentView {

    public static StringDataList getAllInstruments(DbConn dbc) {

        //PreparedStatement stmt = null;
        //ResultSet results = null;
        StringDataList sdl = new StringDataList();
        try {
            String sql = "SELECT instrument_id, model_number, instrument_type, image_url, late_fee "+
                    "FROM instrument " + 
                    "ORDER BY instrument_id ";  // you always want to order by something, not just random order.
            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            ResultSet results = stmt.executeQuery();
            while (results.next()) {
                sdl.add(results);
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            StringData sd = new StringData();
            sd.errorMsg = "Exception thrown in instrumentView.getAllInstrumentsAPI(): " + e.getMessage();
            sdl.add(sd);
        }
        return sdl;
    }
    
    public static StringDataList getInstrumentById(DbConn dbc, String id) {

        //PreparedStatement stmt = null;
        //ResultSet results = null;
        StringDataList sdl = new StringDataList();
        try {
            String sql = "SELECT instrument_id, model_number, instrument_type, image_url, late_fee "
                    + "FROM instrument WHERE instrument_id = ?";

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