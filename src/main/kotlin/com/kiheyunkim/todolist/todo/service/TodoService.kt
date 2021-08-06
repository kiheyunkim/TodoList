package com.kiheyunkim.todolist.todo.service

import com.kiheyunkim.todolist.todo.model.TodoElement
import com.kiheyunkim.todolist.todo.model.TodoVO
import com.kiheyunkim.todolist.todo.repository.TodoRepository
import org.springframework.stereotype.Service
import java.time.LocalDate
import java.time.format.DateTimeFormatter

/**
 * IDE : IntelliJ IDEA
 * Created by kiheyunkim@gmail.com on 2021-08-03
 * Github : http://github.com/kiheyunkim
 * Comment :
 */
@Service
class TodoService(private val todoRepository: TodoRepository) {

	fun addTodoElement(email: String, todoVO: TodoVO){
		todoRepository.addTodoData(
			TodoElement(
				email,
				todoVO.task,
				LocalDate.parse(todoVO.endDate, DateTimeFormatter.ofPattern("yyyy-MM-dd")),
				LocalDate.now()
			)
		)
	}


	fun getTodoElementsCount(email: String, inquireBaseDate: LocalDate?) =
		todoRepository.getTodoTotalCount(email, inquireBaseDate)

	fun getTodoElements(email: String, inquireBaseDate: LocalDate?, page: Long) =
		todoRepository.getTodoData(email, inquireBaseDate, page)
}