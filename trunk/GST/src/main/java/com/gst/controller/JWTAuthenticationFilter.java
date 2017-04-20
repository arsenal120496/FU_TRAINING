package com.gst.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

public class JWTAuthenticationFilter extends GenericFilterBean {

    @Override
    public void doFilter(ServletRequest request,
                         ServletResponse response,
                         FilterChain filterChain)
            throws IOException, ServletException {
        Authentication authentication = TokenAuthenticationService
                .getAuthentication((HttpServletRequest)request);

//        System.out.println("method " + ((HttpServletRequest) request).getMethod());
//        if (!((HttpServletRequest) request).getMethod().equalsIgnoreCase("OPTIONS")){
//            System.out.println(((HttpServletRequest) request).getHeader("Authorization"));
//
//            SecurityContextHolder.getContext()
//                    .setAuthentication(authentication);
//            filterChain.doFilter(request,response);
//        } else {
//            //
//
//        }


//        System.out.println(response);
        //HttpServletResponse httpResp = (HttpServletResponse) response;
        //httpResp.setHeader("Access-Control-Allow-Origin", "*");
        //httpResp.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
        //httpResp.setHeader("Access-Control-Expose-Headers:", "Authorization");

        SecurityContextHolder.getContext()
                .setAuthentication(authentication);
        filterChain.doFilter(request,response);

    }
}