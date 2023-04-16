import React from 'react';

import { RiSubwayLine } from "react-icons/ri";
import { IoMapOutline, IoClose } from "react-icons/io5"
import { FiMenu } from "react-icons/fi";

export default function Icon({ type }) {
    return (
        <>
            { type === "subway" ? <RiSubwayLine /> :
              type === "map" ? <IoMapOutline /> :
              type === "close" ? <IoClose /> :
              type === "menu" ? <FiMenu /> : null}
        </>
    );
};
