import { Link, Outlet, useLocation } from "react-router-dom";
import { Menu } from "antd";

const items = [
  {
    label: "Dashboard",
    key: "dashboard",
  },
  {
    label: "Members",
    key: "members",
  },
  {
    label: "Suspected Member List",
    key: "memberList",
  },
  {
    label: "Audit List",
    key: "audit",
  },
];

function BlogContainer() {
  const location = useLocation();
  const router =
    location?.pathname?.split("/")?.[
      location?.pathname?.split("/")?.length - 1
    ];
  let index = items.findIndex((obj) => router === obj.key);
  return (
    <>
      <Outlet />
    </>
  );
}

export default BlogContainer;
