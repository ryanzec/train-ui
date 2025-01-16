import SideNavigation from '$/components/side-navgiation';
import { toggleStoreUtils } from '$/stores/toggle';
import { createSignal } from 'solid-js';

export default {
  title: 'Components/SideNavigation',
};

export const Expanded = () => {
  const toggleStore = toggleStoreUtils.createStore({ defaultIsToggled: true });

  return (
    <div>
      <SideNavigation>
        <SideNavigation.Item toggleStore={toggleStore} headerItem="Button">
          <SideNavigation.SubItem>DropDown</SideNavigation.SubItem>
          <SideNavigation.SubItem isActive>IconButton</SideNavigation.SubItem>
          <SideNavigation.SubItem>Loading</SideNavigation.SubItem>
          <SideNavigation.SubItem>Color</SideNavigation.SubItem>
          <SideNavigation.SubItem>Variant</SideNavigation.SubItem>
        </SideNavigation.Item>
      </SideNavigation>
    </div>
  );
};

export const Collapsed = () => {
  const toggleStore = toggleStoreUtils.createStore();

  return (
    <div>
      <SideNavigation>
        <SideNavigation.Item toggleStore={toggleStore} headerItem="Button">
          <SideNavigation.SubItem>DropDown</SideNavigation.SubItem>
          <SideNavigation.SubItem isActive>IconButton</SideNavigation.SubItem>
          <SideNavigation.SubItem>Loading</SideNavigation.SubItem>
          <SideNavigation.SubItem>Color</SideNavigation.SubItem>
          <SideNavigation.SubItem>Variant</SideNavigation.SubItem>
        </SideNavigation.Item>
      </SideNavigation>
    </div>
  );
};

export const CustomIcon = () => {
  const toggleStore = toggleStoreUtils.createStore();

  return (
    <div>
      <SideNavigation>
        <SideNavigation.Item toggleStore={toggleStore} headerItem="Button" iconName="align-justified">
          <SideNavigation.SubItem>DropDown</SideNavigation.SubItem>
          <SideNavigation.SubItem isActive>IconButton</SideNavigation.SubItem>
          <SideNavigation.SubItem>Loading</SideNavigation.SubItem>
          <SideNavigation.SubItem>Color</SideNavigation.SubItem>
          <SideNavigation.SubItem>Variant</SideNavigation.SubItem>
        </SideNavigation.Item>
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
      <SideNavigation>
        <SideNavigation.Item isActive={isActive()} onClick={handleClick} headerItem="Button" />
      </SideNavigation>
    </div>
  );
};

export const ListWithLinks = () => {
  const toggleStore1 = toggleStoreUtils.createStore();
  const toggleStore2 = toggleStoreUtils.createStore();

  return (
    <div>
      <SideNavigation>
        <SideNavigation.Item headerItem="Button1" href="#1" />
        <SideNavigation.Item headerItem="Button2" href="#2" />
        <SideNavigation.Item toggleStore={toggleStore1} headerItem="Button3 (links)" iconName="align-justified">
          <SideNavigation.SubItem href="#dropdowm">DropDown</SideNavigation.SubItem>
          <SideNavigation.SubItem href="#iconbutton" isActive>
            IconButton
          </SideNavigation.SubItem>
          <SideNavigation.SubItem href="#loading">Loading</SideNavigation.SubItem>
          <SideNavigation.SubItem href="#color">Color</SideNavigation.SubItem>
          <SideNavigation.SubItem href="#variant">Variant</SideNavigation.SubItem>
        </SideNavigation.Item>
        <SideNavigation.Item headerItem="Button4" href="#4" />
        <SideNavigation.Item toggleStore={toggleStore2} headerItem="Button5" iconName="align-justified">
          <SideNavigation.SubItem>DropDown</SideNavigation.SubItem>
          <SideNavigation.SubItem isActive>IconButton</SideNavigation.SubItem>
          <SideNavigation.SubItem>Loading</SideNavigation.SubItem>
          <SideNavigation.SubItem>Color</SideNavigation.SubItem>
          <SideNavigation.SubItem>Variant</SideNavigation.SubItem>
        </SideNavigation.Item>
      </SideNavigation>
    </div>
  );
};
