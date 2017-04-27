package com.gst.controller;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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


@CrossOrigin
@RestController
public class LocationController {

	@Autowired
	private LocationService locationService;
	
	
	
	
	@RequestMapping(value = "/addLocation" , method = RequestMethod.POST)
	public UserLocation addLocation(@RequestParam(value = "email", required = true) String  email, 
							@RequestParam(value = "deviceName", required = true) String deviceName,
							@RequestParam(value = "longtitude", required = true) String longtitude,
							@RequestParam(value = "latitude", required = true) String latitude,
							@RequestParam(value = "date", required = true) String date) throws ParseException{
		DateFormat df = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
		df.setTimeZone(TimeZone.getTimeZone("UTC"));
        Date fDate = df.parse(date);
        System.out.println("Binh = = = "+date);
		UserLocation u = new UserLocation(email,new Location(longtitude, latitude),deviceName, fDate);
		locationService.save(u);
		return u;
	}
	
	@CrossOrigin
	@RequestMapping(value = "/getLocationByTime" , method = RequestMethod.GET)
	public ResponseEntity getLocationByTime(@RequestParam(value = "email", required = true) String  email, 
							@RequestParam(value = "fromDate", required = true) String fromDate,
							@RequestParam(value = "toDate", required = true) String toDate,
							@RequestParam(value = "pageID", required = true) String pageID
							) throws ParseException {
			System.out.println("Viet ==== " + email);
		List<UserLocation> res = locationService.findByTime(email, fromDate, toDate, pageID);

		if(res == null){
			return new ResponseEntity("Not found",HttpStatus.OK);
		}
		return new ResponseEntity(res,HttpStatus.OK);
	}
	
	

}
