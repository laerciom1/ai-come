package br.ufrn.aicome.controller;

import br.ufrn.aicome.model.User;
import br.ufrn.aicome.model.dto.AuthDTO;
import br.ufrn.aicome.model.dto.OrderDTO;
import br.ufrn.aicome.model.dto.OrderReceiptDTO;
import br.ufrn.aicome.model.enums.Permission;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.messaging.converter.MappingJackson2MessageConverter;
import org.springframework.messaging.simp.stomp.StompFrameHandler;
import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.OAuth2Request;
import org.springframework.security.oauth2.provider.token.DefaultTokenServices;
import org.springframework.security.oauth2.provider.token.TokenEnhancerChain;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
import org.springframework.security.oauth2.provider.token.store.JwtTokenStore;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;
import org.springframework.web.socket.sockjs.client.SockJsClient;
import org.springframework.web.socket.sockjs.client.Transport;
import org.springframework.web.socket.sockjs.client.WebSocketTransport;

import java.lang.reflect.Type;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;

import static java.util.concurrent.TimeUnit.SECONDS;

//@RunWith(SpringJUnit4ClassRunner.class)
//@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class OrderSocketControllerTest { // TODO adjust the tests to the new endpoint routes.

	/**
	 * Websocket Order Request Endpoint.
	 */
	private static final String SEND_ORDER_REQUEST = "/app/orders/request";

	/**
	 * Websocket User Topic Endpoint.
	 */
	private static final String SUBSCRIBE_USER_ORDER_CONFIRMATION = "/user/topic/orders/confirm";

	/**
	 * Websocket Store Order Topic.
	 */
	private static final String SUBSCRIBE_STORE_ORDER_TOPIC = "/topic/stores/order";

	/**
	 * Random server port to be used in test.
	 */
	@Value("${local.server.port}")
	private int port;

	/**
	 * The signing key to use in token.
	 */
	@Value("${security.signing-key}")
	private String signingKey;

	/**
	 * Token expiration time in seconds.
	 */
	@Value("${security.jwt.expiration}")
	private int expirationToken;

	/**
	 * Stomp Websocket Client.
	 */
	private WebSocketStompClient stompClient;

	/**
	 * Stomp Session Client.
	 */
	private StompSession stompSession;

	/**
	 * Prepare required data in tests.
	 */
//	@Before
	public void setup() throws Exception {
		String accessToken = obtainAccessToken("admin", "admin");
		String url = String.format("ws://localhost:%d/ws?access_token=%s", port, accessToken);
		stompClient = new WebSocketStompClient(new SockJsClient(createTransportClient()));
		stompClient.setMessageConverter(new MappingJackson2MessageConverter());
		stompSession = stompClient.connect(url, new StompSessionHandlerAdapter() {}).get(1, SECONDS);
	}

	/**
	 * Tests the store orders topic.
	 *
	 * send order to /app/orders/request and expect receive
	 * a receipt at /user/topic/orders/confirm.
	 *
	 * @throws Exception
	 */
//	@Test
	public void testReceiveOrderStore() throws Exception {

		final CompletableFuture<Object> completableFuture = new CompletableFuture<>();

		stompSession.subscribe(SUBSCRIBE_STORE_ORDER_TOPIC, new StompFrameHandler() {
			@Override
			public Type getPayloadType(StompHeaders stompHeaders) {
				return Object.class;
			}

			@Override
			public void handleFrame(StompHeaders stompHeaders, Object o) {
				completableFuture.complete(o);
			}
		});

		stompSession.send(SEND_ORDER_REQUEST, new OrderDTO());

		Object order = completableFuture.get(10, TimeUnit.SECONDS);
		Assert.assertNotNull(order);

	}

	/**
	 * Tests the order request endpoint.
	 *
	 * send a order to /app/orders/request and expect receive
	 * a order at /topic/stores/order.
	 */
//	@Test
	public void testSendOrderEndpoint() throws Exception {

		final CompletableFuture<Object> completableFuture = new CompletableFuture<>();

		stompSession.subscribe(SUBSCRIBE_USER_ORDER_CONFIRMATION, new StompFrameHandler() {
			@Override
			public Type getPayloadType(StompHeaders stompHeaders) {
				return OrderReceiptDTO.class;
			}

			@Override
			public void handleFrame(StompHeaders stompHeaders, Object o) {
				completableFuture.complete(o);
			}
		});

		stompSession.send(SEND_ORDER_REQUEST, new OrderDTO());

		Object returnedValue = completableFuture.get(10, TimeUnit.SECONDS);
		Assert.assertNotNull(returnedValue);

	}

	/**
	 * Create transport client used in websocket.
	 * @return standard websocket client.
	 */
	private List<Transport> createTransportClient() {
		List<Transport> transports = new ArrayList<>(1);
		transports.add(new WebSocketTransport(new StandardWebSocketClient()));
		return transports;
	}

	/**
	 * Auxiliary method to generate a jwt token.
	 * @param username the username.
	 * @param password the user password.
	 * @return access token jwt.
	 */
	private String obtainAccessToken(String username, String password) throws Exception {

		JwtAccessTokenConverter accessTokenConverter = new JwtAccessTokenConverter();
		accessTokenConverter.setSigningKey(signingKey);

		TokenStore tokenStore = new JwtTokenStore(accessTokenConverter);

		DefaultTokenServices defaultTokenServices = new DefaultTokenServices();
		defaultTokenServices.setTokenStore(tokenStore);
		defaultTokenServices.setSupportRefreshToken(true);

		TokenEnhancerChain enhancerChain = new TokenEnhancerChain();
		enhancerChain.setTokenEnhancers(Arrays.asList(accessTokenConverter));

		defaultTokenServices.setTokenEnhancer(enhancerChain);

		Map<String, String> authorizationParameters = new HashMap<>();
		authorizationParameters.put("scope", "read write");
		authorizationParameters.put("username", username);
		authorizationParameters.put("client_id", "aicome-web");
		authorizationParameters.put("client_secret", "aicome-web");
		authorizationParameters.put("grant_type", "password");

		Set<GrantedAuthority> authorities = new HashSet<>();
		authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));

		Set<String> responseType = new HashSet<>();
		responseType.add("password");

		Set<String> scopes = new HashSet<>();
		scopes.add("read");
		scopes.add("write");

		OAuth2Request authorizationRequest = new OAuth2Request(
				authorizationParameters, "aicome-web",
				authorities, true, scopes, null, "",
				responseType, null);

		User user = new User();
		user.setUsername(username);

		UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(user, null, authorities);

		OAuth2Authentication authenticationRequest = new OAuth2Authentication(authorizationRequest, authenticationToken);
		authenticationRequest.setAuthenticated(true);

		OAuth2AccessToken accessToken = defaultTokenServices.createAccessToken(authenticationRequest);
		return accessToken.getValue();
	}

}
