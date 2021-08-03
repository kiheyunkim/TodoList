package com.kiheyunkim.todolist.todo.controller

import com.kiheyunkim.todolist.common.model.TodoResponse
import com.kiheyunkim.todolist.todo.model.TodoElement
import com.kiheyunkim.todolist.todo.model.TodoVO
import com.kiheyunkim.todolist.todo.service.TodoService
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseBody
import java.time.LocalDate
import javax.servlet.http.HttpSession

/**
 * IDE : IntelliJ IDEA
 * Created by kiheyunkim@gmail.com on 2021-08-01
 * Github : http://github.com/kiheyunkim
 * Comment :
 */
@Controller
@RequestMapping("/todoList")
class TodoController(private val todoService: TodoService) {

	@PreAuthorize("hasRole('ROLE_USER')")
	@GetMapping
	fun getTodo(): String = "todoList"

	@PreAuthorize("hasRole('ROLE_USER')")
	@GetMapping("/count")
	fun getTodoElementsCount(inquireBaseDate: LocalDate, httpSession: HttpSession): TodoResponse<Long> {
		val email: String = httpSession.getAttribute("email") as String
		return TodoResponse(todoService.getTodoElementsCount(email, inquireBaseDate))
	}

	//PreAuthorize("hasRole('ROLE_USER')")
	@PutMapping("/add")
	@ResponseBody
	fun addTodoElement(todoVO: TodoVO, httpSession: HttpSession): TodoResponse<Boolean> {
		val email: String = httpSession.getAttribute("email") as String

		todoService.addTodoElement(email, todoVO)

		return TodoResponse(true)
	}
}