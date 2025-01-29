declare namespace NodeJS {
  interface ProcessEnv {
    PORT?: string; // 선택적 환경 변수
    JWT_SECRET: string; // 필수 환경 변수
    ORIGIN?: string; // 선택적 환경 변수
  }
}
