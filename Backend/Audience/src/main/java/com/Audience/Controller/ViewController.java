package com.Audience.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {

    @GetMapping(value = "/{path:^(?!api|static|.*\\..*).*$}")

    public String forwardToIndex() {
        return "forward:/index.html";
    }
}
