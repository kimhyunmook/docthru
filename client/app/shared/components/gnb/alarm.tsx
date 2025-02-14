export interface AlarmProps {
  content: string;
  createdAt: string;
  id: string;
  read: boolean;
}
import { useQueryClient } from "@tanstack/react-query";
import useValue from "../../hooks/useValue";
import styles from "@/app/shared/styles/loginBox.module.css";
import textDate from "../../hooks/textDate";
import { readAlramApi } from "@/app/api/user/api";
import { useToaster } from "../../provider/toasterProvider";

export default function Alarm() {
  const queryClient = useQueryClient();
  const toast = useToaster();
  const alarmData = queryClient.getQueryData<{ alarm: AlarmProps[] }>([
    "alarm",
  ]);
  const alarm = useValue<AlarmProps[]>(
    alarmData?.alarm.filter((x) => !x.read) || []
  );
  function read(id: string) {
    const t = alarm.value.find((x) => x.id === id)?.id;
    if (t) {
      readAlramApi({ id: t });
      queryClient.setQueryData(
        ["alarm"],
        (oldData: { alarm: AlarmProps[] }) => {
          if (!oldData) return { alarm: [] };
          return {
            alarm: oldData?.alarm.map((item) =>
              item.id === t ? { ...item, read: true } : item
            ),
          };
        }
      );
    } else toast("warn", "오류가 발생했습니다");

    alarm.set((prev) =>
      prev.map((item) => (item.id === id ? { ...item, read: true } : item))
    );
  }
  return (
    <div className={styles.alarm}>
      <h2>알람</h2>
      <ul>
        {!!alarm.value.length ? (
          alarm.value.map((v, i) => {
            const date = textDate(v.createdAt);
            return (
              <li
                className={`${styles.list} ${v.read ? styles.read : ""}`}
                key={v.content + i}
                onClick={(e) => {
                  e.preventDefault();
                  read(v.id);
                }}
              >
                <p className={styles.content}>{v.content}</p>
                <p className={styles.date}>{date}</p>
              </li>
            );
          })
        ) : (
          <li className={styles.noList}>
            <p>알람이 없어요</p>
          </li>
        )}
      </ul>
    </div>
  );
}
