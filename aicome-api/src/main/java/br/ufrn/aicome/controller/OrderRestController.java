package br.ufrn.aicome.controller;

import br.ufrn.aicome.changefeed.OrderChangeFeed;
import br.ufrn.aicome.model.Order;
import br.ufrn.aicome.model.dto.AddressDTO;
import br.ufrn.aicome.model.dto.OrderDTO;
import br.ufrn.aicome.model.dto.OrderReceiptDTO;
import br.ufrn.aicome.repository.OrderRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.Authorization;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.Random;

/**
 * Controller to manage things related to orders.
 */
@RestController
@Api(tags="Orders", value="order", description="Operations pertaining to orders", authorizations=@Authorization("oauth2"))
public class OrderRestController {

	/**
	 * Helper to send messages through the websocket.
	 */
	@Autowired
	private SimpMessageSendingOperations messagingTemplate;

    /**
     * Class that knows how handle changefeeds.
     */
	@Autowired
    private OrderChangeFeed orderChangeFeed;

    /**
     * Method that subscribes to the orders.
     * @param principal the authenticated user.
     */
    @SubscribeMapping("/orders")
    public void onSubscribeOrders(Principal principal){

        orderChangeFeed.onUserOrdersChange(principal.getName(), (object) -> {
            messagingTemplate.convertAndSendToUser(principal.getName(), "/topic/orders", object);
        });

    }

	/**
	 * Method which should capture any error and send the message
	 * to the user.
	 * @param exception the uncaught exception
	 * @return error message
	 */
	@MessageExceptionHandler
	@SendToUser(value = "/queue/errors", broadcast=false)
	public String handleException(Throwable exception) {
		return exception.getMessage();
	}


}
