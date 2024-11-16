package org.tigris.springbootoauth2.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.tigris.springbootoauth2.entity.User;
import org.tigris.springbootoauth2.model.AuthResponse;
import org.tigris.springbootoauth2.model.LoginRequest;
import org.tigris.springbootoauth2.model.SignUpRequest;
import org.tigris.springbootoauth2.repos.UserRepository;
import org.tigris.springbootoauth2.security.TokenProvider;

@Service
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    private final CustomUserDetailsService customUserDetailsService;
    private final AuthenticationManager authenticationManager;


    public AuthenticationService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager,TokenProvider tokenProvider, CustomUserDetailsService customUserDetailsService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
        this.customUserDetailsService = customUserDetailsService;
        this.authenticationManager = authenticationManager;
    }

    public AuthResponse register(SignUpRequest signUpRequest) {
        Boolean isUser = userRepository.existsByEmail(signUpRequest.email());
        if(isUser){
            throw new IllegalArgumentException("User already exists");
        }

        User user = new User();
        user.setName(signUpRequest.name());
        user.setEmail(signUpRequest.email());
        user.setPassword(passwordEncoder.encode(signUpRequest.password()));
        user = userRepository.save(user);

        UserDetails userDetails = customUserDetailsService.createUserDetails(user);
        String token = tokenProvider.generateToken(userDetails);
        return new AuthResponse(user.getName(),user.getEmail(),token);

    }

    public AuthResponse login(LoginRequest loginRequest) {

        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.email(), loginRequest.password()));
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            User user = userRepository.findByEmail(userDetails.getUsername()).orElseThrow(() -> new RuntimeException("User not found"));
            String token = tokenProvider.generateToken(userDetails);
            return new AuthResponse(user.getName(), user.getEmail(), token);
        }catch (BadCredentialsException ex){
            throw new IllegalArgumentException("Bad credentials");
        }
    }
}
