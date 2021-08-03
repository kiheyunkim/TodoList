package com.kiheyunkim.todolist.login.repository

import org.apache.ibatis.annotations.Mapper

/**
 * IDE : IntelliJ IDEA
 * Created by kiheyunkim@gmail.com on 2021-08-01
 * Github : http://github.com/kiheyunkim
 * Comment :
 */
@Mapper
interface LoginRepository {
	fun isExistUser(email: String): Boolean
	fun insertUser(email: String, name: String)
}