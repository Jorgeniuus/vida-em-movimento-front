import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { api } from '../services/api';

function Unsubscribe() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const email = searchParams.get('email');

    if (!email) return;

    api.patch(`/users/unsubscribe/${email}`);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-3xl shadow-sm">
        <h1 className="text-2xl font-bold">Lembretes cancelados</h1>

        <p className="text-slate-500 mt-3">Você não receberá mais emails.</p>
      </div>
    </div>
  );
}

export default Unsubscribe;