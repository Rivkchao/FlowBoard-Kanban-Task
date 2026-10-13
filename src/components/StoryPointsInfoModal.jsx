import React from 'react';
import { HelpCircle, X, Zap, Target, TrendingUp, CheckCircle } from 'lucide-react';

export const StoryPointsInfoModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/15 text-indigo-600 dark:text-indigo-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Mengenal Story Points (pts)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Standar estimasi beban kerja dalam metodologi Agile & Scrum
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-3.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-3 border border-slate-200/80 dark:border-slate-700/50">
            <p className="font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
              <Target className="w-4 h-4 text-indigo-500" />
              Apa itu Story Points?
            </p>
            <p className="mt-1">
              <strong>Story Points (pts)</strong> adalah metrik relatif yang mengukur gabungan antara <em>tingkat kesulitan teknis</em>, <em>kompleksitas</em>, <em>risiko/ketidakpastian</em>, dan <em>usaha (effort)</em> yang dibutuhkan untuk menyelesaikan satu tugas.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-3 bg-white dark:bg-slate-900/50">
              <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                ⏱️ Kenapa Bukan Jam?
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Waktu jam kerja setiap developer bervariasi (senior vs junior). Story points bersifat universal: tugas berbobot 5 pts tetap memiliki kompleksitas yang sama bagi siapa pun yang mengerjakannya.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-3 bg-white dark:bg-slate-900/50">
              <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                📈 Menghitung Velocity
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Total poin yang diselesaikan dalam 1 sprint disebut <strong>Velocity</strong>. Jika tim rata-rata mampu menyelesaikan 30 pts per sprint, tim tidak akan over-commit mengambil 50 pts di sprint berikutnya.
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-indigo-500/10 border border-indigo-500/20 p-3 text-[11px]">
            <span className="font-bold text-indigo-600 dark:text-indigo-400 block mb-1">
              🔢 Skala Umum (Deret Fibonacci):
            </span>
            <ul className="list-disc pl-4 space-y-0.5 text-slate-700 dark:text-slate-300">
              <li><strong>1 - 2 pts</strong>: Tugas sepele, minor bugfix, typo, ganti copy teks.</li>
              <li><strong>3 - 5 pts</strong>: Fitur standar, pembuatan komponen UI atau endpoint API baru.</li>
              <li><strong>8 pts</strong>: Fitur kompleks yang melibatkan integrasi frontend & backend.</li>
              <li><strong>13 - 21 pts</strong>: Tugas terlalu besar, disarankan dipecah menjadi beberapa sub-tugas.</li>
            </ul>
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/20 transition-all"
          >
            Mengerti, Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
