package com.gst.service;


import java.text.ParseException;
import java.util.List;


import com.gst.domain.UserLocation;

/**
 * Created by truonghuuthanh on 4/4/17.
 */
public interface LocationService {
    List<UserLocation> findAll();

    UserLocation save(UserLocation userLocation);

    List<UserLocation> findByEmail(String email);
    
    List<UserLocation> findByTime(String email, String fromDate, String toDate, String pageID) throws ParseException;
    
    long getTotalPage(String email);
    
}

