package com.kiheyunkim.todolist.todo.service

import com.kiheyunkim.todolist.todo.model.TodoElement
import com.kiheyunkim.todolist.todo.model.TodoPageResult
import com.kiheyunkim.todolist.todo.model.TodoVO
import com.kiheyunkim.todolist.todo.repository.TodoRepository
import org.springframework.stereotype.Service
import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.time.temporal.ChronoUnit

/**
 * IDE : IntelliJ IDEA
 * Created by kiheyunkim@gmail.com on 2021-08-03
 * Github : http://github.com/kiheyunkim
 * Comment :
 */
@Service
class TodoService(private val todoRepository: TodoRepository) {

	fun addTodoElement(email: String, todoVO: TodoVO) {
		todoRepository.addTodoData(
			TodoElement(
				email,
				todoVO.task,
				LocalDate.parse(todoVO.endDate, DateTimeFormatter.ofPattern("yyyy-MM-dd")),
				LocalDate.now()
			)
		)
	}


	fun getTodoElementsCount(email: String, inquireBaseDate: String?) =
		todoRepository.getTodoTotalCount(
			email,
			LocalDate.parse(inquireBaseDate, DateTimeFormatter.ofPattern("yyyy-MM-dd"))
		)

	fun getTodoElements(email: String, inquireBaseDate: String?, page: Long): List<TodoPageResult> {
		val list = todoRepository.getTodoData(
			email,
			LocalDate.parse(inquireBaseDate, DateTimeFormatter.ofPattern("yyyy-MM-dd")),
			page
		)

		return list.map { TodoPageResult(it.task, ChronoUnit.DAYS.between(LocalDate.now(), it.endDate)) }
	}

}