package com.kiheyunkim.todolist.todo.controller

import com.kiheyunkim.todolist.common.model.TodoResponse
import com.kiheyunkim.todolist.todo.model.TodoElement
import com.kiheyunkim.todolist.todo.model.TodoPageResult
import com.kiheyunkim.todolist.todo.model.TodoVO
import com.kiheyunkim.todolist.todo.service.TodoService
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*
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
	@ResponseBody
	@PutMapping("/add")
	fun addTodoElement(todoVO: TodoVO, httpSession: HttpSession): TodoResponse<Boolean> {
		val email: String = httpSession.getAttribute("userEmail") as String

		todoService.addTodoElement(email, todoVO)

		return TodoResponse(true)
	}

	@PreAuthorize("hasRole('ROLE_USER')")
	@ResponseBody
	@GetMapping("/count")
	fun getTodoElementsCount(
		@RequestParam(required = false) inquireBaseDate: String?,
		httpSession: HttpSession
	): TodoResponse<Long> {
		val email: String = httpSession.getAttribute("userEmail") as String
		return TodoResponse(todoService.getTodoElementsCount(email, inquireBaseDate))
	}

	@PreAuthorize("hasRole('ROLE_USER')")
	@ResponseBody
	@GetMapping("/list")
	fun getTodoList(
		@RequestParam(required = false) inquireBaseDate: String?,
		page: Long,
		httpSession: HttpSession
	): TodoResponse<List<TodoPageResult>> {
		val email: String = httpSession.getAttribute("userEmail") as String

		println(todoService.getTodoElements(email, inquireBaseDate, page))
		return TodoResponse(todoService.getTodoElements(email, inquireBaseDate, page))
	}
}