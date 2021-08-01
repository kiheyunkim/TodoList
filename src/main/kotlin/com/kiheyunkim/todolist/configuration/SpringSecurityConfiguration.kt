package com.kiheyunkim.todolist.configuration

import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.builders.WebSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.web.util.matcher.AntPathRequestMatcher

/**
 * IDE : IntelliJ IDEA
 * Created by kiheyunkim@gmail.com on 2021-08-01
 * Github : http://github.com/kiheyunkim
 * Comment :
 */
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@Configuration
class SpringSecurityConfiguration(private val customOauth2UserService: CustomOauth2UserService) :
	WebSecurityConfigurerAdapter() {

	override fun configure(web: WebSecurity?) {
		web!!.ignoring().antMatchers("/css/**", "/img/**", "/js/**")
	}

	override fun configure(http: HttpSecurity?) {
		http!!.httpBasic().disable()

		http.csrf()

		http.
			authorizeRequests().
				antMatchers("/*").permitAll().
				anyRequest().authenticated().
			and().
				oauth2Login().
				loginPage("/login").
				defaultSuccessUrl("/todoList", true).
				failureUrl("/?error=loginFail").
				userInfoEndpoint().
				userService(customOauth2UserService)

		http.
				logout().
				logoutSuccessUrl("/").
				logoutRequestMatcher(AntPathRequestMatcher("/logout","GET")).
				deleteCookies("JSESSIONID").
				invalidateHttpSession(true)
	}
}