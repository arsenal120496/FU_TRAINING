package com.gst.service;

import com.gst.domain.User;
import com.gst.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by truonghuuthanh on 4/4/17.
 */
@Service
public class UserServiceImp implements UserService {

    @Autowired
    UserRepository userRepository;

    @Override
    public User login(String email, String password){
        return userRepository.login(email, password);
    }

    @Override
    public User register(User user) {
        return userRepository.save(user);
    }
}
