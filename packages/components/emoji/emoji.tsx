import classnames from 'classnames';
import { JSX, mergeProps, splitProps } from 'solid-js';

// this json files was generated using this file as a base:
// https://raw.githubusercontent.com/iamcal/emoji-data/master/emoji.json
// and then stripping out all data expect short_name and unified with this tool:
// https://jsoneditoronline.org/
// for some reason the order formatting placing this here even though it is an error so just ignoring it for now
// eslint-disable-next-line import/order
import emojis from '$/assets/json/emojis.json';

interface EmojiJsonData {
  short_name: string;
  unified: string;
}
import styles from '$/components/emoji/emoji.module.css';
import { EmojiSpacing } from '$/components/emoji/utils';
import { IconSize } from '$/components/icon';

export interface EmojiProps extends JSX.HTMLAttributes<HTMLSpanElement> {
  emoji: string | string[];
  spacing?: EmojiSpacing;
  size?: IconSize;
}

const Emoji = (passedProps: EmojiProps) => {
  const [props, restOfProps] = splitProps(mergeProps({ size: IconSize.BASE }, passedProps), [
    'class',
    'emoji',
    'spacing',
    'size',
  ]);
  const emojisToRender = () => {
    const tempEmojis = Array.isArray(props.emoji) ? props.emoji : [props.emoji];

    return tempEmojis.map((tempEmoji) => {
      // need to trim leading trailing colons if there
      return tempEmoji.replace(/(^:|:$)/g, '');
    });
  };

  const getEmojiHtml = () => {
    return emojisToRender()
      .map((emojiToRender) => {
        if (!emojiToRender) {
          return '';
        }

        const emojiParts = emojiToRender.split('::');

        // seems like if there are multiple  part, that is for skin tones
        if (emojiParts.length > 1) {
          const t = emojiParts.map((part) => {
            return (emojis.find((emoji) => emoji.short_name === part) as EmojiJsonData)?.unified ?? '';
          });

          // for whatever reason it seem like the skin tone need to be above the main emoji unicode but before other
          // modifiers so this ensures that
          return `&#x${t[0].replace('-', t[1] ? `-${t[1]}-` : '-').replaceAll('-', '&#x')}`;
        } else {
          const unicode = emojis.find((emoji) => emoji.short_name === emojiToRender) as EmojiJsonData;

          if (!unicode) {
            return emojiToRender;
          }

          return `&#x${unicode.unified.replaceAll('-', '&#x')}`;
        }
      })
      .join('');
  };

  return (
    <span
      role="img"
      aria-label={emojisToRender().join(' ')}
      class={classnames(props.class, {
        [styles.small1]: props.size === IconSize.SMALL1,
        [styles.base]: props.size === IconSize.BASE,
        [styles.large1]: props.size === IconSize.LARGE1,
        [styles.large2]: props.size === IconSize.LARGE2,
        [styles.large3]: props.size === IconSize.LARGE3,
        [styles.spacingLeft]: props.spacing === EmojiSpacing.LEFT,
        [styles.spacingRight]: props.spacing === EmojiSpacing.RIGHT,
      })}
      {...restOfProps}
      innerHTML={getEmojiHtml()}
    />
  );
};

export default Emoji;
