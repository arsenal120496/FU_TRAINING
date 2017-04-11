package com.gst.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.gst.domain.User;
import com.gst.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * Created by truonghuuthanh on 4/4/17.
 */
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

    //    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/test", method = RequestMethod.GET, produces = "application/json")
    public User login() {
        User user = new User();
        user.setName("Binh");
        user.setPassword("123456");
        user.setEmail("binhfpt");
        return user;

    }
}
