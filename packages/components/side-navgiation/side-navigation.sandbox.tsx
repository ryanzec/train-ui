import SideNavigation, { SideNavigationState } from '$/components/side-navgiation';

export default {
  title: 'Components/SideNavigation',
};

export const Expanded = () => {
  return (
    <div>
      <SideNavigation defaultState={SideNavigationState.EXPANDED} headerItem="Button">
        <SideNavigation.Item>DropDown</SideNavigation.Item>
        <SideNavigation.Item isActive>IconButton</SideNavigation.Item>
        <SideNavigation.Item>Loading</SideNavigation.Item>
        <SideNavigation.Item>Sentiment</SideNavigation.Item>
        <SideNavigation.Item>Variant</SideNavigation.Item>
      </SideNavigation>
    </div>
  );
};

export const Collapsed = () => {
  return (
    <div>
      <SideNavigation defaultState={SideNavigationState.COLLAPSED} headerItem="Button">
        <SideNavigation.Item>DropDown</SideNavigation.Item>
        <SideNavigation.Item isActive>IconButton</SideNavigation.Item>
        <SideNavigation.Item>Loading</SideNavigation.Item>
        <SideNavigation.Item>Sentiment</SideNavigation.Item>
        <SideNavigation.Item>Variant</SideNavigation.Item>
      </SideNavigation>
    </div>
  );
};

export const Interactive = () => {
  return (
    <div>
      <SideNavigation defaultState={SideNavigationState.COLLAPSED} headerItem="Button">
        <SideNavigation.Item>DropDown</SideNavigation.Item>
        <SideNavigation.Item isActive>IconButton</SideNavigation.Item>
        <SideNavigation.Item>Loading</SideNavigation.Item>
        <SideNavigation.Item>Sentiment</SideNavigation.Item>
        <SideNavigation.Item>Variant</SideNavigation.Item>
      </SideNavigation>
    </div>
  );
};
