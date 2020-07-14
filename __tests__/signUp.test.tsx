import React from "react";
import { mount, configure } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import SignUp from "../app/src/components/login/SignUp";

configure({ adapter: new Adapter() });

describe("SignUp", () => {
  it("renders", () => {
    mount(<SignUp isLoggedIn={false}/>);
  });
});