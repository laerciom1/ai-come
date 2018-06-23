package br.ufrn.aicome.security;

import static br.ufrn.aicome.security.SecurityConstants.ACCESS_TOKEN_PARAMETER;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import br.ufrn.aicome.model.dto.AuthDTO;
import io.jsonwebtoken.Jwts;

public class JWTAuthorizationFilter extends BasicAuthenticationFilter {

    public JWTAuthorizationFilter(AuthenticationManager authManager) {
        super(authManager);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest req,
                                    HttpServletResponse res,
                                    FilterChain chain) throws IOException, ServletException {
        String header = req.getHeader(SecurityConstants.HEADER_STRING);

        boolean hasTokenParameter = req.getParameter(ACCESS_TOKEN_PARAMETER) != null;
        boolean hasTokenHeader = header != null && header.startsWith(SecurityConstants.TOKEN_PREFIX);

        if (!hasTokenParameter && !hasTokenHeader) {
            chain.doFilter(req, res);
            return;
        }

        UsernamePasswordAuthenticationToken authentication = getAuthentication(req);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        chain.doFilter(req, res);
    }

    private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) throws JsonParseException, JsonMappingException, IOException {
    		
    	ObjectMapper mapper = new ObjectMapper();
    		
        String token = request.getHeader(SecurityConstants.HEADER_STRING);

        if(token == null){
            token = request.getParameter(SecurityConstants.ACCESS_TOKEN_PARAMETER);
        }

        if (token != null) {
            // parse the token.
            String user = Jwts.parser()
                    .setSigningKey(SecurityConstants.SECRET.getBytes())
                    .parseClaimsJws(token.replace(SecurityConstants.TOKEN_PREFIX, ""))
                    .getBody().getSubject();

            if (user != null) {
            	AuthDTO details = mapper.readValue(user,AuthDTO.class);
            	Collection<SimpleGrantedAuthority> authorities =  new ArrayList<>();

            	if(details.getPermissions() != null){
                    details.getPermissions().forEach(permission -> {authorities.add(new SimpleGrantedAuthority("ROLE_"+permission));});
                }

                return new UsernamePasswordAuthenticationToken(details, null, authorities);
            }
            return null;
        }




        return null;
    }
}