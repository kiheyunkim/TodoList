package com.kiheyunkim.todolist.common.model

/**
 * IDE : IntelliJ IDEA
 * Created by kiheyunkim@gmail.com on 2021-08-03
 * Github : http://github.com/kiheyunkim
 * Comment :
 */
data class TodoResponse<T>(
	var result: T,
	var errorType: String?,
	var errorMessage: String?
) {
	constructor(result: T) : this(result, null, null)
}
