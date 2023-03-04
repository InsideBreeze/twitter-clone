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
    <div className="flex items-center justify-center space-x-2 hoverAnimation">
      <Icon className="w-8 h-8" />
      <span className={`hidden xl:inline ${active && "font-bold"}`}>
        {text}
      </span>
    </div>
  );
};

export default SidebarLink;
