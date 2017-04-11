package com.gst.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.auditing.CurrentDateTimeProvider;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by truonghuuthanh on 4/4/17.
 */
@Document(collection = "location")
public class UserLocation {
    @Id
    String id;

    String email;

    Location location;

    @Indexed
    String macAddress;

    String time;

    public UserLocation() {

    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public String getMacAddress() {
        return macAddress;
    }

    public void setMacAddress(String macAddress) {
        this.macAddress = macAddress;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getTime() {
        return time;
    }

    public void setTime(Date time) {
        DateFormat df = new SimpleDateFormat();
        this.time = df.format(time);
    }
}
