/* (C)2026 */
package hosman.controller;

import hosman.service.WebSocketService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WebSocketController {

    private final WebSocketService notificationService;

    public WebSocketController(WebSocketService notificationService) {
        this.notificationService = notificationService;
    }

    //
    // Endpoints
    //

    @PostMapping("/notify")
    public void notifyClients(@RequestBody String message) {
        notificationService.broadcast(message);
    }
}
