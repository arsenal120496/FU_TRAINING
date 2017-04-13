package com.gst.controller;

import com.gst.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
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
    public Map<String, Object> list(@RequestParam(value = "email", required = true) String email){
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("locations", locationService.findByEmail(email));
        return result;
    }


}
