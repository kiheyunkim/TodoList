package com.kiheyunkim.todolist.todo.controller

import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping

/**
 * IDE : IntelliJ IDEA
 * Created by kiheyunkim@gmail.com on 2021-08-01
 * Github : http://github.com/kiheyunkim
 * Comment :
 */
@Controller
@RequestMapping("/todoList")
class TodoController {

	@PreAuthorize("hasRole('ROLE_USER')")
	@GetMapping
	fun getTodo(): String = "todoList"
}