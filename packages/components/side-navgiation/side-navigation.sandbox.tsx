import SideNavigation from '$/components/side-navgiation';

export default {
  title: 'Components/SideNavigation',
};

export const Default = () => {
  return (
    <div>
      <SideNavigation headerItem="Button">
        <SideNavigation.Item>DropDown</SideNavigation.Item>
        <SideNavigation.Item isActive>IconButton</SideNavigation.Item>
        <SideNavigation.Item>Loading</SideNavigation.Item>
        <SideNavigation.Item>Sentiment</SideNavigation.Item>
        <SideNavigation.Item>Variant</SideNavigation.Item>
      </SideNavigation>
    </div>
  );
};
