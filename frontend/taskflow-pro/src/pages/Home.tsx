import { Login } from "../layouts/Login";
import { motion } from "framer-motion";

export const Home = () => {
  return (
    <section className="min-h-screen w-full bg-linear-to-br from-slate-50 to-slate-200 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-7xl font-black tracking-tight text-slate-800">
              TaskFlow <span className="text-blue-600">Pro</span>
            </h1>

            <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
              Organize suas tarefas com clareza. Visualize seu progresso.
              Mantenha o foco no que realmente importa.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="px-4 py-2 rounded-xl bg-white shadow-sm border border-slate-200">
              <p className="text-sm font-medium text-slate-700">
                Kanban Simples
              </p>
            </div>

            <div className="px-4 py-2 rounded-xl bg-white shadow-sm border border-slate-200">
              <p className="text-sm font-medium text-slate-700">
                Produtividade
              </p>
            </div>

            <div className="px-4 py-2 rounded-xl bg-white shadow-sm border border-slate-200">
              <p className="text-sm font-medium text-slate-700">Foco Diário</p>
            </div>
          </div>
        </motion.div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="flex justify-center"
        >
          <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200 p-8">
            <div className="mb-6 space-y-2 text-center">
              <h2 className="text-2xl font-bold text-slate-800">Bem-vindo</h2>
              <p className="text-sm text-slate-500">
                Entre para acessar seus quadros
              </p>
            </div>

            <Login />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
