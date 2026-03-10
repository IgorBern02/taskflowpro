export const Feature = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-4 py-2 rounded-xl bg-white shadow-sm border border-slate-200">
      <p className="text-sm font-medium text-slate-700">{children}</p>
    </div>
  );
};
