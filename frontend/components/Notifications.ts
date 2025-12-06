'use client';

import toast from 'react-hot-toast';

export const notify = {
    success: (msg: string) => toast.success(msg, {
        style: {
            background: '#1e293b',
            color: '#fff',
            border: '1px solid #334155'
        }
    }),
    error: (msg: string) => toast.error(msg, {
        style: {
            background: '#1e293b',
            color: '#f87171',
            border: '1px solid #7f1d1d'
        }
    })
};
