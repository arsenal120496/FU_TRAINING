package com.gst.service;


import com.gst.domain.UserLocation;
import com.gst.repository.LocationRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by truonghuuthanh on 4/4/17.
 */
@Service
public class LocationServiceImp implements LocationService {

    @Autowired
    LocationRespository locationRespository;

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

	@SuppressWarnings("deprecation")
	@Override
	public List<UserLocation> findByTime(String email, String fromDate, String toDate) {
		List<UserLocation> list = locationRespository.findByEmail(email);
		Date fDate = new Date(fromDate);
		Date tDate = new Date(toDate);
		List<UserLocation> res = new ArrayList<UserLocation>();
		for (UserLocation userLocation : list) {
			Date d = new Date(userLocation.getTime());
			int compareFdate = fDate.compareTo(d);
			int compareTdate = tDate.compareTo(d);
			if((compareFdate != 1) && (compareTdate != -1)){
				res.add(userLocation);
			}
		}
		
		return res;
	}
}
