package com.kiheyunkim.todolist.todo.service

import com.kiheyunkim.todolist.todo.model.TodoElement
import com.kiheyunkim.todolist.todo.model.TodoPageResult
import com.kiheyunkim.todolist.todo.model.TodoVO
import com.kiheyunkim.todolist.todo.repository.MongoSequenceRepository
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
class TodoService(
	private val todoRepository: TodoRepository,
	private val mongoSequenceRepository: MongoSequenceRepository
) {

	fun addTodoElement(email: String, todoVO: TodoVO) {

		val sequenceId = mongoSequenceRepository.getNextSequenceId("TodoList")

		todoRepository.addTodoData(
			TodoElement(
				sequenceId,
				email,
				todoVO.task,
				LocalDate.parse(todoVO.endDate, DateTimeFormatter.ofPattern("yyyy-MM-dd")),
				LocalDate.now(),
				todoVO.isImportant
			)
		)
	}


	fun getTodoElementsCount(email: String, inquireBaseDate: String?) =
		todoRepository.getTodoTotalCount(
			email,
			LocalDate.parse(inquireBaseDate, DateTimeFormatter.ofPattern("yyyy-MM-dd"))
		)

	fun getTodoElements(email: String, inquireBaseDate: String?, page: Long): List<TodoPageResult> {
		val baseDate: LocalDate = LocalDate.parse(inquireBaseDate, DateTimeFormatter.ofPattern("yyyy-MM-dd"))
		val list = todoRepository.getTodoData(
			email,
			baseDate,
			page
		)

		return list.map {
			TodoPageResult(
				it.id,
				it.task,
				ChronoUnit.DAYS.between(
					baseDate,
					it.endDate
				),
				it.isImportant
			)
		}
	}

	fun changeTodoElementState(email: String, todoElementId: Long, importantState: Boolean) {
		todoRepository.changeTodoState(email, todoElementId, importantState)
	}

	fun deleteTodoElement(email: String, todoElementId: Long) {
		todoRepository.deleteTodoElement(email, todoElementId)
	}

}