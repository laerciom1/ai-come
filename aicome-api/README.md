# Ai Come - Delivery pra qualquer fome!
 
## Getting Started

To run the server api, run:
 
```bash
./mvnw spring-boot:run
```

## Authorization

The access token can be generated using the [Resource Owner Password Credentials Grant](https://tools.ietf.org/html/rfc6749#section-4.3).

The token endpoint is **'/oauth/token'** and the **client_id** and **client_secret** by default is **'aicome-web'**.

It is important to note that the token request for this type of grant must be **application/x-www-form-urlencoded** with **'username'**, **'password'** and **'grant_type'='password'** and the request **must have a basic authorization header with the client_id (as user name) and client_secret (as the password)**.

The command below shows an example of a token request using curl:
```bash
curl -X POST --user 'aicome-web:aicome-web' -d 'grant_type=password&username=admin&password=admin' http://localhost:8080/oauth/token
```

It will be translated as:
```bash
POST /token HTTP/1.1
Host: localhost:8080
Authorization: Basic YWljb21lLXdlYjphaWNvbWUtd2Vi
Content-Type: application/x-www-form-urlencoded

grant_type=password&username=admin&password=admin
```



The following response with the access and refresh tokens will be produced:

```bash
{
    "access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1Mjk4NzIzNjMsInVzZXJfbmFtZSI6ImFkbWluIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9BRE1JTiJdLCJqdGkiOiI0YzcwNzNkMC1iMDVjLTRjZTItYjVhMy04ZGRhOTQwZGI1MDciLCJjbGllbnRfaWQiOiJhaWNvbWUtd2ViIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.ukbG18jgfKRIb9NwX_6FLOFSvqWda9pCTCgnptf8cjQ",
    "token_type":"bearer",
    "expires_in":3599,
    "scope":"read write",
    "jti":"4c7073d0-b05c-4ce2-b5a3-8dda940db507"
}
```

Then, the generated access token can be used as the following example:

```bash
curl -i -H "Accept: application/json" -H "Authorization: Bearer <ACCESS_TOKEN_HERE>" -X GET http://localhost:8080/stores
```