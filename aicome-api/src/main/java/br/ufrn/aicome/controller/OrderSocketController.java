package br.ufrn.aicome.controller;

import java.security.Principal;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

import br.ufrn.aicome.model.dto.OrderDTO;
import br.ufrn.aicome.model.dto.OrderReceiptDTO;

/**
 * Controller to manage things related to orders.
 */
@Controller
public class OrderSocketController {

	/**
	 * Helper to send messages through the websocket.
	 */
	@Autowired
	private SimpMessageSendingOperations messagingTemplate;

	/**
	 * Method that listens at /orders/request topic.
	 * And send a response back to '/user/orders/confirm' topic.
	 * Notice that the /user/ is at the beginning is appended
	 * by spring when using @SendToUser annotation.
	 *
	 * @param order the requested order.
	 * @return the order receipt.
	 */
	@MessageMapping("/orders/request")
	public void onReceiveOrderRequest(@Payload OrderDTO order, Principal principal){
		OrderReceiptDTO orderReceipt = new OrderReceiptDTO();
		orderReceipt.setOrder(order);
		orderReceipt.setConfirmationId(new Random().nextLong());
		orderReceipt.setEstimatedTime(new Random().nextLong());

		messagingTemplate.convertAndSendToUser(principal.getName(),"/topic/orders/confirm", orderReceipt);
		messagingTemplate.convertAndSend("/topic/stores/order", order); //TODO adjusment to send it only to the specific store
	}

	/**
	 * Method which should capture any error and send the message
	 * to the user.
	 * @param exception the uncaught exception
	 * @return error message
	 */
	@MessageExceptionHandler
	@SendToUser("/queue/errors")
	public String handleException(Throwable exception) {
		return exception.getMessage();
	}


}
