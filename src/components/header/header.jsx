import { useRef, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { RiMenu2Fill } from "react-icons/ri";
import {
  Link,
  NavLink,
  Outlet,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Button, Form, Input } from "antd";

const { Search } = Input;

const Header = () => {
  const [searchParams] = useSearchParams();
  const form = useRef(null);
  const navigate = useNavigate();

  const onFinish = (values) => {
    navigate(`/search?q=${values.search}`);
    console.log(values);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="container mx-auto flex items-center ">
        <div className="flex items-center justify-between w-full py-4">
          {/* Logo */}
          <Link to={"/"} className="block">
            <h2>Logo</h2>
          </Link>

          {/* Search Bar */}
          <Form
            onFinish={onFinish}
            ref={form}
            initialValues={{
              search: searchParams.get("q"),
            }}
            className="w-[60%] pt-5"
          >
            <Form.Item
              className="w-full"
              name="search"
              rules={[
                {
                  required: true,
                  message: "Please input your search!",
                },
              ]}
            >
              <Search
                placeholder="Search"
                enterButton={
                  <Button
                    htmlType="submit"
                    className="bg-green-500 text-white hover:bg-green-600"
                  >
                    Search
                  </Button>
                }
              />
            </Form.Item>
          </Form>

          <div
            className={`nav__collect flex gap-3 ${isMenuOpen ? "show" : ""}`}
          >
            <div className="flex items-center gap-4 navbar navbar__collection">
              <NavLink
                className="text-[16px] font-[400] text-gray-700 hover:text-green-600"
                to="/cart"
              >
                Cart
              </NavLink>
              <NavLink
                className="text-[16px] font-[400] text-gray-700 hover:text-green-600"
                to="/profile"
              >
                <img
                  className="w-[50px] h-[50px] object-contain rounded-full"
                  src="https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
                  alt="Profile"
                />
              </NavLink>
            </div>
          </div>
        </div>

        {/* Menu Toggle for Mobile */}
        <div onClick={toggleMenu} className="navbar__menu ml-5">
          <RiMenu2Fill className="text-3xl text-gray-700" />
        </div>
      </div>

      <Outlet />
    </>
  );
};

export default Header;
