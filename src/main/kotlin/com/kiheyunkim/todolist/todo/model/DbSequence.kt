package com.kiheyunkim.todolist.todo.model

import org.springframework.data.annotation.Id

/**
 * IDE : IntelliJ IDEA
 * Created by kiheyunkim@gmail.com on 2021-08-08
 * Github : http://github.com/kiheyunkim
 * Comment :
 */
data class MongoSequence(@Id val id: String, val seq: Long = 0)
