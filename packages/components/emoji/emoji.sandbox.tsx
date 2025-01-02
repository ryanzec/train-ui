import Emoji, { EmojiSpacing } from '$/components/emoji';

export default {
  title: 'Components/Emoji',
};

export const Default = () => {
  return (
    <>
      <div>
        This is some text to the left
        <Emoji emoji="sparkles" spacing={EmojiSpacing.LEFT} />
      </div>
      <div>
        <Emoji emoji="sparkles" spacing={EmojiSpacing.RIGHT} />
        This is some text to the right
      </div>
      <div>
        This is some text to the left
        <Emoji emoji="sparkles" spacing={EmojiSpacing.BOTH} />
        and to the right
      </div>
    </>
  );
};
