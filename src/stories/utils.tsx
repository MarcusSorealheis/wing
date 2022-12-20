import {
  ArchiveBoxIcon,
  BoltIcon,
  CalculatorIcon,
  CubeIcon,
  CubeTransparentIcon,
  GlobeAltIcon,
  QueueListIcon,
} from "@heroicons/react/24/outline";
import classNames from "classnames";
import React from "react";

import {
  BaseResourceSchema,
  WingSimulatorSchema,
} from "../../electron/main/wingsdk.js";
import { TreeMenuItem } from "../design-system/TreeMenu.js";

export const flattenTreeMenuItems = (items: TreeMenuItem[]): TreeMenuItem[] => {
  return items.flatMap((item) => {
    return [
      item,
      ...(item.children ? flattenTreeMenuItems(item.children) : []),
    ];
  });
};

export const SchemaToTreeMenuItems = (
  schema: WingSimulatorSchema,
): TreeMenuItem[] => {
  const tree: TreeMenuItem[] = [];
  const buildTree = (
    node: BaseResourceSchema,
    parent: TreeMenuItem | undefined,
  ) => {
    const item: TreeMenuItem = {
      id: node.path ?? "",
      label: node.path?.split("/").pop() ?? "",
      children: [],
      parentId: parent?.id,
      icon: (
        <ResourceIcon
          resourceType={node.type}
          className="w-4 h-4"
          darkenOnGroupHover
        />
      ),
    };
    if (parent) {
      parent.children?.push(item);
    } else {
      tree.push(item);
    }
  };
  return tree;
};

const CubeTransparentExIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <div className="relative">
      <div className="opacity-40">
        <CubeIcon {...props} />
      </div>

      <CubeTransparentIcon
        {...props}
        className={classNames(props.className, "absolute inset-0 opacity-70")}
      />
    </div>
  );
};

const getResourceIconComponent = (
  resourceType: BaseResourceSchema["type"] | undefined,
) => {
  switch (resourceType) {
    case "wingsdk.cloud.Bucket": {
      return ArchiveBoxIcon;
    }
    case "wingsdk.cloud.Function": {
      return BoltIcon;
    }
    case "wingsdk.cloud.Queue": {
      return QueueListIcon;
    }
    case "wingsdk.cloud.Endpoint": {
      return GlobeAltIcon;
    }
    case "wingsdk.cloud.Counter": {
      return CalculatorIcon;
    }
    case "wingsdk.constructs.Construct": {
      return CubeTransparentExIcon;
    }
    default: {
      return CubeIcon;
    }
  }
};

const getResourceIconColors = (options: {
  resourceType: BaseResourceSchema["type"] | undefined;
  darkenOnGroupHover?: boolean;
  forceDarken?: boolean;
}) => {
  switch (options.resourceType) {
    case "wingsdk.cloud.Bucket": {
      return [
        "text-orange-500 dark:text-orange-400",
        options.darkenOnGroupHover &&
          "group-hover:text-orange-600 dark:group-hover:text-orange-300",
        options.forceDarken && "text-orange-600 dark:text-orange-300",
      ];
    }
    case "wingsdk.cloud.Function": {
      return [
        "text-sky-500 dark:text-sky-400",
        options.darkenOnGroupHover &&
          "group-hover:text-sky-600 dark:group-hover:text-sky-300",
        options.forceDarken && "text-sky-600 dark:text-sky-300",
      ];
    }
    case "wingsdk.cloud.Queue": {
      return [
        "text-emerald-500 dark:text-emerald-400",
        options.darkenOnGroupHover &&
          "group-hover:text-emerald-600 dark:group-hover:text-emerald-300",
        options.forceDarken && "text-emerald-600 dark:text-emerald-300",
      ];
    }
    case "wingsdk.cloud.Endpoint": {
      return [
        "text-sky-500 dark:text-sky-400",
        options.darkenOnGroupHover &&
          "group-hover:text-sky-600 dark:group-hover:text-sky-300",
        options.forceDarken && "text-sky-600 dark:text-sky-300",
      ];
    }
    case "wingsdk.cloud.Counter": {
      return [
        "text-lime-500 dark:text-lime-400",
        options.darkenOnGroupHover &&
          "group-hover:text-lime-600 dark:group-hover:text-lime-300",
        options.forceDarken && "text-lime-600 dark:text-lime-300",
      ];
    }
    default: {
      return [
        "text-slate-500 dark:text-slate-400",
        options.darkenOnGroupHover &&
          "group-hover:text-slate-600 dark:group-hover:text-slate-300",
        options.forceDarken && "text-slate-600 dark:text-slate-300",
      ];
    }
  }
};

export interface ResourceIconProps extends React.SVGProps<SVGSVGElement> {
  resourceType: BaseResourceSchema["type"] | undefined;
  darkenOnGroupHover?: boolean;
  forceDarken?: boolean;
}

export const ResourceIcon = ({
  resourceType,
  darkenOnGroupHover,
  forceDarken,
  className,
  ...props
}: ResourceIconProps) => {
  const Component = getResourceIconComponent(resourceType);
  const colors = getResourceIconColors({
    resourceType,
    darkenOnGroupHover,
    forceDarken,
  });
  return <Component className={classNames(className, colors)} {...props} />;
};
