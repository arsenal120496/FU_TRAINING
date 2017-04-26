package com.gst.service;


import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;

import java.util.Collections;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;


import com.gst.domain.UserLocation;
import com.gst.repository.LocationRespository;


/**
 * Created by truonghuuthanh on 4/4/17.
 */
@Service
public class LocationServiceImp implements LocationService {

    @Autowired
    LocationRespository locationRespository;
    
    @Autowired
    MongoTemplate mt;
    

    @Override
    public List<UserLocation> findAll() {
        return locationRespository.findAll();
    }

    @Override
    public UserLocation save(UserLocation userLocation) {
        return locationRespository.save(userLocation);
    }

    @Override
    public List<UserLocation> findByEmail(String email) {
        List<UserLocation> list = locationRespository.findByEmail(email);
        return list;
    }

    @Override
    public List<UserLocation> findByTime(String email, String fromDate, String toDate, String pageID) throws ParseException {
        List<UserLocation> list = new ArrayList<UserLocation>();      
        DateFormat df = new SimpleDateFormat("MM/dd/yyyy hh:mm:ss");
        Date fDate = df.parse(fromDate);
        Date tDate = df.parse(toDate);
        Criteria criteria = Criteria.where("time").gte(fDate).lte(tDate);
        Query q = new Query();
        q.addCriteria(criteria);
        list = mt.find(q, UserLocation.class);
        Collections.reverse(list);
        System.out.println(list.get(0).getTime().toString());     
        int indexPage = 0;
        try {
			indexPage = Integer.parseInt(pageID);
		} catch (Exception e) {
			indexPage = 1;
		}
        int p = indexPage*10;
        try {
        	list.subList(indexPage*10-10, indexPage*10-1);
		} catch (Exception e) {
			list.subList(indexPage*10-10, list.size()-1);
		}
            
        return list;       
    }

	public long getNumberEntitiesByEmail(String email) {
		long numberEntities = locationRespository.count(Example.of(new UserLocation(email)));
		return numberEntities;
	}

	@Override
	public long getTotalPage(String email) {
		long numberEntities = locationRespository.count(Example.of(new UserLocation(email)));
		int totalPage = (int)numberEntities/10;
		return totalPage;
	}

	
	
}
