package com.gst.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.gst.domain.User;
import com.gst.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class LoginController {

    @Autowired
    private UserService userService;

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/login", method = RequestMethod.POST, produces = "application/json")
    public String login(@RequestParam(value = "email", required = true) String email, @RequestParam(value = "password", required = true) String password) throws JsonProcessingException {
    	User user = userService.login(email, password);
        String result = null;
        if (user != null) {
            ObjectMapper obj = new ObjectMapper();
            result = obj.writeValueAsString(user);
        }
        return result;

    }

    @RequestMapping(value = "/loginMobile", method = RequestMethod.POST)
    public ResponseEntity<User> loginMobile(@RequestParam(value = "email", required = true) String  email, @RequestParam(value = "password", required = true) String password){
    	User user = userService.login(email, password);
        if (user != null){
            return new ResponseEntity("Login successfully",HttpStatus.OK);
        } else {
            return new ResponseEntity("Login failed", HttpStatus.NOT_FOUND);
        }
    }
}
