import Combobox, { type ComboboxOption, comboboxUtils } from '$/components/combobox';
import FormField from '$/components/form-field';
import Icon, { IconColor, IconSize } from '$/components/icon';
import styles from '$/components/icon/icon.sandbox.module.css';
import { type IconName, iconComponents } from '$/components/icon/utils';
import Input from '$/components/input';
import Label from '$/components/label';
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
  const colorComboboxStore = comboboxUtils.createComboboxValue<ColorMetaData>({
    defaultValue: [colorOptions[0]],
  });
  const sizeComboboxStore = comboboxUtils.createComboboxValue<SizeMetaData>({
    defaultValue: [sizeOptions[2]],
  });
  const [filter, setFilter] = createSignal<string>('');
  const [shownIconNames, setShownIconNames] = createSignal<IconName[]>(allIconNames);

  createEffect(() => {
    setShownIconNames(allIconNames.filter((iconName) => iconName.toLowerCase().includes(filter().toLowerCase())));
  });

  return (
    <div>
      <FormField>
        <Label>Search</Label>
        <Input
          name="filter"
          value={filter()}
          placeholder="Search by name..."
          onInput={(event) => setFilter(event.currentTarget.value)}
        />
      </FormField>
      <Combobox.Form
        forceSelection
        autoShowOptions
        options={colorOptions}
        // filterOptions={props.filterOptions ?? comboboxUtils.excludeSelectedFilter}
        setSelected={colorComboboxStore.setSelected}
        selected={colorComboboxStore.selected()}
        placeholder="Select color..."
        name="color"
        label="Color"
      />
      <Combobox.Form
        forceSelection
        autoShowOptions
        options={sizeOptions}
        // filterOptions={props.filterOptions ?? comboboxUtils.excludeSelectedFilter}
        setSelected={sizeComboboxStore.setSelected}
        selected={sizeComboboxStore.selected()}
        placeholder="Select size..."
        name="size"
        label="Size"
      />
      <div class={styles.iconsContainer}>
        <For each={shownIconNames()}>
          {(iconName) => (
            <div class={styles.iconContainer}>
              <button type="button" class={styles.icon} onClick={() => clipboardUtils.copyToClipboard(iconName)}>
                <Icon
                  icon={iconName}
                  color={colorComboboxStore.selected()[0]?.meta?.iconColor || IconColor.INHERIT}
                  size={sizeComboboxStore.selected()[0]?.meta?.iconSize || IconSize.BASE}
                />
              </button>
            </div>
          )}
        </For>
      </div>
    </div>
  );
};
