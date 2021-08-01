package com.kiheyunkim.todolist.common.controller

import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import javax.servlet.http.HttpSession

/**
 * IDE : IntelliJ IDEA
 * Created by kiheyunkim@gmail.com on 2021-08-01
 * Github : http://github.com/kiheyunkim
 * Comment :
 */
@Controller
class CommonController {
	@GetMapping(value = ["/index.html", "/"])
	fun getIndex(
		@RequestParam(name = "errorType", required = false) errorType: String?,
		session: HttpSession,
		model:Model
	): String {

		return if (session.getAttribute("userEmail") != null) {
			"redirect:/todoList"
		} else {
			model.addAttribute("errorType", errorType)
			"index"
		}
	}
}