import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Fragment } from "react";

export interface Item {
  name: string;
  href?: string;
}

interface PendaftaranBreadcrumbsProps {
  items: Item[];
}

const PendaftaranBreadcrumbs = ({ items }: PendaftaranBreadcrumbsProps) => {
  // show dropdown menu if there are more than 3 items
  const isDropdown = items.length > 3;

  if (items.length < 2) {
    return null;
  }

  return (
    <Breadcrumb className="items-center justify-start w-full px-2">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href={items[0].href}>{items[0].name}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {isDropdown && (
          <>
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1">
                  <BreadcrumbEllipsis className="h-4 w-4" />
                  <span className="sr-only">Toggle menu</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {items.slice(1, -1).map((item, index) => (
                    <DropdownMenuItem key={index}>
                      <BreadcrumbLink href={item.href}>
                        {item.name}
                      </BreadcrumbLink>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        )}

        {items.slice(1, -1).map((item, index) => (
          <Fragment key={index}>
            <BreadcrumbItem>
              <BreadcrumbLink href={item.href}>{item.name}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </Fragment>
        ))}

        <BreadcrumbItem>
          <BreadcrumbPage>{items[items.length - 1].name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default PendaftaranBreadcrumbs;
