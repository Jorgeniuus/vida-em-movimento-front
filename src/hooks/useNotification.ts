import { useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { api } from '../services/api';

const intervalMap: Record<string, number> = {
//   '30min': 1000000, // 10 segundos teste
  '30min': 10000, // 10 segundos teste
//   '30min': 1800000,
  '1h': 3600000,
  '2h': 7200000,
  more: 10800000,
};

export const useNotification = (
  interval: string,
  selectedExercises: string[],
  name: string,
  email: string
) => {
  useEffect(() => {
    if (!interval || !email) return;

    Notification.requestPermission();

    const timer = setInterval(async () => {

    const exercisesList = selectedExercises.join(', ') || 'Alongamento';

      if (Notification.permission === 'granted') {
        new Notification('Hora de se movimentar!', {
          body: `Exercício recomendado: ${exercisesList}`,
        });
      }

      try {
        const response = await api.get(
          `/users/${email}`
        );

        const user = response.data;

        if (!user.isSubscribed) {
          console.log(
            'Usuário cancelou os lembretes'
          );

          return;
        }

        await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          {
            user_name: name,
            user_email: email,
            exercise: exercisesList,
          },
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );

        console.log('Email enviado!');
      } catch (error) {
        console.log(
          'Erro ao enviar email',
          error
        );
      }
    }, intervalMap[interval]);

    return () => clearInterval(timer);
  }, [interval, selectedExercises, name, email]);
};