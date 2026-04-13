import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function StyleOption({ label, icon, isSelected, onClick, disabled }) {
  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.03 }}
      whileTap={disabled ? {} : { scale: 0.97 }}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-200",
        "text-sm font-medium font-body",
        isSelected
          ? "border-primary bg-primary/10 text-primary shadow-lg shadow-primary/10"
          : "border-border bg-card hover:border-primary/30 hover:bg-secondary/50 text-secondary-foreground",
        disabled && "opacity-40 cursor-not-allowed"
      )}
    >
      <span className="text-2xl">{icon}</span>
      <span className="text-xs leading-tight text-center">{label}</span>
      {isSelected && (
        <motion.div
          layoutId="selected-indicator"
          className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-primary"
          initial={false}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
    </motion.button>
  );
}