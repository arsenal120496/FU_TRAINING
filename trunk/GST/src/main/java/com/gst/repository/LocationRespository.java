package com.gst.repository;

import com.gst.domain.User;
import com.gst.domain.UserLocation;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

/**
 * Created by truonghuuthanh on 4/4/17.
 */
public interface LocationRespository extends MongoRepository<UserLocation, String >{
    List<UserLocation> findByUser(User user);
}
