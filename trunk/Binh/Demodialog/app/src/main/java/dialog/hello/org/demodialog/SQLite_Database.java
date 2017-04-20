package dialog.hello.org.demodialog;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.DatabaseUtils;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

import java.util.ArrayList;

/**
 * Created by trank on 4/18/2017.
 */

public class SQLite_Database extends SQLiteOpenHelper {

    public static final String DB_NAME = "Location.db";
    public static final String TABLE_NAME = "location_table";
    public static final String COLUMN_1 = "ID";
    public static final String COLUMN_2 = "email";
    public static final String COLUMN_3 = "longitude";
    public static final String COLUMN_4 = "latitude";
    public static final String COLUMN_5 = "deviceName";
    public static final String COLUMN_6 = "time";



    public SQLite_Database(Context context) {
        super(context, DB_NAME, null, 1);
        SQLiteDatabase db = this.getWritableDatabase();
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        db.execSQL("create table " + TABLE_NAME + " (ID INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, " +
                                                    "longitude TEXT, latitude TEXT, deviceName TEXT, time TEXT);");
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        db.execSQL("DROP TABLE IF EXISTS " + TABLE_NAME);
        onCreate(db);
    }

    public boolean insertData(String email, String longitude, String latitude, String deviceName, String time){
        SQLiteDatabase db = this.getWritableDatabase();
        ContentValues contentValues = new ContentValues();
        contentValues.put(COLUMN_2,email);
        contentValues.put(COLUMN_3,longitude);
        contentValues.put(COLUMN_4,latitude);
        contentValues.put(COLUMN_5,deviceName);
        contentValues.put(COLUMN_6,time);
        int result = (int) db.insert(TABLE_NAME,null,contentValues);
        if(result == -1){
            return false;
        }
        return true;
    }

    public ArrayList<LocationNode> getAllCotacts() {
        ArrayList<LocationNode> array_list = new ArrayList<LocationNode>();
        SQLiteDatabase db = this.getReadableDatabase();
        Cursor res =  db.rawQuery( "select * from " + TABLE_NAME, null );
        res.moveToFirst();

        while(res.isAfterLast() == false){
            LocationNode tmp = new LocationNode();
            tmp.setEmail(COLUMN_2);
            tmp.setDeviceName(COLUMN_3);
            tmp.setLongitude(COLUMN_4);
            tmp.setLatitude(COLUMN_5);
            tmp.setTime(COLUMN_6);
            array_list.add(tmp);
            res.moveToNext();
        }
        db.execSQL("DROP TABLE IF EXISTS " + TABLE_NAME);
        onCreate(db);
        return array_list;
    }

    public int numberOfRows(){
        SQLiteDatabase db = this.getReadableDatabase();
        int numRows = (int) DatabaseUtils.queryNumEntries(db,TABLE_NAME);
        return numRows;
    }

}
