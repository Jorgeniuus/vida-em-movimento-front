import { useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { api } from '../services/api';

const intervalMap: Record<string, number> = {
  '30min': 5000,
  // '30min': 1800000,
  '1h': 3600000,
  '3h': 10800000,
  '5h': 18000000,
};

const exerciseImageUrls: Record<string, string> = {
  // Alongamento: `${import.meta.env.VITE_APP_URL}/exercises/alongamento.png`,
  // Caminhada: `${import.meta.env.VITE_APP_URL}/exercises/caminhada.png`,
  // Bicicleta: `${import.meta.env.VITE_APP_URL}/exercises/bicicleta.png`,
  // Flexão: `${import.meta.env.VITE_APP_URL}/exercises/flexao.png`,
  // Abdominal: `${import.meta.env.VITE_APP_URL}/exercises/abdominal.png`,
  // Barra: `${import.meta.env.VITE_APP_URL}/exercises/barra.png`,
  // Corrida: `${import.meta.env.VITE_APP_URL}/exercises/corrida.png`,
  // Yoga: `${import.meta.env.VITE_APP_URL}/exercises/yoga.png`,

    Alongamento: '../../public/exercises/alongamento.png',
  Caminhada: '../../public/exercises/caminhada.png',
  Bicicleta: '../../public/exercises/bicicleta.png',
  Flexão: '../../public/exercises/flexao.png',
  Abdominal: '../../public/exercises/abdominal.png',
  Barra: '../../public/exercises/barra.png',
  Corrida: '../../public/exercises/corrida.png',
  Yoga: '../../public/exercises/yoga.png',
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

    const exercisesHtml = selectedExercises
      .map(
        (exercise) => `
          <div style="margin-bottom:20px;">
            <p style="font-size:18px;">
              <strong>${exercise}</strong>
            </p>

            <img
              src="${exerciseImageUrls[exercise]}"
              width="250"
              style="
                border-radius:16px;
                object-fit:cover;
              "
            />
          </div>
        `
      )
      .join('');

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
            exercises_html: exercisesHtml,
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