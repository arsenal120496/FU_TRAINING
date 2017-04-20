package com.gst.domain;

/**
 * Created by truonghuuthanh on 4/20/17.
 */
public class UserTokenRespone {
    String email;
    String name;
    String tokenHeader;
    String tokenValue;

    public UserTokenRespone(String email, String name, String tokenHeader, String tokenValue) {
        this.email = email;
        this.name = name;
        this.tokenHeader = tokenHeader;
        this.tokenValue = tokenValue;
    }

    public UserTokenRespone() {
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTokenHeader() {
        return tokenHeader;
    }

    public void setTokenHeader(String tokenHeader) {
        this.tokenHeader = tokenHeader;
    }

    public String getTokenValue() {
        return tokenValue;
    }

    public void setTokenValue(String tokenValue) {
        this.tokenValue = tokenValue;
    }
}
