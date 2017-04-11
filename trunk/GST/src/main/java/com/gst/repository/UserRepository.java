package com.gst.repository;

import com.gst.domain.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

/**
 * Created by truonghuuthanh on 4/4/17.
 */
public interface UserRepository extends MongoRepository<User, String > {
    @Query(value = "{'email':?0, 'password':?1}")
    User login(String email, String password);
}

