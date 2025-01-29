"use client";
export default function useLocalStorage() {
  if (typeof window !== "undefined")
    return {
      set: (key: string, value: string, ttl: number) => {
        const now = new Date();

        // 저장할 객체 생성
        const item = {
          value: value, // 실제 값
          expiry: now.getTime() + ttl, // 현재 시간 + TTL(밀리초)
        };

        localStorage.setItem(key, JSON.stringify(item));
      },
      get: (key: string) => {
        const itemStr = localStorage.getItem(key);

        // 해당 키가 없을 경우
        if (!itemStr) {
          return null;
        }
        const item = JSON.parse(itemStr);
        const now = new Date();
        // 만료 시간이 현재 시간보다 이전이면 null 반환 및 삭제
        if (now.getTime() > item.expiry) {
          localStorage.removeItem(key);
          return null;
        }

        return item.value;
      },
    };
  else
    return {
      set: () => {
        return null;
      },
      get: () => {
        return null;
      },
    };
}
