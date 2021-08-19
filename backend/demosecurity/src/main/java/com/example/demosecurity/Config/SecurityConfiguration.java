package com.example.demosecurity.Config;


import com.example.demosecurity.Config.jwt.CustomAccessDeniedHandler;
import com.example.demosecurity.Config.service.CustomUserDetailsService;

import com.example.demosecurity.Config.jwt.JwtAuthenticationEntryPoint;
import com.example.demosecurity.Config.jwt.JwtFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(
//        securedEnabled = true,
//        jsr250Enabled = true,
        prePostEnabled = true
)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    //sử dụng để thiết lập cơ chế xác thực bằng cách cho phép dễ dàng thêm AuthenticationProviders
    @Override
    public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
        authenticationManagerBuilder
                .userDetailsService(userDetailsService)
                .passwordEncoder(passwordEncoder());
    }
    @Bean
    public JwtFilter jwtAuthenticationFilter() {return  new JwtFilter();}
    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
    @Bean
    public CustomAccessDeniedHandler customAccessDeniedHandler() {
        return new CustomAccessDeniedHandler();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable()
                .exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint).and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .headers().frameOptions().sameOrigin() //To enable H2 Database
                .and()
                .authorizeRequests()
                .antMatchers(
                        "/",
                        "/favicon.ico",
                        "/**/*.png",
                        "/**/*.gif",
                        "/**/*.svg",
                        "/**/*.jpg",
                        "/**/*.html",
                        "/**/*.css",
                        "/**/*.js"
                ).permitAll()//cho phép tất cả các user đều được phép truy cập
                .antMatchers(SecurityConstants.SIGN_UP_URLS).permitAll() //khai báo đường dẫn được phép của request
//                .antMatchers(H2_URL).permitAll() //khai báo đường dẫn Database của request
                .antMatchers(SecurityConstants.API_PRODUCTS).permitAll()
                .antMatchers(SecurityConstants.API_PRODUCTDETAIL).permitAll()
                .antMatchers(SecurityConstants.API_COLOR).permitAll()
                .antMatchers(SecurityConstants.API_CART).permitAll()
                .antMatchers(SecurityConstants.API_SIZES).permitAll()
                .antMatchers(SecurityConstants.API_CATEGORY).permitAll()
                .antMatchers(SecurityConstants.API_ORDER).permitAll()
                .antMatchers(SecurityConstants.API_IMAGE).permitAll()
                .anyRequest().authenticated();
// phải có cái này thì token mới xác thực
        http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling().accessDeniedHandler(customAccessDeniedHandler());;
    }
}
