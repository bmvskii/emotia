import { Emojis } from '../reaction/constants/emojiis';

export interface IReactionProps {
  description: string;
  date: Date;
  emoji: Emojis;
  energyLevel: number;
  title: string;
}

export class Reaction {
  constructor(
    public title: string,
    public description: string,
    public date: Date = new Date(),
    public emoji: Emojis,
    public energyLevel: number = 0
  ) {}

  toObject() {
    return {
      title: this.title,
      description: this.description,
      date: this.date,
      emoji: this.emoji,
      energyLevel: this.energyLevel,
    };
  }
}
