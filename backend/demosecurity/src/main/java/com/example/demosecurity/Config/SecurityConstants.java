package com.example.demosecurity.Config;

public class SecurityConstants {
    public static final String SIGN_UP_URLS = "/secure/auth/**";
    public static final String API_PRODUCTS = "/v1/api/products/**";
    public static final String API_PRODUCTDETAIL = "/v1/api/productdetails/**";
    public static final String API_CATEGORY = "/v1/api/categorys/**";
    public static final String API_SIZES = "/v1/api/sizes/**";
    public static final String API_COLOR = "/v1/api/colors/**";
    public static final String API_CART = "/v1/api/cart";
    public static final String API_ORDER = "/v1/api/orders/**";
    public static final String API_IMAGE  = "/images/**";
    public static final String H2_URL = "h2-console/**";
    public static final String SECRET ="SecretKeyToGenJWTs";
    public static final String TOKEN_PREFIX= "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final long EXPIRATION_TIME = 24*60*60*1000; //24*3600 giay
}
