package com.kiheyunkim.todolist.configuration

import com.kiheyunkim.todolist.login.service.LoginService
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService
import org.springframework.security.oauth2.core.user.DefaultOAuth2User
import org.springframework.security.oauth2.core.user.OAuth2User
import org.springframework.stereotype.Service
import java.util.*
import javax.servlet.http.HttpSession

/**
 * IDE : IntelliJ IDEA
 * Created by kiheyunkim@gmail.com on 2021-08-01
 * Github : http://github.com/kiheyunkim
 * Comment :
 */
@Service
class CustomOauth2UserService(private val httpSession: HttpSession, private val loginService: LoginService) :
	OAuth2UserService<OAuth2UserRequest, OAuth2User> {

	override fun loadUser(userRequest: OAuth2UserRequest?): OAuth2User {
		val oAuth2UserService = DefaultOAuth2UserService()
		val oAuth2User = oAuth2UserService.loadUser(userRequest)

		val oauthRequestEmail: String = oAuth2User.attributes["email"] as String
		httpSession.setAttribute("userEmail", oauthRequestEmail)

		if (!loginService.isExistUser(oauthRequestEmail)) {
			loginService.addUser(oauthRequestEmail, oAuth2User.attributes["name"] as String)
		}

		val userIdentity = loginService.getUserIdentity(oauthRequestEmail)

		httpSession.setAttribute("userIdentity", userIdentity)

		return DefaultOAuth2User(
			Collections.singleton(SimpleGrantedAuthority("ROLE_USER")),
			oAuth2User.attributes,
			"name"
		)
	}
}