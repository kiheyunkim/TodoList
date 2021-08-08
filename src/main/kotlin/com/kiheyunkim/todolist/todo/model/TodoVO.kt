package com.kiheyunkim.todolist.todo.model

/**
 * IDE : IntelliJ IDEA
 * Created by kiheyunkim@gmail.com on 2021-08-03
 * Github : http://github.com/kiheyunkim
 * Comment :
 */
data class TodoVO(
	val task: String,
	val endDate: String,
	val isImportant: Boolean
)