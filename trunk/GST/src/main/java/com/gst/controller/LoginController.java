package com.gst.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.gst.domain.User;
import com.gst.domain.UserTokenRespone;
import com.gst.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@RestController
public class LoginController {

    @Autowired
    private UserService userService;

    @CrossOrigin
    @RequestMapping(value = "/login", method = RequestMethod.POST, produces = "application/json")
    public ResponseEntity login(@RequestParam(value = "email", required = true) String email,
                                @RequestParam(value = "password", required = true) String password, HttpServletResponse res)
                                            throws JsonProcessingException {
    	User user = userService.login(email, password);
        String result = null;
        if (user != null) {
            TokenAuthenticationService.addAuthentication(res, email);
            ObjectMapper obj = new ObjectMapper();
            result = obj.writeValueAsString(user);

            String token = TokenAuthenticationService.gettoken(res, email);
            UserTokenRespone userTokenRespone = new UserTokenRespone(user.getEmail(), user.getName(), TokenAuthenticationService.HEADER_STRING, token);

            return new ResponseEntity(userTokenRespone, HttpStatus.OK);
        }
        else{
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }

    }

    @RequestMapping(value = "/loginMobile", method = RequestMethod.POST)
    public ResponseEntity<User> loginMobile(@RequestParam(value = "email", required = true) String  email, @RequestParam(value = "password", required = true) String password){
    	User user = userService.login(email, password);
        if (user != null){
            return new ResponseEntity(user.getName(),HttpStatus.OK);
        } else {
            return new ResponseEntity("Login failed", HttpStatus.NOT_FOUND);
        }
    }
    
}
