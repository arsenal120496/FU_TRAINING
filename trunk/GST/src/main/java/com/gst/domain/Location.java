package com.gst.domain;


/**
 * Created by truonghuuthanh on 4/4/17.
 */
public class Location {
    String longtitude;
    String latitude;

    public Location() {
    }

    public Location(String longtitude, String latitude) {
        this.longtitude = longtitude;
        this.latitude = latitude;
    }

    public String getLongtitude() {
        return longtitude;
    }

    public void setLongitude(String longitude) {
        this.longtitude = longitude;
    }

    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }
}
