package com.kiheyunkim.todolist.login.controller

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping

/**
 * IDE : IntelliJ IDEA
 * Created by kiheyunkim@gmail.com on 2021-07-31
 * Github : http://github.com/kiheyunkim
 * Comment :
 */
@Controller
class LoginController {
	@GetMapping("/login")
	fun getLogin(): String = "redirect:/oauth2/authorization/google"
}