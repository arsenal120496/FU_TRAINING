package com.gst.domain;

import java.util.List;

public class Page {
	List<UserLocation> list;
	public List<UserLocation> getList() {
		return list;
	}

	public void setList(List<UserLocation> list) {
		this.list = list;
	}

	public String getPageIndex() {
		return pageIndex;
	}

	public void setPageIndex(String pageIndex) {
		this.pageIndex = pageIndex;
	}

	String pageIndex;
	
	public Page() {
		// TODO Auto-generated constructor stub
	}

	public Page(List<UserLocation> list, String pageIndex) {
		this.list = list;
		this.pageIndex = pageIndex;
	}
	
	
	
	
}
