import { useState } from 'react';
import { api } from './services/api';
import { useNotification } from './hooks/useNotification';
import alongamentoImg from './exercises/alongamento.png';
import caminhadaImg from './exercises/caminhada.png';
import bicicletaImg from './exercises/bicicleta.png';
import flexaoImg from './exercises/flexao.png';
import abdominalImg from './exercises/abdominal.png';
import barraImg from './exercises/barra.png';
import corridaImg from './exercises/corrida.png';
import yogaImg from './exercises/yoga.png';

const exercises = [
  'Alongamento',
  'Caminhada',
  'Bicicleta',
  'Flexão',
  'Abdominal',
  'Barra',
  'Corrida',
  'Yoga',
];

const exerciseImages: Record<string, string> = {
  Alongamento: alongamentoImg,
  Caminhada: caminhadaImg,
  Bicicleta: bicicletaImg,
  Flexão: flexaoImg,
  Abdominal: abdominalImg,
  Barra: barraImg,
  Corrida: corridaImg,
  Yoga: yogaImg,
};

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [notificationInterval, setNotificationInterval] = useState('');

  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);

  useNotification(
    notificationInterval,
    selectedExercises,
    name,
    email
  );

  const handleExercise = (exercise: string) => {
    if (selectedExercises.includes(exercise)) {
      setSelectedExercises(
        selectedExercises.filter((item) => item !== exercise)
      );

      return;
    }

    setSelectedExercises([...selectedExercises, exercise]);
  };

  const handleSubmit = async () => {
    try {
      await api.post('/users', {
        name,
        email,
        notificationInterval,
        selectedExercises,
        isSubscribed: true,
      });

      alert('Usuário salvo com sucesso!');
    } catch (error) {
      console.log(error);

      alert('Erro ao salvar usuário');
    }
  };

return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800">
            Vida em Movimento
          </h1>

          <p className="text-slate-600 mt-2 text-lg">
            Plataforma para combater o sedentarismo.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">
              Cadastro
            </h2>

            <div className="space-y-4">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome"
                className="w-full border rounded-xl p-3"
              />

              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full border rounded-xl p-3"
              />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">
              Intervalo
            </h2>

            <div className="space-y-4">
              <label className="flex gap-3">
                <input
                  type="radio"
                  name="interval"
                  onChange={() => setNotificationInterval('30min')}
                />
                30 minutos
              </label>

              <label className="flex gap-3">
                <input
                  type="radio"
                  name="interval"
                  onChange={() => setNotificationInterval('1h')}
                />
                1 hora
              </label>

              <label className="flex gap-3">
                <input
                  type="radio"
                  name="interval"
                  onChange={() => setNotificationInterval('2h')}
                />
                3 horas
              </label>

              <label className="flex gap-3">
                <input
                  type="radio"
                  name="interval"
                  onChange={() => setNotificationInterval('more')}
                />
                5 horas
              </label>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-6">
            Exercícios
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {exercises.map((exercise) => {
              const selected = selectedExercises.includes(exercise);

              return (
                <div
                  key={exercise}
                  onClick={() => handleExercise(exercise)}
                  className={`rounded-3xl overflow-hidden cursor-pointer transition-all border-2 ${
                    selected
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-transparent bg-white'
                  }`}
                >
                  <div className="h-40 bg-slate-200"> <img src={exerciseImages[exercise]} alt={exercise} className="w-full h-full object-cover" /> </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-lg">
                      {exercise}
                    </h3>

                    <p className="text-sm text-slate-500 mt-2">
                      Exercício recomendado para melhorar sua saúde.
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button
            onClick={handleSubmit}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-2xl font-semibold"
          >
            Salvar preferências
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;