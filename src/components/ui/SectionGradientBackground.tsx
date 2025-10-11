const SectionGradientBackground = () => {
  return (
    <div className="absolute inset-0 bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_-10%,rgba(139,92,246,0.35),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_90%,rgba(34,197,94,0.2),transparent)]" />
    </div>
  );
};

export default SectionGradientBackground;
