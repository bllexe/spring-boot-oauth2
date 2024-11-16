package org.tigris.springbootoauth2.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/loginSuccess")
    public String loginSuccess(){
        return "loginSuccess";
    }
    @GetMapping("/loginFailure")
    public String loginFail(){
        return "loginFail";
    }

}
