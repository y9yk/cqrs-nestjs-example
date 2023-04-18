# Configuration

서비스 구동을 위한 사용자 설정은 아래와 같습니다.

> **note**
> 
> MongoDB는 서비스 목적에 따라 아래 2가지 데이터베이스를 사용합니다.
> - 이벤트 스토어
>   - 서비스에서 발생하는 이벤트를 기록하는 데이터베이스입니다
> - 일반
>   - 회원가입 등 일반적인 서비스를 지원하는 데이터베이스입니다.

| 항목                        | 설명                        |
|---------------------------|---------------------------|
| SERVICE_NAME              | 서비스 이름                    |
| SERVICE_PORT              | 서비스 포트                    |
| MONGO_SERVICE_HOST        | MongoDB 호스트 (일반)          |
| MONGO_SERVICE_PORT        | MongoDB 서비스 포트 (일반)       |
| MONGO_SERVICE_USERNAME    | MongoDB 사용자 이름 (일반)       |
| MONGO_SERVICE_PASSWORD    | MongoDB 사용자 비밀번호 (일반)     |
| MONGO_SERVICE_DATABASE    | MongoDB 데이터베이스 (일반)       |
| MONGO_EVENTSTORE_HOST     | MongoDB 호스트 (이벤트스토어)      |
| MONGO_EVENTSTORE_PORT     | MongoDB 서비스 포트 (이벤트스토어)   |
| MONGO_EVENTSTORE_USERNAME | MongoDB 사용자 이름 (이벤트스토어)   |
| MONGO_EVENTSTORE_PASSWORD | MongoDB 사용자 비밀번호 (이벤트스토어) |
| MONGO_EVENTSTORE_DATABASE | MongoDB 데이터베이스 (이벤트스토어)   |
| JWT_SECRET                | jwt 시크릿                   |
| JWT_EXPIRES_IN            | jwt 만료시간                  |
| LOG_LEVEL                 | 서비스 로그 레벨                 |

## Example

```env
SERVICE_NAME=event-sourcing-cqrs-nestjs-example
SERVICE_PORT=8080

MONGO_SERVICE_HOST=localhost
MONGO_SERVICE_PORT=27017
MONGO_SERVICE_USERNAME=root
MONGO_SERVICE_PASSWORD=1234
MONGO_SERVICE_DATABASE=service

MONGO_EVENTSTORE_HOST=localhost
MONGO_EVENTSTORE_PORT=27018
MONGO_EVENTSTORE_USERNAME=root
MONGO_EVENTSTORE_PASSWORD=1234
MONGO_EVENTSTORE_DATABASE=eventstore

JWT_SECRET=STHOCAACRHUYUDKJAEAFUNM9XNRYMQKQWUROHGFFAWWHBDLRUEKP9XELIWDHWILSIHJTHDJKBCOCSNGLT
JWT_EXPIRES_IN=3600

LOG_LEVEL=debug
```