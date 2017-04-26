package com.gst.repository;

import java.text.ParseException;
import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.gst.domain.UserLocation;

/**
 * Created by truonghuuthanh on 4/4/17.
 */
public interface LocationRespository extends MongoRepository<UserLocation, String>{
	
    List<UserLocation> findByEmail(String email);
    
    List<UserLocation> findByTime(String email, String fromDate, String toDate, String pageID, Pageable p) throws ParseException;
}
