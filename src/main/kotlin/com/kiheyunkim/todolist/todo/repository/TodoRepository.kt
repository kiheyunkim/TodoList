package com.kiheyunkim.todolist.todo.repository

import com.kiheyunkim.todolist.todo.model.TodoElement
import org.springframework.data.domain.Sort
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.query.Criteria
import org.springframework.data.mongodb.core.query.Query
import org.springframework.data.mongodb.core.query.Update
import org.springframework.data.mongodb.core.remove
import org.springframework.stereotype.Repository
import java.time.LocalDate

/**
 * IDE : IntelliJ IDEA
 * Created by kiheyunkim@gmail.com on 2021-08-03
 * Github : http://github.com/kiheyunkim
 * Comment :
 */
@Repository
class TodoRepository(private val mongoTemplate: MongoTemplate) {
	private val onPageCount: Int = 5

	fun addTodoData(todoDate: TodoElement) {
		mongoTemplate.save(todoDate)
	}

	fun getTodoTotalCount(email: String, inquireBaseDate: LocalDate?): Long {

		val criteria: Criteria = if (inquireBaseDate == null) {
			Criteria.where("email").`is`(email)
		} else {
			Criteria.where("endDate").gte(inquireBaseDate).and("email").`is`(email)
		}

		val query: Query = Query.query(criteria)

		return mongoTemplate.count(query, "todoElement")
	}

	fun getTodoData(email: String, inquireBaseDate: LocalDate?, page: Long): List<TodoElement> {
		val criteria: Criteria = if (inquireBaseDate == null) {
			Criteria.where("email").`is`(email)
		} else {
			Criteria.where("endDate").gte(inquireBaseDate).and("email").`is`(email)
		}

		val query: Query =
			Query.query(criteria).with(Sort.by(Sort.Direction.ASC, "endDate")).skip(onPageCount * (page - 1))
				.limit(onPageCount)

		return mongoTemplate.find(query, TodoElement::class.java, "todoElement")
	}

	fun changeTodoState(email: String, todoId: Long, importantState: Boolean) {
		val criteria: Criteria = Criteria.where("email").`is`(email).and("_id").`is`(todoId)

		val update: Update = Update.update("isImportant", importantState)

		mongoTemplate.updateFirst(Query.query(criteria), update, "todoElement")
	}

	fun deleteTodoElement(email: String, todoId: Long) {
		val criteria: Criteria = Criteria.where("email").`is`(email).and("_id").`is`(todoId)

		mongoTemplate.remove(Query.query(criteria), "todoElement")
	}
}