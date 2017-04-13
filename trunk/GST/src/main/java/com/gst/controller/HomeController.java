package com.gst.controller;

import com.gst.domain.UserLocation;
import com.gst.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by truonghuuthanh on 4/4/17.
 */
@RestController
@RequestMapping("/home")
public class HomeController {
    @Autowired
    LocationService locationService;

    @CrossOrigin
    @GetMapping(value = "/locations", produces = "application/json")
    public ResponseEntity list(@RequestParam(value = "email", required = true) String email){
        List<UserLocation> ul = locationService.findByEmail(email);
        return new ResponseEntity(ul, HttpStatus.OK);
    }


}
