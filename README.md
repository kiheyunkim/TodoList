# TODO LIST (With Spring boot)

## how to Build?
```bash
./mvnw package
```

## Skills

front: ![](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white), ![](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black), ![](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) 

Database:![](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white), ![](https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=mariadb&logoColor=white)

Server Framework: ![](	https://img.shields.io/badge/Spring_Boot-F2F4F9?style=for-the-badge&logo=spring-boot) + ![](https://img.shields.io/badge/Kotlin-0095D5?&style=for-the-badge&logo=kotlin&logoColor=white)


## Collaborators

design: [최송은](https://github.com/ostrichtofu)

programming: [김기현](https://github.com/kiheyunkim)


## ScreenShots


## DB Schema
MariaDB
```sql
CREATE TABLE IF NOT EXISTS USER_TABLE
(
    IDENTITY_ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    EMAIL       VARCHAR(255) NOT NULL,
    NAME        VARCHAR(255) NOT NULL
);
```

MongoDB
```kotlin
data class TodoElement(
	val email: String,
	val task: String,
	val endDate: LocalDate,
	val registerDate: LocalDate
)
```

### Application.yml

```yaml
spring:
  datasource:
    driver-class-name: org.mariadb.jdbc.Driver
    url: "jdbc:mysql://localhost:3306/TODO_LIST?serverTimezone=UTC&characterEncoding=UTF-8"
    username: "MARIADB_USER"
    password: "MARIADB_PASSWORD"
  sql:
    init:
      mode: always
  security:
    oauth2:
      client:
        registration:
          google:
            client-id: "GOOGLE_AUTH_CLIENT_ID"
            client-secret: "GOOGLE_AUTH_CLIENT_SECRET"
            scope: profile,email
  data:
    mongodb:
      database: "todoList"
      host: "127.0.0.1"
      port: 27017

mybatis:
  mapper-locations: "classpath:mybatis-mapper/*.xml"
logging:
  level:
    root: debug
```


## known issue


## License