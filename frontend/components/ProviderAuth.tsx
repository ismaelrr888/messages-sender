"use client";
import { SessionProvider } from "next-auth/react";
import * as React from "react";

const ProviderAuth = ({ children }: { children: React.ReactNode }) => {
	return <SessionProvider>{children}</SessionProvider>;
};

export default ProviderAuth;
