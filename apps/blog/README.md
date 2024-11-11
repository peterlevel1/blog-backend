# blog-backend

---

## Run Project

1. update the .env.example file to .env, and set vars

2. connect your mysql db

3. seed the db.sql

4. start the project: npm run start:dev

---

## Default User

- root
- 123456

---

## GWT Login Process

login: postman or some request client

```sh
POST /api/v1/auth/login

Content-Type: application/json

{
  "username": "root",
  "password": "123456"
}
```
