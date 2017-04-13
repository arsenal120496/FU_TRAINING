package com.gst.service;


import com.gst.domain.UserLocation;
import com.gst.repository.LocationRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        System.out.println(list.get(0).getLocation().getLongtitude());
        return list;
    }
}
