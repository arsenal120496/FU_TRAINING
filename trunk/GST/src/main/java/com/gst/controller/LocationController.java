package com.gst.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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
							@RequestParam(value = "latitude", required = true) String latitude,
							@RequestParam(value = "date", required = true) String date){	
		UserLocation u = new UserLocation(email,new Location(longtitude, latitude),deviceName, date);
		locationService.save(u);
		return true;
	}
	
	@CrossOrigin
	@RequestMapping(value = "/getLocationByTime" , method = RequestMethod.POST)
	public ResponseEntity getLocationByTime(@RequestParam(value = "email", required = true) String  email, 
							@RequestParam(value = "fromDate", required = true) String fromDate,
							@RequestParam(value = "toDate", required = true) String toDate
							){	
		List<UserLocation> res = locationService.findByTime(email, fromDate, toDate);
		return new ResponseEntity(res,HttpStatus.OK);
	}
}
