package com.kiheyunkim.todolist.todo.repository

import com.kiheyunkim.todolist.todo.model.MongoSequence
import org.springframework.data.mongodb.core.FindAndModifyOptions
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.query.Criteria
import org.springframework.data.mongodb.core.query.Query
import org.springframework.data.mongodb.core.query.Update
import org.springframework.stereotype.Repository
import java.lang.RuntimeException

/**
 * IDE : IntelliJ IDEA
 * Created by kiheyunkim@gmail.com on 2021-08-08
 * Github : http://github.com/kiheyunkim
 * Comment :
 */
@Repository
class MongoSequenceRepository(private val mongoTemplate: MongoTemplate) {
	fun getNextSequenceId(key: String): Long {
		val query = Query(Criteria.where("id").`is`(key))
		val update: Update = Update().inc("seq", 1)
		val modifyOption: FindAndModifyOptions = FindAndModifyOptions().returnNew(true).upsert(true)

		val mongoSequence = mongoTemplate.findAndModify(query, update, modifyOption, MongoSequence::class.java)

		return mongoSequence?.seq ?: throw RuntimeException("Mongo Sequence Error")
	}
}