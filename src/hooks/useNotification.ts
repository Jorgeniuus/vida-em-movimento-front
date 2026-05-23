import { useEffect } from 'react';

const intervalMap: Record<string, number> = {
  '30min': 1800000,
  '1h': 3600000,
  '2h': 7200000,
  'more': 10800000,
};

export const useNotification = (
  interval: string,
  selectedExercises: string[]
) => {
  useEffect(() => {
    if (!interval) return;

    Notification.requestPermission();

    const timer = setInterval(() => {
      const randomExercise =
        selectedExercises[
          Math.floor(Math.random() * selectedExercises.length)
        ];

      if (Notification.permission === 'granted') {
        new Notification('Hora de se movimentar!', {
          body: `Exercício sugerido: ${randomExercise || 'Alongamento'}`,
        });
      }
    }, intervalMap[interval]);

    return () => clearInterval(timer);
  }, [interval, selectedExercises]);
};