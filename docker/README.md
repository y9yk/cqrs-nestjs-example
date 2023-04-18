# Local DB Installation

개발 및 테스트 지원을 위해서, 로컬 환경에 MongoDB를 구동시킬 수 있습니다.

> **Note**
> 
> MongoDB는 서비스 목적에 따라 아래 2가지 데이터베이스를 사용합니다.
> - 이벤트 스토어
>   - 서비스에서 발생하는 이벤트를 기록하는 데이터베이스입니다
> - 일반
>   - 회원가입 등 일반적인 서비스를 지원하는 데이터베이스입니다.

## Configuration

.env 파일에서 MongoDB의 초기 접속 환경을 설정할 수 있습니다.

각 변수에 대한 설명은 아래와 같습니다.

| 항목                     | 설명                    |
|------------------------|-----------------------|
| MONGO_HOST     | MongoDB 호스트      |
| MONGO_PORT     | MongoDB 서비스 포트   |
| MONGO_INITDB_ROOT_USERNAME | MongoDB 사용자 이름   |
| MONGO_INITDB_ROOT_PASSWORD | MongoDB 사용자 비밀번호 |
| MONGO_INITDB_DATABASE | MongoDB 데이터베이스   |

## How to launch

아래 명령어를 사용해서 구동시킬 수 있습니다.

> **Note**
> 
> [docker-compose](https://docs.docker.com/compose/install/)가 설치되어 있어야 합니다.


```bash
# cleanup and build
$ docker-compose down;docker-compose build
# launch (daemon mode)
$ docker-compose up -d
```

### Example

```env
MONGO_HOST=localhost
MONGO_INITDB_ROOT_USERNAME=root
MONGO_INITDB_ROOT_PASSWORD=1234
MONGO_INITDB_DATABASE=eventstore
```