// SPDX-License-Identifier: MIT
// EveCore — EVE Neocom-style Vue 3 components. Package entry.
import type { App, Plugin } from 'vue';

import EveAvatar from './components/eve/EveAvatar.vue';
import EveBanner from './components/eve/EveBanner.vue';
import EveBreadcrumb from './components/eve/EveBreadcrumb.vue';
import EveButton from './components/eve/EveButton.vue';
import EveCheckbox from './components/eve/EveCheckbox.vue';
import EveContextMenu from './components/eve/EveContextMenu.vue';
import EveDialog from './components/eve/EveDialog.vue';
import EveDivider from './components/eve/EveDivider.vue';
import EveDropdownMenu from './components/eve/EveDropdownMenu.vue';
import EveFrame from './components/eve/EveFrame.vue';
import EveGlowLine from './components/eve/EveGlowLine.vue';
import EveIcon from './components/eve/EveIcon.vue';
import EveIconButton from './components/eve/EveIconButton.vue';
import EveInput from './components/eve/EveInput.vue';
import EveIsk from './components/eve/EveIsk.vue';
import EveLink from './components/eve/EveLink.vue';
import EveMenuList from './components/eve/EveMenuList.vue';
import EvePanel from './components/eve/EvePanel.vue';
import EvePill from './components/eve/EvePill.vue';
import EveProgress from './components/eve/EveProgress.vue';
import EveRadio from './components/eve/EveRadio.vue';
import EveRadioGroup from './components/eve/EveRadioGroup.vue';
import EveSearchField from './components/eve/EveSearchField.vue';
import EveSectionTitle from './components/eve/EveSectionTitle.vue';
import EveSelect from './components/eve/EveSelect.vue';
import EveSideNav from './components/eve/EveSideNav.vue';
import EveSlider from './components/eve/EveSlider.vue';
import EveSpinner from './components/eve/EveSpinner.vue';
import EveSystemChip from './components/eve/EveSystemChip.vue';
import EveTable from './components/eve/EveTable.vue';
import EveTabs from './components/eve/EveTabs.vue';
import EveTag from './components/eve/EveTag.vue';
import EveToggle from './components/eve/EveToggle.vue';
import EveTooltip from './components/eve/EveTooltip.vue';

export {
  EveAvatar,
  EveBanner,
  EveBreadcrumb,
  EveButton,
  EveCheckbox,
  EveContextMenu,
  EveDialog,
  EveDivider,
  EveDropdownMenu,
  EveFrame,
  EveGlowLine,
  EveIcon,
  EveIconButton,
  EveInput,
  EveIsk,
  EveLink,
  EveMenuList,
  EvePanel,
  EvePill,
  EveProgress,
  EveRadio,
  EveRadioGroup,
  EveSearchField,
  EveSectionTitle,
  EveSelect,
  EveSideNav,
  EveSlider,
  EveSpinner,
  EveSystemChip,
  EveTable,
  EveTabs,
  EveTag,
  EveToggle,
  EveTooltip,
};

export type { BreadcrumbItem } from './components/eve/EveBreadcrumb.vue';
export type { MenuEntry, MenuSeparator, MenuTitle, MenuItem, MenuAnchor } from './components/eve/EveMenuList.vue';
export type { RadioContext } from './components/eve/EveRadioGroup.vue';
export type { SideNavItem } from './components/eve/EveSideNav.vue';
export type { SelectOption } from './components/eve/EveSelect.vue';
export type { TabItem } from './components/eve/EveTabs.vue';
export type { EveTableColumn, EveTableSort } from './components/eve/EveTable.vue';
export { isEntry } from './components/eve/EveMenuList.vue';
export { radioKey } from './components/eve/EveRadioGroup.vue';

export * from './lib/security';
export * from './lib/utils';
export * from './lib/eve-icons';

const components = {
  EveAvatar,
  EveBanner,
  EveBreadcrumb,
  EveButton,
  EveCheckbox,
  EveContextMenu,
  EveDialog,
  EveDivider,
  EveDropdownMenu,
  EveFrame,
  EveGlowLine,
  EveIcon,
  EveIconButton,
  EveInput,
  EveIsk,
  EveLink,
  EveMenuList,
  EvePanel,
  EvePill,
  EveProgress,
  EveRadio,
  EveRadioGroup,
  EveSearchField,
  EveSectionTitle,
  EveSelect,
  EveSideNav,
  EveSlider,
  EveSpinner,
  EveSystemChip,
  EveTable,
  EveTabs,
  EveTag,
  EveToggle,
  EveTooltip,
};

/** app.use(EveCore) registers every component globally under its Eve* name. */
const EveCore: Plugin = {
  install(app: App) {
    for (const [name, component] of Object.entries(components)) app.component(name, component);
  },
};

export default EveCore;
