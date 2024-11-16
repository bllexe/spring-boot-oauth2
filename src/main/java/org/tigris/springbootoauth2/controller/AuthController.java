package org.tigris.springbootoauth2.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.tigris.springbootoauth2.model.AuthResponse;
import org.tigris.springbootoauth2.model.LoginRequest;
import org.tigris.springbootoauth2.model.SignUpRequest;
import org.tigris.springbootoauth2.service.AuthenticationService;


@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationService authenticationService;


    public AuthController( AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/signup")
    @Transactional
    public ResponseEntity<AuthResponse> register(@RequestBody SignUpRequest signUpRequest){
        AuthResponse authResponse = authenticationService.register(signUpRequest);
        return ResponseEntity.ok(authResponse);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest){
        AuthResponse authResponse = authenticationService.login(loginRequest);
        return ResponseEntity.ok(authResponse);
    }

}
