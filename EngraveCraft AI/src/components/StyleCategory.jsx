import { motion } from 'framer-motion';
import StyleOption from './StyleOption';

export default function StyleCategory({ title, description, icon, styles, selectedStyle, onSelectStyle, disabled }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3"
    >
      <div className="flex items-center gap-3">
        <span className="text-xl">{icon}</span>
        <div>
          <h3 className="text-sm font-semibold font-heading text-foreground">{title}</h3>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {styles.map((style) => (
          <StyleOption
            key={style.value}
            label={style.label}
            icon={style.icon}
            isSelected={selectedStyle === style.value}
            onClick={() => onSelectStyle(style.value)}
            disabled={disabled}
          />
        ))}
      </div>
    </motion.div>
  );
}