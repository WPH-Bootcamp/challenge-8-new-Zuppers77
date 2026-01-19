export const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 pt-8 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <img src="/src/assets/images/logo.png" alt="Movie App Logo" className="h-8 w-auto object-contain" />
        </div>
        <p className="text-gray-500 text-sm text-center md:text-right">
          Copyright ©{new Date().getFullYear()} Movie Explorer.
        </p>
      </div>
    </footer>
  );
};
