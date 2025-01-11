import SideNavigation from '$/components/side-navgiation';
import { toggleStoreUtils } from '$/stores/toggle';
import { createSignal } from 'solid-js';

export default {
  title: 'Components/SideNavigation',
};

export const Expanded = () => {
  const toggleStore = toggleStoreUtils.createToggle({ defaultIsToggled: true });

  return (
    <div>
      <SideNavigation toggleStore={toggleStore} headerItem="Button">
        <SideNavigation.Item>DropDown</SideNavigation.Item>
        <SideNavigation.Item isActive>IconButton</SideNavigation.Item>
        <SideNavigation.Item>Loading</SideNavigation.Item>
        <SideNavigation.Item>Color</SideNavigation.Item>
        <SideNavigation.Item>Variant</SideNavigation.Item>
      </SideNavigation>
    </div>
  );
};

export const Collapsed = () => {
  const toggleStore = toggleStoreUtils.createToggle();

  return (
    <div>
      <SideNavigation toggleStore={toggleStore} headerItem="Button">
        <SideNavigation.Item>DropDown</SideNavigation.Item>
        <SideNavigation.Item isActive>IconButton</SideNavigation.Item>
        <SideNavigation.Item>Loading</SideNavigation.Item>
        <SideNavigation.Item>Color</SideNavigation.Item>
        <SideNavigation.Item>Variant</SideNavigation.Item>
      </SideNavigation>
    </div>
  );
};

export const CustomIcon = () => {
  const toggleStore = toggleStoreUtils.createToggle();

  return (
    <div>
      <SideNavigation toggleStore={toggleStore} headerItem="Button" iconName="align-justified">
        <SideNavigation.Item>DropDown</SideNavigation.Item>
        <SideNavigation.Item isActive>IconButton</SideNavigation.Item>
        <SideNavigation.Item>Loading</SideNavigation.Item>
        <SideNavigation.Item>Color</SideNavigation.Item>
        <SideNavigation.Item>Variant</SideNavigation.Item>
      </SideNavigation>
    </div>
  );
};

export const NoChildren = () => {
  const [isActive, setIsActive] = createSignal(false);

  const handleClick = () => {
    setIsActive(!isActive());
  };

  return (
    <div>
      <SideNavigation isActive={isActive()} onClick={handleClick} headerItem="Button" />
    </div>
  );
};
