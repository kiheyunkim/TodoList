package com.kiheyunkim.todolist.todo.model

import java.time.LocalDate

/**
 * IDE : IntelliJ IDEA
 * Created by kiheyunkim@gmail.com on 2021-08-03
 * Github : http://github.com/kiheyunkim
 * Comment :
 */
data class TodoElement(
	val email: String,
	val task: String,
	val endDate: LocalDate,
	val registerDate: LocalDate
)
