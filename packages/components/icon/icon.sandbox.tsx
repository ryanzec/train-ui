import Combobox, { type ComboboxOption, comboboxComponentUtils } from '$/components/combobox';
import FormField from '$/components/form-field';
import FormFields from '$/components/form-fields/form-fields';
import Icon, { IconColor, IconSize } from '$/components/icon';
import styles from '$/components/icon/icon.sandbox.module.css';
import { type IconName, iconComponents } from '$/components/icon/utils';
import Input from '$/components/input';
import Label from '$/components/label';
import Tooltip, { tooltipComponentUtils, TooltipTriggerEvent } from '$/components/tooltip';
import { clipboardUtils } from '$/utils/clipboard';
import { For, createEffect, createSignal } from 'solid-js';

export default {
  title: 'Components/Icon',
};

export const AllIcons = () => {
  const colorOptions: ComboboxOption<ColorMetaData>[] = [
    {
      label: 'Inherit (Default)',
      value: IconColor.INHERIT,
      meta: { iconColor: IconColor.INHERIT },
    },
    {
      label: 'Brand',
      value: IconColor.BRAND,
      meta: { iconColor: IconColor.BRAND },
    },
    {
      label: 'Neutral',
      value: IconColor.NEUTRAL,
      meta: { iconColor: IconColor.NEUTRAL },
    },
    {
      label: 'Success',
      value: IconColor.SUCCESS,
      meta: { iconColor: IconColor.SUCCESS },
    },
    {
      label: 'Info',
      value: IconColor.INFO,
      meta: { iconColor: IconColor.INFO },
    },
    {
      label: 'Warning',
      value: IconColor.WARNING,
      meta: { iconColor: IconColor.WARNING },
    },
    {
      label: 'Danger',
      value: IconColor.DANGER,
      meta: { iconColor: IconColor.DANGER },
    },
  ];
  const sizeOptions: ComboboxOption<SizeMetaData>[] = [
    {
      label: 'Extra Small 2',
      value: IconSize.EXTRA_SMALL2,
      meta: { iconSize: IconSize.EXTRA_SMALL2 },
    },
    {
      label: 'Extra Small',
      value: IconSize.EXTRA_SMALL,
      meta: { iconSize: IconSize.EXTRA_SMALL },
    },
    {
      label: 'Small',
      value: IconSize.SMALL,
      meta: { iconSize: IconSize.SMALL },
    },
    {
      label: 'Base (Default)',
      value: IconSize.BASE,
      meta: { iconSize: IconSize.BASE },
    },
    {
      label: 'Large',
      value: IconSize.LARGE,
      meta: { iconSize: IconSize.LARGE },
    },
    {
      label: 'Extra Large',
      value: IconSize.EXTRA_LARGE,
      meta: { iconSize: IconSize.EXTRA_LARGE },
    },
    {
      label: 'Extra Large 2',
      value: IconSize.EXTRA_LARGE2,
      meta: { iconSize: IconSize.EXTRA_LARGE2 },
    },
    {
      label: 'Extra Large 3',
      value: IconSize.EXTRA_LARGE3,
      meta: { iconSize: IconSize.EXTRA_LARGE3 },
    },
    {
      label: 'Extra Large 4',
      value: IconSize.EXTRA_LARGE4,
      meta: { iconSize: IconSize.EXTRA_LARGE4 },
    },
  ];
  type ColorMetaData = { meta: { iconColor: IconColor } };
  type SizeMetaData = { meta: { iconSize: IconSize } };
  const allIconNames: IconName[] = Object.keys(iconComponents) as IconName[];
  const colorComboboxStore = comboboxComponentUtils.createValueStore<ColorMetaData>({
    defaultValue: [colorOptions[0]],
  });
  const sizeComboboxStore = comboboxComponentUtils.createValueStore<SizeMetaData>({
    defaultValue: [sizeOptions[2]],
  });
  const [filter, setFilter] = createSignal<string>('');
  const [shownIconNames, setShownIconNames] = createSignal<IconName[]>(allIconNames);

  createEffect(() => {
    setShownIconNames(allIconNames.filter((iconName) => iconName.toLowerCase().includes(filter().toLowerCase())));
  });

  return (
    <div>
      <FormFields>
        <FormField>
          <Label>Search</Label>
          <Input
            name="filter"
            value={filter()}
            placeholder="Search by name..."
            onInput={(event) => setFilter(event.currentTarget.value)}
          />
        </FormField>
        <FormField>
          <Label>Color</Label>
          <Combobox
            forceSelection
            autoShowOptions
            options={colorOptions}
            // filterOptions={props.filterOptions ?? comboboxUtils.excludeSelectedFilter}
            setSelected={colorComboboxStore.setSelected}
            selected={colorComboboxStore.selected()}
            placeholder="Select color..."
            name="color"
          />
        </FormField>
        <FormField>
          <Label>Size</Label>
          <Combobox
            forceSelection
            autoShowOptions
            options={sizeOptions}
            // filterOptions={props.filterOptions ?? comboboxUtils.excludeSelectedFilter}
            setSelected={sizeComboboxStore.setSelected}
            selected={sizeComboboxStore.selected()}
            placeholder="Select size..."
            name="size"
          />
        </FormField>
      </FormFields>
      <div class={styles.iconsContainer}>
        <For each={shownIconNames()}>
          {(iconName) => {
            const tooltipStore = tooltipComponentUtils.createStore();

            return (
              <div class={styles.iconContainer}>
                <Tooltip store={tooltipStore} triggerEvent={TooltipTriggerEvent.HOVER}>
                  <Tooltip.Handle>
                    <button type="button" class={styles.icon} onClick={() => clipboardUtils.copyToClipboard(iconName)}>
                      <Icon
                        icon={iconName}
                        color={colorComboboxStore.selected()[0]?.meta?.iconColor || IconColor.INHERIT}
                        size={sizeComboboxStore.selected()[0]?.meta?.iconSize || IconSize.BASE}
                      />
                    </button>
                  </Tooltip.Handle>
                  <Tooltip.Content>{iconName}</Tooltip.Content>
                </Tooltip>
              </div>
            );
          }}
        </For>
      </div>
    </div>
  );
};

export const Group = () => {
  return (
    <Icon.Group>
      <Icon icon="x" />
      <Icon icon="square" />
      <Icon icon="align-justified" />
    </Icon.Group>
  );
};
