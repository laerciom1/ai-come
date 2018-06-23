package br.ufrn.aicome.controller;

import static java.util.concurrent.TimeUnit.SECONDS;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;

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
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;
import org.springframework.web.socket.sockjs.client.SockJsClient;
import org.springframework.web.socket.sockjs.client.Transport;
import org.springframework.web.socket.sockjs.client.WebSocketTransport;

import br.ufrn.aicome.model.dto.AuthDTO;
import br.ufrn.aicome.model.dto.OrderDTO;
import br.ufrn.aicome.model.dto.OrderReceiptDTO;
import br.ufrn.aicome.model.enums.Permission;
import br.ufrn.aicome.security.SecurityConstants;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class OrderSocketControllerTest {

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
	@Before
	public void setup() throws Exception {
		String token = createToken();
		String url = String.format("ws://localhost:%d/ws?%s=%s", port, SecurityConstants.ACCESS_TOKEN_PARAMETER, token);
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
	@Test
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
	@Test
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
	 * Auxiliary method to generate a JWT token
	 * authentication to 'admin' user.
	 * @return JWT Token
	 */
	private String createToken() {

		try {
			AuthDTO credentials = new AuthDTO();
			credentials.setUsername("admin");
			credentials.setPermissions(Arrays.asList(Permission.ADMIN));
			ObjectMapper mapper = new ObjectMapper();
			String token = Jwts.builder()
					.setSubject(mapper.writeValueAsString(credentials))
					.setExpiration(new Date(System.currentTimeMillis() + SecurityConstants.EXPIRATION_TIME))
					.signWith(SignatureAlgorithm.HS512, SecurityConstants.SECRET.getBytes())
					.compact();
			return token;
		} catch (JsonProcessingException e){
			return "";
		}


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

}
