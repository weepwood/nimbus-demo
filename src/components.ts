/**
 * MDX globals registry — components available inside MDX without `import`.
 * Wired via `<Content components={components} />` in `[...slug].astro`.
 * Add new components here as you build (or install) them.
 */

import { Aside } from "./components/ui/aside";
import Icon from "@cloudflare/nimbus-docs/components/Icon.astro";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "./components/ui/collapsible";
import Render from "./components/Render.astro";
import { Card } from "./components/ui/card";
import { CardGrid } from "./components/ui/card-grid";
import { PackageManagers } from "./components/ui/package-managers";
import { Step, Steps } from "./components/ui/steps";
import { Tabs, TabItem } from "./components/ui/tabs";

export const components = {
  Aside,
  Icon,
  Badge,
  Button,
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  Card,
  CardGrid,
  PackageManagers,
  Render,
  Step,
  Steps,
  TabItem,
  Tabs,
};
