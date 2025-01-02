import SideNavigation from '$/components/side-navgiation';
import { toggleStoreUtils } from '$/stores/toggle';

export default {
  title: 'Components/SideNavigation',
};

export const Expanded = () => {
  const toggleStore = toggleStoreUtils.createToggle({ isToggled: true });

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
