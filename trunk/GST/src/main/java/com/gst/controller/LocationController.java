package com.gst.controller;

import com.gst.domain.Location;
import com.gst.domain.UserLocation;
import com.gst.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;


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
	@RequestMapping(value = "/getLocationByTime" , method = RequestMethod.GET)
	public ResponseEntity getLocationByTime(@RequestParam(value = "email", required = true) String  email, 
							@RequestParam(value = "fromDate", required = true) String fromDate,
							@RequestParam(value = "toDate", required = true) String toDate
							) throws ParseException {
		List<UserLocation> res = locationService.findByTime(email, fromDate, toDate);
		return new ResponseEntity(res,HttpStatus.OK);
	}
}
