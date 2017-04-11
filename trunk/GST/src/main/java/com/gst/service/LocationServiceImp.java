package com.gst.service;

import com.gst.domain.Location;
import com.gst.domain.User;
import com.gst.domain.UserLocation;
import com.gst.repository.LocationRespository;
import com.gst.repository.UserRepository;
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
    public List<UserLocation> findByUser(User user) {
        return locationRespository.findByUser(user);
    }
}
