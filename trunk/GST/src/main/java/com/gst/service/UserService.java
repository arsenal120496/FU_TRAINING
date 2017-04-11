package com.gst.service;

import com.gst.domain.User;

import java.util.List;


/**
 * Created by truonghuuthanh on 4/4/17.
 */
public interface UserService {
    User login(String email, String password);
    User register(User user);
    User checkEmailExist(String email);
}
