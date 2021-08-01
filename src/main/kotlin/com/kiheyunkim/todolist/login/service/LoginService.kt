package com.kiheyunkim.todolist.login.service

import com.kiheyunkim.todolist.login.repository.LoginRepository
import org.springframework.stereotype.Service

/**
 * IDE : IntelliJ IDEA
 * Created by kiheyunkim@gmail.com on 2021-08-01
 * Github : http://github.com/kiheyunkim
 * Comment :
 */
@Service
class LoginService(private val loginRepository: LoginRepository) {
	fun isExistUser(email: String) : Boolean =
		loginRepository.isExistUser(email)

	fun addUser(email: String, name: String) =
		loginRepository.insertUser(email)

	fun getUserIdentity(email: String): String =
		loginRepository.selectUserIdentity(email)
}