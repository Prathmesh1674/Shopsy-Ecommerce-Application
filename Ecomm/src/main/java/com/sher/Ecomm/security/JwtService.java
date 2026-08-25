package com.sher.Ecomm.security;

//JWT stands for JSON Web Token.

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class JwtService {

    // Secret key used to sign JWT tokens
    //JWT tokens are digitally signed.Without this key,anyone could create fake tokens.
    private static final SecretKey SECRET_KEY =
            Keys.hmacShaKeyFor(
                    "mysecretkeymysecretkeymysecretkey123456".getBytes()
            );

    // Generate JWT Token
    //Header
    //Payload
    //{ email : rahul@gmail.com
    // issuedAt
    // expiration}
    //Signature
    public String generateToken(String email) {

        return Jwts.builder()
                .subject(email)//stores mail inside the token.
                // Later,you don't need to query the login form again.You simply read the email from the JWT.
                .issuedAt(new Date())//Login Time
                .expiration(new Date(System.currentTimeMillis() + 86400000))//24 hours
                .signWith(SECRET_KEY)//This creates the digital signature. Without it,JWT is insecure.
                .compact();//Converts everything into one String.
    }

    // Extract Email from JWT
    public String extractUsername(String token) {

        return extractAllClaims(token).getSubject();
    }

    // Validate Token Checks: Email matches? Token expired? If both are true: true
    public boolean isTokenValid(String token, String email) {

        return email.equals(extractUsername(token))
                && !isTokenExpired(token);
    }

    // Check Expiration
    private boolean isTokenExpired(String token) {

        return extractAllClaims(token)
                .getExpiration()
                .before(new Date());
    }

    // Read all claims  Header Payload Expiration Subject,etc.from JWT.
    private Claims extractAllClaims(String token) {

        return Jwts
                .parser()
                .verifyWith(SECRET_KEY)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}