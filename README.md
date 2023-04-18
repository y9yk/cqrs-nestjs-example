# event-sourcing-cqrs-nestjs-example

[Event-sourcing](https://learn.microsoft.com/ko-kr/azure/architecture/patterns/event-sourcing) 및 [CQRS](https://en.wikipedia.org/wiki/Command%E2%80%93query_separation)를 지원하는 서비스 코드 예제입니다.

## Configuration

- `config/.{development|production}.env`파일을 토대로 구동 환경에 필요한 설정을 관리하고 있습니다.
- 설정에 대한 자세한 설명은 [사용자 설정](/config)을 참고하세요.

## Installation

```bash
$ npm install
```

## Running the app

- 개발 환경에서 Swagger를 지원하고 있습니다.
  - `http://localhost:8080/docs`에서 지원하는 API 목록을 확인할 수 있습니다.

```bash
# development mode
$ npm run start:dev # or use 'npm start'

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
