package com.gst.controller;

import com.gst.domain.User;
import com.gst.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Created by truonghuuthanh on 4/10/17.
 */
@RestController
public class RegisterController {

    @Autowired
    private UserService userService;

    @CrossOrigin
    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity register(@RequestParam(value = "name") String name,
                                   @RequestParam(value = "email") String email,
                                   @RequestParam(value = "password") String password) {
        User existed = userService.checkEmailExist(email);
        if (existed == null) {
            User user = new User(name, email, password);
            User added = userService.register(user);
            return new ResponseEntity("User registered successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity("User registered unsuccessfully", HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin
    @RequestMapping(value = "/updateProfile", method = RequestMethod.POST)
    public ResponseEntity update(@RequestParam(value = "name") String name,
                                 @RequestParam(value = "email") String email,
                                 @RequestParam(value = "oldPassword") String oldPassword,
                                 @RequestParam(value = "newPassword") String newPassword) {
        User existed = userService.checkEmailExist(email);
        if (existed != null) {
            if (existed.getPassword().equals(oldPassword)) {
                existed.setName(name);
                existed.setPassword(newPassword);
                userService.update(existed);
                return new ResponseEntity(existed, HttpStatus.OK);
            } else {
                return new ResponseEntity(HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

}
