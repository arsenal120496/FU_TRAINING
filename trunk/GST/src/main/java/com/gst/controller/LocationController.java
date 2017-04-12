package com.gst.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gst.domain.UserLocation;
import com.gst.service.LocationService;


@RestController
public class LocationController {

	@Autowired
	private LocationService locationService;
	
	
	@RequestMapping("/location")
	public void addLocation(@RequestBody UserLocation userLocation){
		locationService.save(userLocation);
	}
}
