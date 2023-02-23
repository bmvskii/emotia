export enum Emojis {
  Sad = 'pensive',
  Angry = 'rage',
  Depressed = 'disappointed',
  Anxious = 'worried',
  Joy = 'joy',
  Neutral = 'slightly_smiling_face',
  Happy = 'partying_face',
  Good = 'wink',
  Bad = 'slightly_frowning_face',
  Cry = 'sob',
}

export const EmojiLabels = {
  [Emojis.Cry]: 'Crying Lion',
  [Emojis.Depressed]: 'Depressed Bear',
  [Emojis.Anxious]: 'Anxious Cat',
  [Emojis.Angry]: 'Angry Bird',
  [Emojis.Sad]: 'Sad Turtle',
  [Emojis.Bad]: 'Upset Monkey',
  [Emojis.Neutral]: 'Normal Pinguin',
  [Emojis.Good]: 'Good Lama',
  [Emojis.Happy]: 'Happy Dog',
  [Emojis.Joy]: 'Joyful Tiger',
};

type EmojiKey =
  | Emojis.Sad
  | Emojis.Cry
  | Emojis.Angry
  | Emojis.Anxious
  | Emojis.Joy
  | Emojis.Neutral
  | Emojis.Happy
  | Emojis.Good
  | Emojis.Bad
  | Emojis.Cry;

type IEmojiWeights = {
  [key in Emojis]: number;
};

export const EmojiWeights: IEmojiWeights = {
  [Emojis.Cry]: 1,
  [Emojis.Depressed]: 2,
  [Emojis.Anxious]: 3,
  [Emojis.Angry]: 4,
  [Emojis.Sad]: 5,
  [Emojis.Bad]: 6,
  [Emojis.Neutral]: 7,
  [Emojis.Good]: 8,
  [Emojis.Happy]: 9,
  [Emojis.Joy]: 10,
};
