package com.gst.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

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

    String nameDeivce;

    String time;

    public UserLocation() {

    }
    
    

    public UserLocation(String email, Location location, String nameDeivce) {
		super();
		this.email = email;
		this.location = location;
		this.nameDeivce = nameDeivce;
	}



	public String getId() {
        return id;
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
    
    public String getNameDeivce() {
		return nameDeivce;
	}
    
    public void setNameDeivce(String nameDeivce) {
		this.nameDeivce = nameDeivce;
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
