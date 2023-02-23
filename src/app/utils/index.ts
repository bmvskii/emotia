import { format } from 'date-fns';
import {
  EmojiLabels,
  Emojis,
  EmojiWeights,
} from '../components/reaction/constants/emojiis';

export const formatDate = (date: Date) => {
  return format(new Date(date), 'MM/dd/yyyy');
};

export const getAverageMood = (emojis: Emojis[]): Emojis | null => {
  const avgWeight = emojis.reduce(
    (acc, curr, idx, arr) =>
      idx === arr.length - 1
        ? Math.round((acc + EmojiWeights[curr]) / arr.length)
        : acc + EmojiWeights[curr],
    0
  );
  const data = Object.entries(EmojiWeights).find(
    ([key, value]) => avgWeight === value
  );

  return data ? (data[0] as Emojis) : null;
};

export const getEnergyLevelLabel = (level: number) => {
  if (level >= 0 && level < 4) {
    return 'Low';
  }

  if (level >= 4 && level < 7) {
    return 'Medium';
  }

  return 'Full Pack';
};

export const getMoodLabel = (status: string) => {
  return EmojiLabels[status as Emojis] || 'Effecient Robot';
};
