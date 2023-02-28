import { HeroIcon } from "../types/heroicons";

const SidebarLink = ({
  text,
  Icon,
  active,
}: {
  text: string;
  Icon: HeroIcon;
  active?: boolean;
}) => {
  return (
    <div className="flex space-x-2 items-center justify-center hoverAnimation">
      <Icon className="h-8 w-8" />
      <span className="hidden xl:inline">{text}</span>
    </div>
  );
};

export default SidebarLink;
