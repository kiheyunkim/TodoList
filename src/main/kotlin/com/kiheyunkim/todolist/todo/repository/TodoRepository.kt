package com.kiheyunkim.todolist.todo.repository

import com.kiheyunkim.todolist.todo.model.TodoElement
import org.springframework.data.domain.Sort
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.query.Criteria
import org.springframework.data.mongodb.core.query.Query
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
	fun addTodoData(todoDate: TodoElement) {
		mongoTemplate.save(todoDate)
	}

	fun getTodoTotalCount(email: String, inquireBaseDate: LocalDate): Long {
		val criteria: Criteria = Criteria.where("endDate").gte(inquireBaseDate).and("endDate").and("email").`is`(email)
		val query: Query = Query.query(criteria)

		return mongoTemplate.count(query, "TodoElement")
	}

	fun getTodoData(email: String, inquireBaseDate: LocalDate): List<TodoElement> {
		val criteria: Criteria = Criteria.where("endDate").gte(inquireBaseDate).and("email").`is`(email)
		val query: Query = Query.query(criteria)
		query.with(Sort.by(Sort.Direction.ASC, "endDate"))

		return mongoTemplate.find(query, TodoElement::class.java, "TodoElement")
	}
}