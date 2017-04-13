package com.gst.controller;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gst.domain.Location;
import com.gst.domain.UserLocation;
import com.gst.service.LocationService;


@RestController
public class LocationController {

	@Autowired
	private LocationService locationService;
	
	
	@RequestMapping(value = "/addLocation" , method = RequestMethod.POST)
	public boolean addLocation(@RequestParam(value = "email", required = true) String  email, 
							@RequestParam(value = "deviceName", required = true) String deviceName,
							@RequestParam(value = "longtitude", required = true) String longtitude,
							@RequestParam(value = "latitude", required = true) String latitude){
		Date d = new Date();
		SimpleDateFormat sdf =  new SimpleDateFormat();
		String time = sdf.format(d);	
		UserLocation u = new UserLocation(email,new Location(longtitude, latitude),deviceName, time);
		locationService.save(u);
		return true;
	}
}
